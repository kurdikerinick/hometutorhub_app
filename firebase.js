import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxX",
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db }; 
