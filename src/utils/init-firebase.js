import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || "AIzaSyCAEvzAHSy-JHqX43BQFNbew7kHFEabQEo",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || "reacttest-68805.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID || "reacttest-68805",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "reacttest-68805.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "105401689167",
  appId: process.env.REACT_APP_APP_ID || "1:105401689167:web:fbf21191ace7956a54b63a",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
export const auth = getAuth(app)
