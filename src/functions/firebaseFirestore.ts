import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

// FIREBASE CONFIG
import { store } from '../firebase/firebaseConfig';

// ADD STUDENTS
const addStudents = async (
  firstName: string,
  middleName: string,
  lastName: string,
  defaultEmail: string,
  addStudentsTitle: string
) => {
  const theCollegeName = addStudentsTitle.toLowerCase().replace(/\s/g, '_');

  try {
    const studentDoc = await addDoc(collection(store, `${theCollegeName}`), {
      firstName,
      middleName,
      lastName,
      defaultEmail,
      college: addStudentsTitle,
    });
    return studentDoc.id;
  } catch (error) {
    return 'Error adding document: ' + error;
  }
};

// UPDATE STUDENTS
const updateStudents = async (
  collegeName: string,
  studentId: string,
  firstName: string,
  middleName: string,
  lastName: string
) => {
  const theCollegeName = collegeName.toLowerCase().replace(/\s/g, '_');

  const studentReference = doc(store, theCollegeName, studentId);

  try {
    await updateDoc(studentReference, {
      firstName,
      middleName,
      lastName,
    });
    return 'Document successfully updated!';
  } catch (error) {
    console.log('Error updating document: ', error);
    return 'Error updating document: ' + error;
  }
};

// DELETE STUDENTS
const deleteStudents = async (collegeName: string, studentId: string) => {
  const theCollegeName = collegeName.toLowerCase().replace(/\s/g, '_');

  const studentReference = doc(store, theCollegeName, studentId);

  try {
    await deleteDoc(studentReference);
    return 'Document successfully deleted!';
  } catch (error) {
    console.error('Error removing document: ', error);
    return 'Error removing document: ' + error;
  }
};

export { addStudents, updateStudents, deleteStudents };
