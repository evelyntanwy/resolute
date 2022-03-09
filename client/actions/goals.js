import {
  fetchAllGoals,
  postNewGoals,
  deleteGoals,
  updateGoals,
} from "../apis/goals";

export const ADD_GOALS = "ADD_GOALS";
export const GET_GOALS = "GET_GOALS";
export const DEL_GOALS = "DEL_GOALS";
export const PATCH_GOALS = "PATCH_GOALS";

export function getGoals(goalArr) {
  return {
    type: GET_GOALS,
    goalArr,
  };
}

export function addGoals(goals) {
  return {
    type: ADD_GOALS,
    goals,
  };
}

export function delGoals(id) {
  return {
    type: DEL_GOALS,
    id,
  };
}

export function patchGoals(id, newStatus) {
  return {
    type: PATCH_GOALS,
    id,
    newStatus,
  };
}
// thunk FOR GET GOALS

export function thunkGetAllGoals() {
  return (dispatch) => {
    fetchAllGoals()
      .then((goals) => {
        dispatch(getGoals(goals));
        return null;
      })
      .catch((err) => {
        const errMessage = err.response?.text || err.message;
        console.log(errMessage);
        return null;
      });
  };
}

// thunk FOR ADD GOALS

export function thunkAddNewGoal(goals) {
  const newGoals = { details: goals, completed: false };

  return (dispatch) => {
    postNewGoals(newGoals)
      .then((goalsArr) => {
        // const goalsId = goalsArr[0]
        // newGoals.id = goalsId
        const goalsObj = goalsArr[0];
        newGoals.id = goalsObj.id;
        dispatch(addGoals(newGoals));
        return null;
      })
      .catch((err) => {
        const errMessage = err.response?.text || err.message;
        console.log(errMessage);
        return null;
      });
  };
}

// thunk FOR DELETE GOALS

export function thunkDelGoal(id) {
  return (dispatch) => {
    deleteGoals(id)
      .then(() => {
        dispatch(delGoals(id));
        return null;
      })
      .catch((err) => {
        const errMessage = err.response?.text || err.message;
        console.log(errMessage);
        return null;
      });
  };
}

// thunk for Update Goals

export function thunkUpdateGoals(id, newStatus) {
  return (dispatch) => {
    updateGoals(id, newStatus)
      .then(() => {
        dispatch(patchGoals(id, newStatus));
        return null;
      })
      .catch((err) => {
        const errMessage = err.response?.text || err.message;
        console.log(errMessage);
        return null;
      });
  };
}
