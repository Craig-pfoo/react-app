import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TaskManager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            {user && (
              <React.Fragment>
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/tasks"
                >
                  Tasks
                </NavLink>

                <NavLink className="nav-link" to="../admin/dashboard">
                  Admin
                </NavLink>
              </React.Fragment>
            )}
            {!user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/loginScreen">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/registerUser">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
