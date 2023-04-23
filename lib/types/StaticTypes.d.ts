interface Welcome {
  starterWelcome: boolean;
}

interface Dynamic {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  userData: {
    image: string;
    name: string;
    levelOfUser: string;
    email: string;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      image: string;
      name: string;
      levelOfUser: string;
      email: string;
    }>
  >;
}

// LISTING OF COLLEGES
interface CollegeListInterface {
  collegePasscode: string;
  collegeDean: string;
  collegeName: string;
  collegeType: string;
  professionOfDean: string;
  shortCollegeName: string;
  collegeColor: string;
  courses: string[];
}
