// Firebase setup for Language Learning Platform
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOHzF5E0I2pcuoa8jEEwfWQpaaiGF_jBw",
  authDomain: "language-learning-platfo-d8572.firebaseapp.com",
  databaseURL:
    "https://language-learning-platfo-d8572-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "language-learning-platfo-d8572",
  storageBucket: "language-learning-platfo-d8572.firebasestorage.app",
  messagingSenderId: "637044123460",
  appId: "1:637044123460:web:8d12882831fa7e99bc1911",
  measurementId: "G-9ZV6ZT9SSH",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };
