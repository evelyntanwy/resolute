import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SetGoals from "./SetGoals";
import Quotes from "./Quotes";

import HomeFooter from "./HomeFooter";
import { thunkAddNewGoal, thunkGetAllGoals } from "../actions/goals";
// import { useAuth0 } from '@auth0/auth0-react'

function HomeAuth() {
  // const { isAuthenticated } = useAuth0()
  const dispatch = useDispatch();
  const results = useSelector((globalState) => globalState.goals);
  const newGoals = useSelector((globalState) => globalState.newGoals);
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [inputText, setInputText] = useState("");
  const [filteredGoals, setFilteredGoals] = useState([]);

  useEffect(() => {
    dispatch(thunkGetAllGoals());
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const inputTextHandler = (evt) => {
    setInputText(evt.target.value);
  };

  const submitGoalHandler = (evt) => {
    evt.preventDefault();
    setTodos(
      [
        ...todos,
        {
          details: inputText,
          completed: false,
        },
      ],
      dispatch(thunkAddNewGoal(inputText))
    );
    setInputText("");
  };

  const filteredResults = results.filter((goal) => {
    const id = goal.id;
    return newGoals.includes(id);
  });

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredGoals(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredGoals(todos.filter((todo) => todo.uncompleted === false));
        break;
      default:
        setFilteredGoals(todos);
    }
  };

  return (
    // isAuthenticated &&
    <>
      <form onSubmit={submitGoalHandler}>
        <input
          onChange={inputTextHandler}
          value={inputText}
          className="goalInput-text-box"
          type="text"
          placeholder="Enter your goal here..."
        ></input>
      </form>

      <div className="goals-card">
        <div className="goals-container">
          <div className="todo-container">
            <ul className="todo-list">
              {filteredResults.map((todo) => (
                <SetGoals
                  key={todo.id}
                  setTodos={setTodos}
                  todos={todos}
                  todo={todo}
                  details={todo.details}
                  filteredGoals={filteredGoals}
                />
              ))}
            </ul>
          </div>
        </div>

        <div>
          <button type="submit" className="goals-card-button">
            <Link className="goals-link" to="/mygoals">
              View All Goals
            </Link>
          </button>
        </div>
      </div>

      <Quotes />

      <HomeFooter />
    </>
  );
}

export default HomeAuth;
