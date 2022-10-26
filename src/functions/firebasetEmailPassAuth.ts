import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

// FIREBASE CONFIG
import { emailPassAuth, Googleprovider } from '../firebase/firebaseConfig';

const createAuth = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(emailPassAuth, email, password);
};

const signAuth = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(emailPassAuth, email, password);
};

const signAuthWithGoogle = async () => {
  return await signInWithPopup(emailPassAuth, Googleprovider);
};

export { createAuth, signAuth, signAuthWithGoogle };
