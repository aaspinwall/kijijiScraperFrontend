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
    case "filtered":
      return {
        ...state,
        filteredSearch: payload,
      };
    //Life Cycle states tell the components when to render. Available options are:
    //Initial - Loads components and gets data
    //Static - App is running with results on display
    //Loading - Results are being fetched
    //Error
    case "lifeCycle":
      return {
        ...state,
        lifeCycle: payload,
      };
    case "toggleMap":
      return {
        ...state,
        showMap: !state.showMap,
      };
    case "toggleFilters":
      return {
        ...state,
        showFilters: !state.showFilters,
      };
    case "toggleMini":
      return {
        ...state,
        miniResult: { show: payload.show, index: payload.index },
      };
    default:
      return state;
  }
}

export default reducer;
