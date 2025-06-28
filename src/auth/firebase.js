import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDgCWlp9HK7PLy8m1MiXRXdQrAod5KCwE",
  authDomain: "booklibrary-c1b67.firebaseapp.com",
  projectId: "booklibrary-c1b67",
  storageBucket: "booklibrary-c1b67.appspot.com",
  messagingSenderId: "711300589543",
  appId: "1:711300589543:web:1124af024fcd7e6bcbbf42",
  measurementId: "G-WFVD9SD4TF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };