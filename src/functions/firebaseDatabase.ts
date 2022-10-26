import { database } from '../firebase/firebaseConfig';
import { set, ref, push, remove, update } from 'firebase/database';
import { data } from 'Data';

const saveCompanyRegistration = async (
  days: string,
  months: string,
  years: string,
  typeOfCompany: string,
  locationOfCompany: string,
  companyName: string,
  companyMission: string,
  companyVison: string,
  companyDescription: string,
  uniqueId: string,
  companyLogoUrl: string,
  companyPohotos: string[],
  companyEmail: string
) => {
  try {
    const db = database;
    set(ref(db, `companies/${uniqueId}`), {
      companyName,
      companyMission,
      companyVison,
      companyDescription,
      typeOfCompany,
      locationOfCompany,
      dateFounded: {
        DD: days,
        MM: months,
        YYYY: years,
      },
      companyLogo: companyLogoUrl,
      companyPhotos: [...companyPohotos],
      companyApproval: data.admin.companyApplicationStatus[3].name,
      companyEmail,
    });
    return 'Your company has been registered successfully';
  } catch (error) {
    return {
      error: error,
      message: 'There was an error registering your company',
    };
  }
};

// ADD NEW USER TO BE USE FOR OTP
const addNewUser = async (
  number: string,
  networkProvider: string,
  date: string
) => {
  try {
    const db = database;

    const postListRef = ref(db, 'companyUsers/numbers');
    const newPostRef = push(postListRef);
    await set(newPostRef, {
      number: number,
      provider: networkProvider,
      dateAdded: date,
    });

    set(ref(db, `companyUsers/currentNumber`), {
      number: 'bnmbn',
    });

    return 'User number has been added successfully';
  } catch (error) {
    console.log(error);
  }
};

// UPDATE THE CURRENT NUMBER TO BE USE FOR OTP
const updateCurrentNumber = async (number: string) => {
  try {
    const db = database;

    await set(ref(db, `companyUsers/currentNumber`), {
      number,
    });

    return 'User Number has been updated successfully';
  } catch (error) {
    console.log(error);
  }
};

const deleteCurrentNumber = async (number: string) => {
  try {
    const db = database;

    // remove one item from the companyUsers/numbers
    const postListRef = ref(db, `companyUsers/numbers/${number}`);
    await remove(postListRef);

    return 'User number has been added successfully';
  } catch (error) {
    console.log(error);
  }
};

// DISMISS | PENDING | APPROVE COMPANY APPLICATION
const dismissCompanyApplication = async (uniqueId: string) => {
  try {
    const db = database;
    const companyDeleteReference = ref(db, `companies/${uniqueId}`);
    await update(companyDeleteReference, {
      companyApproval: data.admin.companyApplicationStatus[2].name,
    });
    return 'Company application has been dismissed successfully';
  } catch (error) {
    console.error(error);
  }
};
const pendingCompanyApplication = async (uniqueId: string) => {
  try {
    const db = database;
    const companyDeleteReference = ref(db, `companies/${uniqueId}`);
    await update(companyDeleteReference, {
      companyApproval: data.admin.companyApplicationStatus[1].name,
    });
    return 'Company application has been marked pending successfully';
  } catch (error) {
    console.error(error);
  }
};
const approveCompanyApplication = async (uniqueId: string) => {
  try {
    const db = database;
    const companyDeleteReference = ref(db, `companies/${uniqueId}`);
    await update(companyDeleteReference, {
      companyApproval: data.admin.companyApplicationStatus[0].name,
    });
    return 'Company application has been approved successfully';
  } catch (error) {
    console.error(error);
  }
};

// ADD NEW COLLEGE
const addNewCollege = async (
  collegeName: string,
  shortCollegeName: string,
  collegeDean: string,
  professionOfDean: string,
  collegeType: string
) => {
  try {
    const db = database;

    const collegeRef = ref(db, 'school/colleges');
    const newCollegeRef = push(collegeRef);
    await set(newCollegeRef, {
      collegeName,
      shortCollegeName,
      collegeDean,
      professionOfDean,
      collegeType,
    });

    return 'New College has been added successfully.';
  } catch (error) {
    return 'There was an error adding the college. Please try again later.';
  }
};

// ADD NEW USER TO BE USE FOR OTP
const addNewCompanyLocation = async (location: string) => {
  try {
    const db = database;

    const postListRef = ref(db, 'school/locations');
    const newPostRef = push(postListRef);
    await set(newPostRef, {
      location,
    });

    return 'New Location has been added successfully.';
  } catch (error) {
    console.error(error);
  }
};

export {
  saveCompanyRegistration,
  addNewUser,
  updateCurrentNumber,
  deleteCurrentNumber,
  dismissCompanyApplication,
  pendingCompanyApplication,
  approveCompanyApplication,
  addNewCollege,
  addNewCompanyLocation,
};
