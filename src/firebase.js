import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyB8Mz6oe9DjTrP9vey9CXgErOlk3uWQbL4",
  authDomain: "authentication-b823c.firebaseapp.com",
  databaseURL: "https://authentication-b823c.firebaseio.com",
  projectId: "authentication-b823c",
  storageBucket: "authentication-b823c.appspot.com",
  messagingSenderId: "175987375200",
  appId: "1:175987375200:web:235d2969fae4dfd3fa5705",
  measurementId: "G-06WCJMK3RM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function signOutGoogle() {
  firebase.auth().signOut();
}

export function logWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(snapshot => snapshot.user);
}
