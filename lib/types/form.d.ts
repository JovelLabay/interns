interface FormLogin {
  email: string;
  password: string;
}

interface FormSchoolUserAdmin {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profileImage: string;
  levelOfUser: string;
  isActive: boolean;
}

interface ExportedFormSchoolUserAdmin extends FormSchoolUserAdmin {
  id: number;
  createdAt: any;
  updatedAt: any;
  deletedAt: any;
}

interface ReturnAdminUserPayload {
  id: number;
  admin_user_image: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  password: string;
  isActive: boolean;
  level_of_user: string;
}

interface FormCollegeProgram {
  collegeLogo: string;
  departmentName: string;
  departmentDescription: string;
  coordinator: string;
  programName: string;
  abbreaviatedProgramName: string;
}

interface ExportedFormCollegeProgram extends FormCollegeProgram {
  id: number;
  createdAt: any;
  updatedAt: any;
  deletedAt: any;
}

interface ReturnCollegeProgram {
  id: number;
  college_department_image: string;
  college_department_name: string;
  college_department_description: string;
  college_coordinator: string;
  complete_program_name: string;
  abbreviated_program_name: string;
}
