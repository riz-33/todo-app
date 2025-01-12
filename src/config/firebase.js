import { initializeApp } from "firebase/app";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "firebase/auth";
import {
  getFirestore, doc, setDoc, getDoc, collection, serverTimestamp, updateDoc, addDoc,
  onSnapshot, query, orderBy, getDocs, where
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB5FfkZ0crpaGIKnbaIKuMXKWDKCbs8OF8",
  authDomain: "react-todo-app-38c8a.firebaseapp.com",
  projectId: "react-todo-app-38c8a",
  storageBucket: "react-todo-app-38c8a.firebasestorage.app",
  messagingSenderId: "951365056445",
  appId: "1:951365056445:web:89190eaa709f7279e104d4",
  measurementId: "G-XE19H8H3BS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, db, doc, setDoc,
  getDoc, signOut, collection, serverTimestamp, updateDoc, addDoc, onSnapshot, query, orderBy, getDocs, where
}