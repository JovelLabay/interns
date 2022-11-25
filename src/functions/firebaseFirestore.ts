import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

// FIREBASE CONFIG
import { store } from '../firebase/firebaseConfig';

// ADD STUDENTS
const addStudents = async (
  firstName: string,
  middleName: string,
  lastName: string,
  defaultEmail: string,
  addStudentsTitle: string,
  studentStatus: boolean
) => {
  const theCollegeName = addStudentsTitle.toLowerCase().replace(/\s/g, '_');

  try {
    const studentDoc = await addDoc(collection(store, `${theCollegeName}`), {
      firstName,
      middleName,
      lastName,
      defaultEmail,
      college: addStudentsTitle,
      studentStatus,
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

// ADD INTERNSHIP PROGRAMS
const addInternshipProgram = async (
  jobTitle: string,
  jobDescription: string,
  jobEnvironment: boolean,
  allowance: boolean,
  allowanceAmount: string,
  jobCategory: string,
  jobResponsibilities: string[],
  jobQualifications: string[],
  isResponsiveHr: boolean,
  isHiredImmediately: boolean,
  isUrgent: boolean,
  userEmail?: string,
  userPhotoUrl?: string,
  userName?: string,
  userId?: string
) => {
  // replacee the white spaces of the jobCategory
  const jobCategoryName = jobCategory.replace(/\s/g, '_').toLocaleLowerCase();
  try {
    await addDoc(collection(store, jobCategoryName), {
      applicationStatus: 'CLOSED',
      applicationRate: 0,
      applicationHired: 0,
      jobTitle,
      jobDescription,
      jobEnvironment,
      allowance,
      allowanceAmount,
      jobCategory,
      jobResponsibilities,
      jobQualifications,
      isResponsiveHr,
      isHiredImmediately,
      isUrgent,
      companyShortDetails: {
        userEmail,
        userPhotoUrl,
        userName,
        userId,
      },
    });

    return 'Your internship program has been added!';
  } catch (error) {
    return {
      error,
      message: 'Error adding document',
    };
  }
};

// VERIFY STUDENT EMAIL AND COLLEGE
const verifyStudentEmailAndCollege = async (
  collegeName: string,
  studentEmail: string
) => {
  try {
    const theCollegeName = collegeName.toLowerCase().replace(/\s/g, '_');

    const q = query(
      collection(store, theCollegeName),
      where('defaultEmail', '==', studentEmail)
    );

    let studentDetails;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(
      (doc) => (studentDetails = { id: doc.id, data: doc.data() })
    );

    return studentDetails;
  } catch (error) {
    return 'error';
  }
};

export {
  addStudents,
  updateStudents,
  deleteStudents,
  addInternshipProgram,
  verifyStudentEmailAndCollege,
};
