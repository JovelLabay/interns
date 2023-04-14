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
    .min(6, 'Password must be at least 6 chars')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{6,}$/,
      'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special char'
    ),
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

export { LogSignValidator, CreateSchoolAdminValidator, CreateCollegeValidator };
