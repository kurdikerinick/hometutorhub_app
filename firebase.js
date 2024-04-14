import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAaaxRXLSTUCNRW3sjgzMn5ocwh-KEdMZE",
  authDomain: "srtdemo-dfee0.firebaseapp.com",
  databaseURL: "https://srtdemo-dfee0-default-rtdb.firebaseio.com",
  projectId: "srtdemo-dfee0",
  storageBucket: "srtdemo-dfee0.appspot.com",
  messagingSenderId: "488445210099",
  appId: "1:488445210099:web:a094318e1cdd2ef37a7686"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db }; 