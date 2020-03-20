import { createStore } from "redux";
import reducer from "./Reducers/reducer";
const initialState = {
  test: "",
  score: 0,
  counter: 0,
  name: "myname",
  lifeCycle: "",
  showMap: false,

  searchResults: [
    {
      title: "Nothing here",
      images: [],
      attributes: {
        location: {
          latitude: 0,
          longitude: 0,
          mapAddress: "",
          province: "",
          mapRadius: 0,
        },
      },
    },
  ],
  filteredSearch: [
    {
      title: "Nothing here",
      images: [],
      attributes: {
        location: {
          latitude: 0,
          longitude: 0,
          mapAddress: "",
          province: "",
          mapRadius: 0,
        },
      },
    },
  ],
  resultAnalysis: {
    locationAverage: { x: 0, y: 0 },
  },
  username: "aaspinwall",
  keywords: "",
  maxPrice: 1500,
  minPrice: 300,
  maxResults: 80,
  filteredWords: ["recherch", "office", "bureau", "stationnement", "parking"],
};

// Optional - you can pass `initialState` as a second arg
let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
