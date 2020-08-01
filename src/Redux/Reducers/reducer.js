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
    case "isLive":
      return {
        ...state,
        isLive: payload,
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
    case "toggleSearch":
      return {
        ...state,
        showSearch: !state.showSearch,
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
    case "focusedResult":
      return {
        ...state,
        focusedResult: { show: payload.show, index: payload.index },
      };
    case "floatingVisibility":
      return {
        ...state,
        showMapListButton: payload,
      };
    case "mapVisibility":
      return {
        ...state,
        showMap: payload,
      };

    case "changeState":
      //target a specific value
      const target = action.target;
      return {
        ...state,
        [target]: payload,
      };

    case "windowInfo":
      return {
        ...state,
        windowInfo: { ...state.windowInfo, [payload.id]: payload.value },
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
    default:
      return state;
  }
}

export default reducer;
