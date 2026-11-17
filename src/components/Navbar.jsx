// JOB: the top menu bar with links to every page.
import { NavLink } from "react-router-dom";

function Navbar() {
  // NavLink adds the class "active" to the page we are on
  return (
    <nav className="navbar navbar-expand-md navbar-dark brand-nav">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">💪 StayFit</NavLink>
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/features">Features</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;