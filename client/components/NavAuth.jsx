import React from "react";

// import { useAuth0 } from '@auth0/auth0-react'
import { Link } from "react-router-dom";

import SignOut from "./SignOut";

const NavAuth = () => {
  // const { isAuthenticated } = useAuth0()

  const linkStyle = {
    color: "#2C3333",
    textDecoration: "none",
  };

  return (
    // isAuthenticated &&
    <div className="nav-container">
      <div>
        <Link className="resolute-link" to="/">
          Resolute.{" "}
        </Link>
      </div>

      <div className="links-container">
        <div className="myGoals-container">
          <Link className="goals-link" to="/mygoals" style={linkStyle}>
            My Goals
          </Link>
        </div>

        <div className="completed-container">
          <Link className="goals-link" to="/completed" style={linkStyle}>
            Completed Goals
          </Link>
        </div>
      </div>

      <div className="na-button-cont">
        <SignOut />
      </div>
    </div>
  );
};

export default NavAuth;
