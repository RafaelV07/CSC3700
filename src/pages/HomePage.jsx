import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import CourseList from '../components/CourseList'
import ProgressSummary from '../components/ProgressSummary'

const STORAGE_KEY = 'completedCourses'

const isAvailable = (course, completed) => {
  return course.prerequisites.every((prereqId) => completed.includes(prereqId))
}

const loadCompleted = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const HomePage = () => {
  const { data: courses, isPending, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/courses`
  )

  const [completed, setCompleted] = useState(loadCompleted)
  const [filter, setFilter] = useState('all')
  const [saveMessage, setSaveMessage] = useState('')

  const getStatus = (course) => {
    if (completed.includes(course.id)) return 'Completed'
    if (isAvailable(course, completed)) return 'Available'
    return 'Locked'
  }

  const getDependents = (courseId) => {
    return courses
      .filter((c) => c.prerequisites.includes(courseId))
      .flatMap((c) => [c.id, ...getDependents(c.id)])
  }

  const handleToggle = (courseId) => {
    const course = courses.find((c) => c.id === courseId)

    if (completed.includes(courseId)) {
      const toRemove = [courseId, ...getDependents(courseId)]
      setCompleted(completed.filter((id) => !toRemove.includes(id)))
    } else {
      if (!isAvailable(course, completed)) return
      setCompleted([...completed, courseId])
    }
    setSaveMessage('')
  }

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
    setSaveMessage('Progress saved.')
  }

  const allCourses = courses || []
  const completedCount = allCourses.filter((c) => completed.includes(c.id)).length
  const availableCount = allCourses.filter(
    (c) => !completed.includes(c.id) && isAvailable(c, completed)
  ).length
  const lockedCount = allCourses.filter(
    (c) => !completed.includes(c.id) && !isAvailable(c, completed)
  ).length

  const visibleCourses = allCourses.filter((c) => {
    if (filter === 'completed') return completed.includes(c.id)
    if (filter === 'remaining') return !completed.includes(c.id)
    return true
  })

  const filterButtons = [
    { value: 'all', label: 'All Courses' },
    { value: 'completed', label: 'Completed Only' },
    { value: 'remaining', label: 'Remaining' },
  ]

  return (
    <div className="container-fluid page-container py-4">
      <h2 className="mb-3">CS Developer Track</h2>

      {isPending && (
        <div className="d-flex align-items-center gap-2 text-secondary">
          <div className="spinner-border spinner-border-sm" role="status"></div>
          <span>Loading courses...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}. Make sure JSON Server is running on port 3333.
        </div>
      )}

      {courses && (
        <>
          <ProgressSummary
            total={allCourses.length}
            completedCount={completedCount}
            availableCount={availableCount}
            lockedCount={lockedCount}
          />

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <div className="btn-group" role="group" aria-label="Filter courses">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  type="button"
                  className={`btn ${filter === btn.value ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setFilter(btn.value)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="d-flex align-items-center gap-3">
              {saveMessage && <span className="small text-success">{saveMessage}</span>}
              <button type="button" className="btn btn-success" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>

          <CourseList
            courses={visibleCourses}
            allCourses={allCourses}
            completed={completed}
            getStatus={getStatus}
            onToggle={handleToggle}
          />
        </>
      )}
    </div>
  )
}

export default HomePage
