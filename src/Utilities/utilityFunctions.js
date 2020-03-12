const checkIfEmptyObject = obj => {
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

/* const checkOutputType = output => {
  let isArray = output instanceof Array && output.constructor === Array;
  return output;
};
const clearLocalStorage = () => {
  localStorage.clear();
  console.log("Cleared local storage");
}; */

export { checkIfEmptyObject, writeToLocalStorage, readLocalStorage };
