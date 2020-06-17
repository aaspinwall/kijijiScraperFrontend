import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "../Redux/Reducers/reducer";
const initialState = {
  test: "",
  score: 0,
  counter: 0,
  name: "myname",
  lifeCycle: "",
  showSearch: true,
  showMap: false,
  showFilters: false,
  showFloating: true,
  focusedResult: { show: false, index: 0 },
  bottomed: false,
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
  filteredWords: [
    "recherch",
    "office",
    "bureau",
    "stationnement",
    "parking",
    "cherche",
  ],
};
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["showHide"], // navigation will not be persisted
};

const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  pReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);

export default store;
