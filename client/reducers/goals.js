const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_GOALS":
      return action.goalArr;

    case "ADD_GOALS":
      return [...state, action.goals];

    case "DEL_GOALS":
      // return state.filter((goals) => goals.id !== action.id);
      return state.filter((goalsObj) => goalsObj.id !== action.id);

    case "PATCH_GOALS":
      return state.map((goal) => {
        if (goal.id === action.id) {
          goal.completed = action.newStatus;
          return goal;
        } else {
          return goal;
        }
      });

    default:
      return state;
  }
};

export default reducer;
