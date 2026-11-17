const express = require('express')
const pool = require('../util/database')
const { getCoursesWithPrereqs } = require('../util/courseData')
const validateCourse = require('../util/validateCourse')

const router = express.Router()

router.get('/courses', async (req, res) => {
  try {
    const courses = await getCoursesWithPrereqs(pool)
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/courses/:id', async (req, res) => {
  try {
    const course = await getCoursesWithPrereqs(pool, req.params.id)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/courses', async (req, res) => {
  const error = validateCourse(req.body)
  if (error) {
    return res.status(400).json({ error })
  }

  const { number, title, credits, description, prerequisites = [] } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO courses (number, title, credits, description) VALUES (?, ?, ?, ?)',
      [number, title, credits, description || null]
    )
    const newId = result.insertId

    for (const prereqId of prerequisites) {
      await pool.query(
        'INSERT INTO prerequisites (course_id, prereq_id) VALUES (?, ?)',
        [newId, prereqId]
      )
    }

    const course = await getCoursesWithPrereqs(pool, newId)
    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/courses/:id', async (req, res) => {
  const error = validateCourse(req.body)
  if (error) {
    return res.status(400).json({ error })
  }

  const { id } = req.params
  const { number, title, credits, description, prerequisites = [] } = req.body

  try {
    const [result] = await pool.query(
      'UPDATE courses SET number = ?, title = ?, credits = ?, description = ? WHERE id = ?',
      [number, title, credits, description || null, id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found' })
    }

    await pool.query('DELETE FROM prerequisites WHERE course_id = ?', [id])
    for (const prereqId of prerequisites) {
      await pool.query(
        'INSERT INTO prerequisites (course_id, prereq_id) VALUES (?, ?)',
        [id, prereqId]
      )
    }

    const course = await getCoursesWithPrereqs(pool, id)
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/courses/:id', async (req, res) => {
  const { id } = req.params
  try {
    const course = await getCoursesWithPrereqs(pool, id)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    await pool.query('DELETE FROM courses WHERE id = ?', [id])
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
