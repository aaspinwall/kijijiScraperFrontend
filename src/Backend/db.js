const firebase = require("./firebase");
const colors = require("colors");

const readUserData = async (query) => {
  console.log("Reading user data...");
  const database = await firebase.database();
  const reference = await database.ref("/users/" + query);
  const response = await reference.once("value");
  const value = await response.val();
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};

const newSearch = (user, response) => {
  const { query, results } = response;
  //const newPostKey = firebase.database().ref().child('posts').push().key;
  const time = new Date().getTime();
  const data = { query, results, time };
  const ref = `/users/${user}/searches/`;
  const newPostKey = firebase.database().ref(ref).push().key;
  firebase
    .database()
    .ref(ref + newPostKey)
    .update(data);
};

function writeUserData(username, data) {
  firebase
    .database()
    .ref("/users/" + username)
    .set(data);
}

module.exports = {
  readUserData: readUserData,
  writeUserData: writeUserData,
  newSearch: newSearch,
};
