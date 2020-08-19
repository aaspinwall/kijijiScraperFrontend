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

/**
 * Sends search object to the server and returns formatted ads
 *
 * @param {string} url
 * @param {function} callback returns the response / false if error
 * @return {undefined}
 */
export const apiCall = async (url, callback) => {
  try {
    console.log("apiCall on ", url);
    const body = await fetch(url);
    const response = await body.json();
    callback(response);
  } catch (error) {
    console.log("API Call failed with error message: ", error);
    return null;
  }
};
/**
 * Sends search object to the server and returns formatted ads
 *
 * @param {string} message JSON stringified message
 * @param {function} responseCallback returns results or error object
 * @param {function} onCompleteCallback (optional)
 * @return {undefined}
 */
export const search = async (
  message,
  resultsToCallback,
  callbackOnComplete
) => {
  //Heroku server
  const hostUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://limitless-cove-26677.herokuapp.com";
  const url = `${hostUrl}/search`;
  try {
    const req = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: message,
    });
    const body = await req.json();
    resultsToCallback(body);
  } catch (error) {
    const message = `Error connecting to ${url} / Search operation triggered this error`;
    resultsToCallback({ message, error });
    console.log(message);
  } finally {
    callbackOnComplete();
  }
};

export { checkIfEmptyObject, writeToLocalStorage, readLocalStorage, keys };
