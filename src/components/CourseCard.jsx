const CourseCard = ({ course, allCourses, status, isCompleted, onToggle }) => {
  const isLocked = status === 'Locked'

  const prereqNumbers = course.prerequisites.map((prereqId) => {
    const prereq = allCourses.find((c) => c.id === prereqId)
    return prereq ? prereq.number : prereqId
  })
  const prereqText = prereqNumbers.length > 0 ? prereqNumbers.join(', ') : 'None'

  const cardClass = {
    Completed: 'course-completed',
    Available: 'course-available',
    Locked: 'course-locked',
  }[status]

  const badgeClass = {
    Completed: 'text-bg-success',
    Available: 'text-bg-primary',
    Locked: 'text-bg-secondary',
  }[status]

  return (
    <div className={`card h-100 course-card ${cardClass}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-bold">{course.number}</span>
        <span className={`badge ${badgeClass}`}>
          {isLocked && '🔒 '}
          {status}
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <p className="small text-body-secondary mb-2">{course.credits} credits</p>
        <p className="card-text">{course.description}</p>
        <p className="small mb-0">
          <strong>Prerequisites:</strong> {prereqText}
        </p>
      </div>
      <div className="card-footer">
        <div className="form-check mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            id={`course-${course.id}`}
            checked={isCompleted}
            disabled={isLocked}
            onChange={() => onToggle(course.id)}
          />
          <label className="form-check-label" htmlFor={`course-${course.id}`}>
            {isLocked ? 'Complete prerequisites first' : 'Completed'}
          </label>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
