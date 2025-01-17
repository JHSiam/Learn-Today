// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9dVojfxei_f1sdKMVOWaMmbd_KrTjuqc",
  authDomain: "online-learning-df6bc.firebaseapp.com",
  projectId: "online-learning-df6bc",
  storageBucket: "online-learning-df6bc.firebasestorage.app",
  messagingSenderId: "192694859873",
  appId: "1:192694859873:web:6b0e1d2942dfa12a829220",
  measurementId: "G-B4NT16YQP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);