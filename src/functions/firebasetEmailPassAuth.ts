import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';

// FIREBASE CONFIG
import {
  emailPassAuth,
  Googleprovider,
  Facebookprovider,
} from '../firebase/firebaseConfig';

const createAuth = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(emailPassAuth, email, password);
};

const signAuth = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(emailPassAuth, email, password);
};

// 3RD PARTY AUTH
class PartyAuth {
  static auth = emailPassAuth;

  static facebookAuthentication = async function () {
    try {
      const successReturnedData = await signInWithPopup(
        PartyAuth.auth,
        Facebookprovider
      );

      const credential =
        FacebookAuthProvider.credentialFromResult(successReturnedData);

      return credential;
    } catch (error) {
      console.error(error);
    }
  };

  static googleAuthentication = async function () {
    try {
      const successReturnedData = await signInWithPopup(
        emailPassAuth,
        Googleprovider
      );

      const credential =
        GoogleAuthProvider.credentialFromResult(successReturnedData);

      return credential;
    } catch (error) {
      console.error(error);
    }
  };
}

export { createAuth, signAuth, PartyAuth };
