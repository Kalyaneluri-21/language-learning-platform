import React from "react";
import { NavLink } from "react-router-dom";
import "./App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/dashboard/lessons"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Lessons
      </NavLink>
      <NavLink
        to="/dashboard/progress"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Progress
      </NavLink>
      <NavLink
        to="/dashboard/insights"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Cultural Insights
      </NavLink>
      <NavLink
        to="/dashboard/challenge"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Weekly Challenge
      </NavLink>
    </nav>
  );
};

export default Navbar;
