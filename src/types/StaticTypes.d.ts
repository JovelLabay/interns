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
    userId: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      userName: string;
      userEmail: string;
      userPhotoUrl: string;
      userId: string;
    }>
  >;
}

// JOB CATEGORY IS ACTIVE
interface JobCategoryIsActiveInterface {
  activeCompanyJobCategory: string;
  setActiveCompanyJobCategory: React.Dispatch<React.SetStateAction<string>>;
}
interface UserCompanyObject extends JobCategoryIsActiveInterface {
  companyUserObject: {
    companyQuestionnaire: never[];
    companyCategories: never[];
    companyInternships: never[];
  };
  setCompanyUserObject: React.Dispatch<
    React.SetStateAction<{
      companyQuestionnaire: never[];
      companyCategories: never[];
      companyInternships: never[];
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
  collegePasscode: string;
  collegeColor: string;
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
  collegeColor: string;
}

// FORM LIST QUESTIONNAIRE
interface FormListQuestionnaireInterface {
  labelName: string;
  labelId: string;
  labelType: string;
  mutltipleChoice: string[];
}

interface FormEditedQuestionnaireInterface {
  editQuestionnaire: {
    labelId: string;
    labelName: string;
    labelType: string;
    mutltipleChoice: string[];
  };
  setEditQuestionnaire: React.Dispatch<
    React.SetStateAction<{
      labelId: string;
      labelName: string;
      labelType: string;
      mutltipleChoice: string[];
    }>
  >;
}

interface AddFreshQuestionnaire {
  setAddFreshQuestionnaire: React.Dispatch<
    React.SetStateAction<{
      labelId: string;
      labelName: string;
      labelType: string;
      mutltipleChoice: string[];
    }>
  >;
  addFreshQuestionnaire: {
    labelId: string;
    labelName: string;
    labelType: string;
    mutltipleChoice: string[];
  };
}

// INTERNSHIP OBJECT
interface InternshipObjectInterface {
  allowance: boolean;
  allowanceAmount: string;
  applicationHired: number;
  applicationRate: number;
  applicationStatus: string;
  companyShortDetails: {
    userEmail: string;
    userId: string;
    userName: string;
    userPhotUrl: string;
  };
  isHiredImmediately: boolean;
  isResponsiveHr: boolean;
  isUrgent: boolean;
  jobCategory: string;
  jobDescription: string;
  jobEnvironment: boolean;
  jobQualifications: string[];
  jobResponsibilities: string[];
  jobTitle: string;
}
