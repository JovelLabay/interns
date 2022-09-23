import { addDoc, collection } from 'firebase/firestore';
import { store } from '../firebase/firebaseConfig';

const addStudents = async (
  firstName: string,
  middleName: string,
  lastName: string,
  defaultEmail: string,
  addStudentsTitle: string
) => {
  try {
    const studentDoc = await addDoc(collection(store, `${addStudentsTitle}`), {
      firstName,
      middleName,
      lastName,
      defaultEmail,
      college: addStudentsTitle,
    });
    return 'Document written with ID: ' + studentDoc.id;
  } catch (error) {
    return 'Error adding document: ' + error;
  }
};

export { addStudents };
