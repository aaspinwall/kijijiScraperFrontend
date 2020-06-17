// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import "lodash/isEqual";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import isEqual from "lodash/isEqual";
//import { db } from "../Components/secrets";

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
let provider = new firebase.auth.GoogleAuthProvider();

const utilities = {
  writeToLocalStorage: (item) => {
    window.localStorage.setItem("wodlyLocalData", JSON.stringify(item));
  },
  readFromLocalStorage: () => {
    return JSON.parse(window.localStorage.getItem("wodlyLocalData"));
  },
  /**
   * @param {object} element Takes element target ie. e.target
   * @param {string} type (optional) change the default type ie. svg, div...
   */
  fixSVG: (element, type = "svg") => {
    let actualElement = element;
    //takes element target
    if (actualElement.tagName === type) return actualElement;
    while (actualElement.tagName !== type) {
      console.log("clicked on ", actualElement);
      actualElement = actualElement.parentElement;
    }
    console.log("the actual element is:", actualElement);
    //returns parent element
    return actualElement;
  },
  autoSave: (globalState) => {
    utilities.writeToLocalStorage(globalState);
  },
  quickLoad: (toGlobalState, shouldFetch = false) => {
    const fromLocalStorage = utilities.readFromLocalStorage();
    toGlobalState(fromLocalStorage);
    if (shouldFetch) {
      const { userData, workouts } = fromLocalStorage;
      /*       db.readUserData(
        (fetchedWorkouts) => {
          const areStatesEqual = isEqual(fetchedWorkouts, workouts);
          if (areStatesEqual)
            console.log("Fetched and local storage states are equal");
        },
        { user: userData.uid, path: "workouts" }
      ); */
    }
    return fromLocalStorage;
  },
};

class Auth {
  constructor(data) {
    this.actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: "https://movingday.netlify.app/",
      // This must be true.
      handleCodeInApp: true,
    };
    this.data = data;
  }
  setData = (data) => (this.data = data);
  onLoad = (toGlobalState) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const userData = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData,
        };
        //pass userData to global state
        toGlobalState(userData);
        // ...
        console.log("Auth changed, now we have: ", userData);
      } else {
        // User is signed out.
        // ...
        console.log("user signed out");
        toGlobalState({ uid: "null" });
        //dispatch({ type: "setUserData", payload: {} });
      }
    });
  };
  sendConfirmationEmail = (data) => {
    const { email } = data;

    firebase
      .auth()
      .sendSignInLinkToEmail(email, {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: "https://wodly.netlify.app/catch",
        // This must be true.
        handleCodeInApp: true,
      })
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        this.showError(error);
      });
  };
  authenticate = (flag) => {
    const { email, password } = this.data;
    flag === "login"
      ? firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error) => {
            // Handle Errors here.
            this.showError(error);
            // ...
          })
      : firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            this.showError(error);
            // Handle Errors here.
            // ...
          });
  };
  googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        this.showError(error);
      });
  };
  showError = (error) => {
    console.log(error);
  };
  signOut = () => {
    firebase.auth().signOut();
  };
}
//export { utilities, firebase, Auth };
