import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA14cd6cJjIRU3Ow7e_ixhIOHKn7AcKiTU",
  authDomain: "hopeshop-67303.appspot.com",
  projectId: "hopeshop-67303",
  storageBucket: "hopeshop-67303.appspot.com",
  messagingSenderId: "87845754589",
  appId:"1:87845754589:android:1358bce30eb2b66ea12d34",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  auth,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  signInWithEmailAndPassword,
  signOut,
  deleteDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
};
