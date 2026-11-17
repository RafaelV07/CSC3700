import { useState } from 'react'

const AUTHORS = 'Rafael V'
const APP_VERSION = '2.0.0'

const formatToday = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const AboutPage = () => {
  const [today] = useState(formatToday)

  return (
    <div className="container-fluid page-container py-4">
      <div className="card shadow-sm mx-auto about-card">
        <div className="card-body">
          <h2 className="card-title">About</h2>
          <p>
            The Aurora CS Course Scheduler shows the CS Developer Track catalog, tracks which
            courses you have completed, and shows which courses you are eligible to take next.
          </p>
          <div className="row mb-2">
            <div className="col-4 fw-bold">Author(s)</div>
            <div className="col-8">{AUTHORS}</div>
          </div>
          <div className="row mb-2">
            <div className="col-4 fw-bold">Date</div>
            <div className="col-8">{today}</div>
          </div>
          <div className="row">
            <div className="col-4 fw-bold">Version</div>
            <div className="col-8">{APP_VERSION}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
