interface FormLogin {
  email: string;
  password: string;
}

// USER ADMIN
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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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
  createdAt: Date;
}

// COLLEGE PROGRAM
interface FormCollegeProgram {
  collegeLogo: string;
  departmentName: string;
  departmentDescription: string;
  coordinator: string;
  programName: string;
  abbreaviatedProgramName: string;
  practicum_coordinator_email: string;
}

interface ExportedFormCollegeProgram extends FormCollegeProgram {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface ReturnCollegeProgram {
  id: number;
  college_department_image: string;
  college_department_name: string;
  college_department_description: string;
  college_coordinator: string;
  complete_program_name: string;
  abbreviated_program_name: string;
  practicum_coordinator_email: string;
  createdAt: Date;
}

// SCHOOL YEAR
interface FormSchoolYear {
  start_date: string;
  end_date: string;
  school_year_name: string;
  school_year_description: string;
  school_year_code: string;
  is_active: boolean;
}

interface ReturnFormSchoolYear extends FormSchoolYear {
  id: number;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// SCHOOL SEMESTER
interface FormSchoolSemestre {
  school_semester_name: string;
  school_semester_description: string;
  school_semester_code: string;
  is_active: boolean;
  school_year_id: number;
}

interface ReturnFormSchoolSemestre extends FormSchoolSemestre {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface SelectSchoolYearSemestre extends ReturnFormSchoolYear {
  School_Semester: ReturnFormSchoolSemestre[];
}

// CREATE STUDENT
interface FormCreateStudent {
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

interface FormEditStudent extends FormCreateStudent {
  accountStatus: boolean;
  eligibility: boolean;
  profileImage: string;
  selfIntroduction: string;
  address: string;
  birthDate: string;
  sex: string;
  studentStatus: string;
  phoneNumber: string;
}

interface FormCollegeDepartmentRequirementDocument {
  nameOfDocument: string;
  bucketUrlOfDocument: string;
}

// EMAIL TEMPLATE
interface FormEmailTemplate {
  email_template_name: string;
  email_template_subject: string;
  email_template_body: string;
}

interface FormEmailTemplateResponse {
  email_template_name: string;
  email_template_subject: string;
  email_template_body: string;
  id: number;
}

// RECOMMENDATION LETTER
interface RecommendationLetter {
  companyName: string;
  directSupervisor: string;
  companyAddress: string;
}
