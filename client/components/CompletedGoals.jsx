import React, { useEffect } from "react";
import Confetti from "react-confetti";

import { useDispatch, useSelector } from "react-redux";
// import { useAuth0 } from '@auth0/auth0-react'

import { thunkGetAllGoals } from "../actions/goals";

import Footer from "./Footer";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const CompletedGoals = () => {
  // const { isAuthenticated } = useAuth0()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetAllGoals());
  }, []);

  const results = useSelector((globalState) => globalState.goals);

  return (
    // isAuthenticated &&
    <>
      <div className="mygoals-card">
        <h3>
          <u>Completed Goals</u>
        </h3>

        <div className="myGoalsContainer">
          <ul className="addedgoals">
            {results.map((goals) => {
              if (goals.completed === 1) {
                return <li key={goals.details}>{goals.details}</li>;
              }
            })}
          </ul>
          <div>
            <button type="submit" className="goals-link">
              YaY!
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CompletedGoals;
