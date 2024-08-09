// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxTRWP__1S4lbkk7ul5z5wrXV2EDuaqds",
  authDomain: "jobs-8c6e5.firebaseapp.com",
  projectId: "jobs-8c6e5",
  storageBucket: "jobs-8c6e5.appspot.com",
  messagingSenderId: "257270896687",
  appId: "1:257270896687:web:4db4a636cb56d3bc254eda",
  measurementId: "G-8Z13WLP6NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const deleteObject = getStorage(app);
const refFromURL = getStorage(app);

export { auth, db, storage, deleteObject, refFromURL };