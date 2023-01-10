// STUDENT REGISTRATION INTERFACE
interface StudentRegistration {
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  collegeName: string;
  selfDescription: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
  city_municipality: string;
  province_state: string;
  gender: string;
  studentImageProfile: string;
  studentImageCover: string;
  studentDocuments: {
    birthCertificate: string;
    schoolId: string;
    curreculumVitae: string;
    applicationLetter: string;
  };
}
