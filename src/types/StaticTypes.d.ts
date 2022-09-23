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
}
