interface Welcome {
  starterWelcome: boolean;
}

interface Dynamic {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    userName: string;
    userEmail: string;
    userPhotoUrl: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      userName: string;
      userEmail: string;
      userPhotoUrl: string;
    }>
  >;
}

// AUTHENTICATION FOR EMAIL AND PASSWORD
interface AuthEmailPassword {
  email: string;
  password: string;
}

// COMPANY REGISTRATION
interface CompanyRegistrationInterface {
  companyName: string;
  companyDescription: string;
  companyMission: string;
  companyVison: string;
}

// SCHOOL REGISTRATION
interface SchoolRegistrationInterface {
  number: string;
}

// ADDING OF STUDENT
interface AddStudentInterface {
  firstName: string;
  lastName: string;
  middleName: string;
  defaultEmail: string;
}

// WITH COLLEGE NAME
interface AddStudentWithCollegeInterface extends AddStudentInterface {
  college: string;
  id: string;
}
interface AddStudentWithCollegeInterfaceWithHanler
  extends AddStudentWithCollegeInterface {
  isEdit: string;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      addStudents: boolean;
      addStudentsTitle: string;
      isSearch: string;
      isEdit: string;
      searchInput: string;
      studentNumber: number;
    }>
  >;
}
interface StudentListInterface {
  agriculture: {
    firstName: string;
    lastName: string;
    middleName: string;
    defaultEmail: string;
    id: string;
  }[];
  arts_and_Sciences: {
    firstName: string;
    lastName: string;
    middleName: string;
    defaultEmail: string;
    id: string;
  }[];
  computer_Studes: {
    firstName: string;
    lastName: string;
    middleName: string;
    defaultEmail: string;
    id: string;
  }[];
  engineering: {
    firstName: string;
    lastName: string;
    middleName: string;
    defaultEmail: string;
    id: string;
  }[];
  nursing: {
    firstName: string;
    lastName: string;
    middleName: string;
    defaultEmail: string;
    id: string;
  }[];
  business_and_Management: {
    firstName: string;
    lastName: string;
    middleName: string;
    defaultEmail: string;
    id: string;
  }[];
  education: {
    firstName: string;
    lastName: string;
    middleName: string;
    defaultEmail: string;
    id: string;
  }[];
}

// COMPANY OBJECT LIST
interface CompanyListInterface {
  companyApproval: boolean;
  companyDescription: string;
  companyLogo: string;
  companyMission: string;
  companyVison: string;
  companyName: string;
  companyPhotos: string[];
  dateFounded: {
    DD: string;
    MM: string;
    YYYY: string;
  };
  locationOfCompany: string;
  typeOfCompany: string;
  companyDismiss: boolean;
  companyEmail: string;
}

// ADD USER OBJECT LIST
interface AddUserInterface {
  dateAdded: string;
  number: string;
  provider: string;
}

// ADD NEW COLLEGE
interface AddCollegeInterface {
  nameOfCollege: string;
  shortNameOfCollege: string;
  nameOfDean: string;
  professionOfDean: string;
  collegeType: string;
}

// SEND EMAIL MESSAGE
interface SendEmailInterface {
  subject: string;
  greetings: string;
  introduction: string;
  bodyMessage: string;
  closing: string;
}

// LISTING OF COLLEGES
interface CollegeListInterface {
  collegeDean: string;
  collegeName: string;
  collegeType: string;
  professionOfDean: string;
  shortCollegeName: string;
}

// FORM LIST QUESTIONNAIRE
interface FormListQuestionnaireInterface {
  questionnaire: {
    labelName: string;
    labelId: string;
    labelType: string;
    multipleChoice:
      | {
          option1: string;
          option2: string;
          option3: string;
        }
      | undefined;
    trueOrFalse:
      | {
          option1: string;
          option2: string;
        }
      | undefined;
  }[];
}
