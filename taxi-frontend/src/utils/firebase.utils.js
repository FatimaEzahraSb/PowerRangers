// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-7LCJUZGzLGQYjOvYC_SAVNmQJ0e2PIs",
  authDomain: "taxi-app-9c48d.firebaseapp.com",
  projectId: "taxi-app-9c48d",
  storageBucket: "taxi-app-9c48d.appspot.com",
  messagingSenderId: "123918832772",
  appId: "1:123918832772:web:243f1354e524e52eef5ed1",
  measurementId: "G-2P7GEV6HSP",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserWithEmailAndPasswordAuth = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPasswordAuth = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
