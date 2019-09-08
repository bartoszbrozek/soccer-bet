import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

// FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyC8hvBRvaWl5oPteYRqzwdvAZwdS4u8o2o",
    authDomain: "soccerfamilybet.firebaseapp.com",
    databaseURL: "https://soccerfamilybet.firebaseio.com",
    projectId: "soccerfamilybet",
    storageBucket: "",
    messagingSenderId: "615046130418",
    appId: "1:615046130418:web:5b7effc740baa21e7cbe6b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  window.firebase = firebase
  window.FacebookProvider = new firebase.auth.FacebookAuthProvider();

  const providers = {
      Facebook: new firebase.auth.FacebookAuthProvider()
  }

  export default {
    namespaced: true,
    firebase,
    providers
}
