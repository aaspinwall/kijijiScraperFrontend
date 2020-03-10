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
      console.log("Writing results to global state", payload);
      return {
        ...state,
        searchResults: payload,
      };
    case "test":
      return {
        ...state,
        test: payload,
      };
    default:
      return state;
  }
}

export default reducer;
