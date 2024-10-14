import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCL8uX1TSrvAAkSC6AH4xy-V_e0NiSzPIs",
  authDomain: "hometutorhub-a8c90.firebaseapp.com",
  databaseURL: "https://hometutorhub-a8c90-default-rtdb.firebaseio.com",
  projectId: "hometutorhub-a8c90",
  storageBucket: "hometutorhub-a8c90.appspot.com",
  messagingSenderId: "309856332248",
  appId: "1:309856332248:web:aba9a8d07176867d7a6aad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Realtime Database
const db = getDatabase(app);

export { app, db, auth };
