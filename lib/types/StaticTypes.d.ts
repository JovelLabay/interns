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

  // STUDENT ONLY
  studentData?: string;
  setStudentData?: React.Dispatch<React.SetStateAction<string>>;
}
