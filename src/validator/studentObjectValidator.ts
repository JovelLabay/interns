import * as yup from 'yup';

const StudentObjectValidator = yup.object({
  studentDetails: yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    middleName: yup.string(),
    collegeName: yup.string(),
    emailAddress: yup.string(),
    gender: yup.string(),
  }),
  birthDate: yup.object({
    day: yup.string(),
    month: yup.string(),
    year: yup.string(),
  }),
  address: yup.object({
    city_municipality: yup.string(),
    province_state: yup.string(),
  }),
  selfDescription: yup.string(),
  studentImageProfile: yup.string(),
  studentImageCover: yup.string(),
  studentDocuments: yup.object({
    applicationLetter: yup.string(),
    birthCerficate: yup.string(),
    curriculumVitae: yup.string(),
    schoolId: yup.string(),
  }),
});

export { StudentObjectValidator };
