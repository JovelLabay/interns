// FIREBASE CONFIG
import { database } from '../firebase/firebaseConfig';

// FIREBASE
import {
  set,
  ref,
  push,
  remove,
  update,
  Database,
  get,
} from 'firebase/database';

// STATIC DATA
import { data } from 'Data';

// SAVE COMPANY REGISTRATION
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
  companyEmail: string,
  companyDocuments: string[]
) => {
  try {
    const db = database;
    await set(ref(db, `companies/${uniqueId}`), {
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
      companyDocuments: [...companyDocuments],
    });
    return {
      message: 'Company registration has been saved successfully.',
      responseData: uniqueId,
    };
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

    const postListRef = ref(db, 'school/numbers');
    const newPostRef = push(postListRef);
    await set(newPostRef, {
      number: number,
      provider: networkProvider,
      dateAdded: date,
    });

    set(ref(db, `school/currentNumber`), {
      number: number,
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

    await set(ref(db, `school/currentNumber`), {
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
    const postListRef = ref(db, `school/numbers/${number}`);
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
  collegeType: string,
  collegePasscode: number,
  collegeColor: string
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
      collegePasscode: Number(collegePasscode),
      collegeColor,
    });

    return 'New College has been added successfully.';
  } catch (error) {
    return 'There was an error adding the college. Please try again later.';
  }
};

// ADD NEW LOCATION
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

// EDIT LOCATION
const editCompanyLocation = async (location: string, id: string) => {
  try {
    const db = database;

    const postListRef = ref(db, `school/locations/${id}`);
    await update(postListRef, {
      location,
    });

    return 'Location has been updated successfully.';
  } catch (error) {
    console.error(error);
  }
};

// DELETE LOCATION
const deleteCompanyLocation = async (id: string) => {
  try {
    const db = database;

    const postListRef = ref(db, `school/locations/${id}`);
    await remove(postListRef);

    return 'Location has been deleted successfully.';
  } catch (error) {
    console.error(error);
  }
};

// ADD NEW COMPANY TYPE
const addNewCompanyType = async (type: string) => {
  try {
    const db = database;

    const postListRef = ref(db, 'school/companyTypes');
    const newPostRef = push(postListRef);
    await set(newPostRef, {
      type,
    });

    return 'New Company Type has been added successfully.';
  } catch (error) {
    console.error(error);
  }
};

// DELETE COMPANY TYPE
const deleteCompanyType = async (id: string) => {
  try {
    const db = database;

    const postListRef = ref(db, `school/companyTypes/${id}`);
    await remove(postListRef);

    return 'Company Type has been deleted successfully.';
  } catch (error) {
    console.error(error);
  }
};

// EDIT COMPANY TYPE
const editCompanyType = async (type: string, id: string) => {
  try {
    const db = database;

    const postListRef = ref(db, `school/companyTypes/${id}`);
    await update(postListRef, {
      type,
    });

    return 'Company Type has been updated successfully.';
  } catch (error) {
    console.error(error);
  }
};

// GET AND ADD COMPANY CATEGORY
class CompanyCategory {
  newCategoryName?: string;
  private db: Database;
  public getCategoryLists: () => Promise<Database>;
  public setNewCategoryName: () => Promise<string | undefined>;
  public deleteCategory: (id: string) => Promise<string | undefined>;
  public editCategory: (
    id: string,
    categoryName: string
  ) => Promise<string | undefined>;

  constructor(newCategoryName?: string) {
    this.db = database;

    if (newCategoryName !== null) {
      this.newCategoryName = newCategoryName;
    }

    // GETTER
    this.getCategoryLists = async function () {
      try {
        const categoryRef = ref(this.db, 'school/categories');
        const snapshot = await get(categoryRef);
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return 'No data available';
        }
      } catch (error) {
        console.error(error);
      }
    };

    // SETTER
    this.setNewCategoryName = async function () {
      try {
        const postCatRef = ref(this.db, 'school/categories');
        const newCatRef = push(postCatRef);
        await set(newCatRef, {
          categoryName: this.newCategoryName,
        });

        return 'New Category has been added successfully.';
      } catch (error) {
        return 'There was an error adding the category. Please try again later.';
      }
    };

    // DELETE CATEGORY
    this.deleteCategory = async function (id: string) {
      try {
        const postCatRef = ref(this.db, `school/categories/${id}`);
        await remove(postCatRef);

        return 'Category has been deleted successfully.';
      } catch (error) {
        console.error(error);
      }
    };

    // EDIT CATEGORY
    this.editCategory = async function (id: string, categoryName: string) {
      try {
        const postCatRef = ref(this.db, `school/categories/${id}`);
        await update(postCatRef, {
          categoryName,
        });

        return 'Category has been updated successfully.';
      } catch (error) {
        console.error(error);
      }
    };
  }
}

export {
  // COMPANY REGISTRATION
  saveCompanyRegistration,

  // NEW USER FOR THE AUTHENTICATION
  addNewUser,

  // NUMBERS OF USERS
  updateCurrentNumber,
  deleteCurrentNumber,

  // COMPANY APPLICATION
  dismissCompanyApplication,
  pendingCompanyApplication,
  approveCompanyApplication,

  // COMPANY LOCATION
  addNewCompanyLocation,
  editCompanyLocation,
  deleteCompanyLocation,

  // COMPANY TYPE
  addNewCompanyType,
  deleteCompanyType,
  editCompanyType,

  // OTHERS
  addNewCollege,
  CompanyCategory,
};
