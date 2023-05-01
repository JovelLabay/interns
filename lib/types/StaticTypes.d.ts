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

interface RequiredDoc {
  bucketUrlOfDocument: string;
  college_department_id: number;
  documentName: string;
  id: number;
  createdAt: string;
}

interface Submitted {
  student_user_profile_id: number;
  submitted_document_name: string;
  submitted_document: string;
  id: number;
}
