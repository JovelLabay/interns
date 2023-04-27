import * as yup from 'yup';

// EMAIL PASS
const LogSignValidator = yup.object({
  email: yup
    .string()
    .email('Enter proper email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 chars')
    .required('Password is required'),
});

const CreateSchoolAdminValidator = yup.object({
  email: yup
    .string()
    .email('Enter proper email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 chars'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{6,}$/,
  //   'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special char'
  // ),
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string(),
  lastName: yup.string().required('Last Name is required'),
  profileImage: yup.string(),
  levelOfUser: yup.string().required('Please select a level of user'),
  isActive: yup.boolean(),
});

const CreateCollegeValidator = yup.object({
  collegeLogo: yup.string(),
  departmentName: yup.string().required('Department Name is required'),
  departmentDescription: yup.string(),
  coordinator: yup.string().required('Please select a coordinator'),
  programName: yup.string().required('Program Name is required'),
  abbreaviatedProgramName: yup
    .string()
    .required('Abbreaviated Program Name is required'),
});

const CreateSchoolYear = yup.object({
  start_date: yup.string().required('School year start-date is required'),
  end_date: yup.string().required('School year end-date is required'),
  school_year_name: yup.string().required('School code is required'),
  school_year_description: yup.string(),
  school_year_code: yup
    .string()
    .required('School year passcode is required')
    .min(6, 'Must be 6 characters long'),
  is_active: yup.boolean(),
  id: yup.number(),
});

const CreateSchoolSemestre = yup.object({
  school_semester_name: yup.string().required('Semestre code is required'),
  school_semester_description: yup.string(),
  school_semester_code: yup
    .string()
    .required('Semestre password is required')
    .min(6, 'Must be 6 characters long'),
});

const CreateStudent = yup.object({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string(),
  lastName: yup.string().required('Last Name is required'),
  emailAddress: yup
    .string()
    .email('Enter proper email address')
    .required('Email is required'),
});

const EditStudentForm = yup.object({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string(),
  lastName: yup.string().required('Last Name is required'),
  emailAddress: yup
    .string()
    .email('Enter proper email address')
    .required('Email is required'),
  accountStatus: yup.boolean(),
  eligibility: yup.boolean(),
  profileImage: yup.string(),
  selfIntroduction: yup.string(),
  address: yup.string(),
  birthDate: yup.string(),
  sex: yup.string(),
  studentStatus: yup.string(),
  phoneNumber: yup
    .string()
    .max(11, 'Must be 11-digit')
    .min(10, 'Must be a 11-digit number'),
});

const CreateCollegeDepartmentRequirementDocumentForm = yup.object({
  nameOfDocument: yup.string().required('Name of the Document is required'),
  bucketUrlOfDocument: yup.string(),
});

export {
  LogSignValidator,

  // SCHOOL DASHBOARD
  CreateSchoolAdminValidator,
  CreateCollegeValidator,
  CreateSchoolYear,
  CreateSchoolSemestre,
  CreateStudent,
  EditStudentForm,
  CreateCollegeDepartmentRequirementDocumentForm,
};
