import React from "react";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";

export default function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            MusicNote
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <LoginButton isLoggedIn={false}/>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

