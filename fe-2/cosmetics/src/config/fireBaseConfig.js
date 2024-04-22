// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdGXrQ3auS1wB-8bdlZ9swi3fUxyWZOaw",
  authDomain: "sprint-2-14070.firebaseapp.com",
  projectId: "sprint-2-14070",
  storageBucket: "sprint-2-14070.appspot.com",
  messagingSenderId: "507534259972",
  appId: "1:507534259972:web:c820d2a5d7c176cdbec251",
  measurementId: "G-VKZY62K1QF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

