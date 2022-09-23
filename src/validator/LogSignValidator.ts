import * as yup from 'yup';

const LogSignValidator = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(12).required(),
  })
  .required();

const CompanyRegistration = yup.object({
  companyName: yup.string().required(),
  companyDescription: yup.string().min(100).max(300).required(),
  companyMission: yup.string().required(),
  companyVison: yup.string().required(),
});

// VALIDATORS FOR THE NEW NUMBERS TO BE ADDED AS THE USERS FOR THE SCOOL AUTHENTICATION
const SchoolNumberUsers = yup.object({
  number: yup.string().required().min(12).max(12),
});

// VALIDATORS FOR THE NEW STUDENTS TO BE ADDED AS THE USERS FOR THE SCOOL AUTHENTICATION
const AddStudent = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  middleName: yup.string().required(),
});

export { LogSignValidator, CompanyRegistration, SchoolNumberUsers, AddStudent };
