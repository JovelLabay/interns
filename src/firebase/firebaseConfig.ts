// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// DB METHODS
import { getFirestore } from 'firebase/firestore';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  databaseUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const emailPassAuth = getAuth(app);
const database = getDatabase(app);
const storgae = getStorage(app);
const store = getFirestore(app);

// 3RD PARTY AUTH
const Googleprovider = new GoogleAuthProvider();
const Facebookprovider = new FacebookAuthProvider();

// API URL
const domain = process.env.NEXT_PUBLIC_EMAIL_ENDPOINT;

// EXPORTS
export {
  app,
  emailPassAuth,
  database,
  storgae,
  store,
  domain,
  Googleprovider,
  Facebookprovider,
};
