import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtLj5GJzrEZ72S8UYr0JlMm4Zs4HHNW1E",
  authDomain: "amwaj-de0fb.firebaseapp.com",
  databaseURL: "https://amwaj-de0fb-default-rtdb.firebaseio.com",
  projectId: "amwaj-de0fb",
  storageBucket: "amwaj-de0fb.appspot.com",
  messagingSenderId: "863925581605",
  appId: "1:863925581605:web:4b02d5557ca497a3cc4ccc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

