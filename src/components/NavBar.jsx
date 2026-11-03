import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid page-container">
        <Link className="navbar-brand" to="/">
          Aurora CS Course Scheduler
        </Link>
        <div className="navbar-nav ms-auto">
          <NavLink className="nav-link" to="/" end>
            Home
          </NavLink>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
