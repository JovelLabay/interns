import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

function signoutStudent() {
  signOut(emailPassAuth)
    .then(() => {
      localStorage.removeItem('studentDetials');
      null;
    })
    .catch(() => null);
}

export { signoutStudent };
