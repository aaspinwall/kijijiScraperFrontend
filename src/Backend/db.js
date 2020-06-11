const firebase = require("./firebase");
const colors = require("colors");

const readUserData = async query => {
  console.log("Reading user data...");
  const database = await firebase.database();
  const reference = await database.ref("/users/" + query);
  const response = await reference.once("value");
  const value = await response.val();
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};

function writeUserData(username, data) {
  firebase
    .database()
    .ref("/users/" + username)
    .set(data);
}
function wipeUserData(username, uid, email) {
  firebase
    .database()
    .ref("/users/")
    .set({});
}

module.exports = {
  readUserData: readUserData,
  writeUserData: writeUserData,
};
