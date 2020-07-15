import firebase from "firebase";
import { connect } from "react-redux";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "AIzaSyATaUgE16doxRqMmNagcbPO4Gf2RrHIUIc",
  authDomain: "kijijiscraper-c73ee.firebaseapp.com",
  databaseURL: "https://kijijiscraper-c73ee.firebaseio.com",
  projectId: "kijijiscraper-c73ee",
  storageBucket: "kijijiscraper-c73ee.appspot.com",
  messagingSenderId: "597666091378",
  appId: "1:597666091378:web:8d32aa4e6447038ff6cdeb",
  measurementId: "G-4G5XZ59WT1",
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

export const read = async (path = "/users/public/searches", callback) => {
  const response = await database.ref(path).once("value");
  const data = await response.val();
  callback(data);
  return data;
  //console.log("/// UTILITIES response: ", data);
};

export const write = async () => {
  const newPost = await database.ref().child("/users/public/searches").push()
    .key;
};
