import { database } from '../firebase/firebaseConfig';
import { set, ref, push, child, update, remove } from 'firebase/database';

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
  companyPohotos: string[]
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

export {
  saveCompanyRegistration,
  addNewUser,
  updateCurrentNumber,
  deleteCurrentNumber,
};
