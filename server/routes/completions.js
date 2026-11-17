const express = require('express')
const pool = require('../util/database')
const { getCoursesWithPrereqs, replaceCompletions } = require('../util/courseData')

const USER_ID = 1 // M3: replaced by the logged-in user's id
const router = express.Router()

const isValidCompletionSet = (courses, completed) => {
  return completed.every(id => {
    const course = courses.find(c => c.id === id)
    return course && course.prerequisites.every(p => completed.includes(p))
  })
}

router.get('/completions', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT course_id FROM completions WHERE user_id = ? ORDER BY course_id',
      [USER_ID]
    )
    res.json(rows.map(row => row.course_id))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/completions', async (req, res) => {
  const completed = req.body

  if (!Array.isArray(completed) || !completed.every(id => Number.isInteger(id))) {
    return res.status(400).json({ error: 'Body must be an array of course ids' })
  }

  try {
    const courses = await getCoursesWithPrereqs(pool)
    if (!isValidCompletionSet(courses, completed)) {
      return res.status(400).json({
        error: 'Invalid completion list: a course is missing a prerequisite or does not exist',
      })
    }

    const unique = [...new Set(completed)].sort((a, b) => a - b)
    await replaceCompletions(pool, USER_ID, unique)
    res.json(unique)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
