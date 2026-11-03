const ProgressSummary = ({ total, completedCount, availableCount, lockedCount }) => {
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap gap-4 align-items-baseline mb-2">
          <span className="text-secondary">
            <span className="fs-4 fw-bold text-success me-1">{completedCount}</span>
            of {total} courses completed
          </span>
          <span className="text-secondary">
            <span className="fs-4 fw-bold text-primary me-1">{availableCount}</span>
            available
          </span>
          <span className="text-secondary">
            <span className="fs-4 fw-bold text-secondary me-1">{lockedCount}</span>
            locked
          </span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Courses completed"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="progress-bar bg-success" style={{ width: `${percent}%` }}>
            {percent > 0 ? `${percent}%` : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressSummary
