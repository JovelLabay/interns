interface Welcome {
  starterWelcome: boolean;
}

interface Dynamic {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
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
