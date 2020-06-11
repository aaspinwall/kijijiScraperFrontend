// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
let firebase = require("firebase");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("dotenv").config();

// Set the configuration for your app
const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  databaseURL: `https://kijijiscraper-c73ee.firebaseio.com`,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId,
};
//Initialize firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase;

module.exports = database;
