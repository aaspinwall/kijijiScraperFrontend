const checkIfEmptyObject = (obj) => {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

const writeToLocalStorage = (data, key = "latestResults") => {
  localStorage.setItem(key, JSON.stringify(data));
  console.log("Saved to local storage");
};
const readLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("latestResults"));
  } catch (error) {
    console.log("Error while reading local storage", error);
  }
};
const keys = { googleMapsApiKey: "AIzaSyA7G5DGlaGV4O2-Vr6M5b5Odvf6ikYZG_U" };

export { checkIfEmptyObject, writeToLocalStorage, readLocalStorage, keys };
