import { createStore } from "redux";
import reducer from "./Reducers/reducer";
const initialState = {
  score: 0,
  counter: 0,
  name: "myname",
  searchResults: [{ title: "Nothing here" }],
  username: "aaspinwall",
  keywords: "",
  maxPrice: 1500,
  maxResults: 50,
  filteredWords: ["recherch", "office", "bureau", "stationnement", "parking"],
};

// Optional - you can pass `initialState` as a second arg
let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
