import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "../Redux/Reducers/reducer";

const initialState = {
  display: {},
  query: { keywords: "", maxPrice: 1500, minPrice: 1000, maxResults: 20 },
  //prettier-ignore
  blacklist: ["recherch","office","bureau","stationnement","parking","cherche"],
  test: "",
  score: 0,
  counter: 0,
  name: "myname",
  lifeCycle: "",
  showSearch: true,
  showMap: false,
  showFilters: false,
  showMapListButton: false,
  focusedResult: { show: false, index: 0 },
  windowInfo: {},
  bottomed: false,
  isLive: "one",
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
  keywords: "Plateau",
  maxPrice: 1600,
  minPrice: 1200,
  maxResults: 40,
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
  blacklist: [
    "filteredSearch",
    "filteredWords",
    "locationAverage",
    "showMap",
    "focusedResult",
    "showSearch",
    "showMapListButton",
    "showFilters",
    "lifeCycle",
    "windowInfo",
    "isLive",
    "display",
  ],
};

const pReducer = persistReducer(persistConfig, reducer);

const devOptions =
  window.location.hostname === "localhost"
    ? { trace: true, traceLimit: 10 }
    : {};

export const store = createStore(
  pReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(devOptions)
);
export const persistor = persistStore(store);

export default store;
