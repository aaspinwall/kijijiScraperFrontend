// Reducer
function reducer(state, action) {
  const payload = action.payload;
  switch (action.type) {
    case "input":
      const id = action.id;
      return {
        ...state,
        [id]: payload,
      };
    case "keywords":
      return {
        ...state,
        keywords: payload,
      };
    case "clearResults":
      return { ...state, searchResults: {} };

    case "results":
      return {
        ...state,
        searchResults: payload,
      };
    case "subtract":
      return {
        ...state,
        score: state.score - 1,
        counter: state.counter + payload,
      };
    default:
      return state;
  }
}

export default reducer;
