// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        score: state.score + 1,
        counter: state.counter + action.payload,
      };
    case "subtract":
      return {
        ...state,
        score: state.score - 1,
        counter: state.counter + action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
