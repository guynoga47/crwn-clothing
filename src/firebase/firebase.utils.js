import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAfRV6JDzO_pYi9VnTD96hc_ifY9VFzyGE",
  authDomain: "crwn-db-13d42.firebaseapp.com",
  databaseURL: "https://crwn-db-13d42.firebaseio.com",
  projectId: "crwn-db-13d42",
  storageBucket: "crwn-db-13d42.appspot.com",
  messagingSenderId: "281025014313",
  appId: "1:281025014313:web:a0e60b44f7b121e1524a38",
  measurementId: "G-FZSFCN8R98",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
