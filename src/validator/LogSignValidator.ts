import * as yup from 'yup';

const LogSignValidator = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
});

const CompanyRegistration = yup.object({
  companyName: yup.string().required(),
  companyDescription: yup.string().min(100).max(300).required(),
  companyMission: yup.string().required(),
  companyVison: yup.string().required(),
});

// VALIDATORS FOR THE NEW NUMBERS TO BE ADDED AS THE USERS FOR THE SCOOL AUTHENTICATION
const SchoolNumberUsers = yup.object({
  number: yup.string().required().min(13).max(13),
});

// VALIDATORS FOR THE NEW STUDENTS TO BE ADDED AS THE USERS FOR THE SCOOL AUTHENTICATION
const AddStudent = yup.object({
  firstName: yup.string().required().min(3).max(10),
  lastName: yup.string().required().min(3).max(10),
  middleName: yup.string().required().min(3).max(10),
});

// VALIDATORS FOR THE NEW COLLEGE OR DEPARTMENT
const AddCollegeValidator = yup.object({
  nameOfCollege: yup.string().required('Give the name of the college'),
  shortNameOfCollege: yup
    .string()
    .required('Give the short name of the college'),
  nameOfDean: yup.string().required('Give the name of the dean'),
  professionOfDean: yup.string(),
  collegeType: yup.string(),
  collegePasscode: yup
    .string()
    .required('Give the passcode of the college')
    .min(6)
    .max(6),
});

export {
  LogSignValidator,
  CompanyRegistration,
  SchoolNumberUsers,
  AddStudent,
  AddCollegeValidator,
};
