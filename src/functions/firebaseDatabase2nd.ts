// FIREBASE
import { push, ref, remove, set } from 'firebase/database';

// FIREBASE CONFIG
import { database } from '../firebase/firebaseConfig';

// QUESTIONNAIRE CLASS
class CrudQuestionnnaire {
  static db = database;
  public addNewQuestionnaire: () => Promise<string>;
  public editQuestionnaire: (id: string) => Promise<string>;
  public deleteQuestionnaire: (id: string) => Promise<string>;

  constructor(
    companyId: string,
    labelId: string,
    labelName: string,
    labelType: string,
    mutltipleChoice: string[]
  ) {
    this.addNewQuestionnaire = async () => {
      try {
        const db = CrudQuestionnnaire.db;
        const reference = ref(
          db,
          `companies/${companyId}/companyQuestionnaires`
        );
        await push(reference, {
          labelId: labelId,
          labelName: labelName,
          labelType: labelType,
          mutltipleChoice: [...mutltipleChoice],
        });
        return 'Successfull';
      } catch (error) {
        return 'error';
      }
    };

    this.editQuestionnaire = async (id: string) => {
      try {
        await set(
          ref(
            CrudQuestionnnaire.db,
            `companies/${companyId}/companyQuestionnaires/${id}`
          ),
          {
            labelId: labelId,
            labelName: labelName,
            labelType: labelType,
            mutltipleChoice: [...mutltipleChoice],
          }
        );
        return 'User Number has been updated successfully';
      } catch (error) {
        return 'Errro';
      }
    };

    this.deleteQuestionnaire = async (id: string) => {
      try {
        const postListRef = ref(
          CrudQuestionnnaire.db,
          `companies/${companyId}/companyQuestionnaires/${id}`
        );
        await remove(postListRef);
        return 'User number has been added successfully';
      } catch (error) {
        return 'error';
      }
    };
  }
}

// COLLEGE FORM TEMPLATE CLASS
class CollegeFormTemplated {
  static db = database;
  public addNewCollegeFormTemplate: (
    objectFile: string,
    dateAdded: string,
    fileName: string
  ) => Promise<string>;
  public editCollegeFormTemplate: (
    objectFile: string,
    fileName: string,
    formId: string
  ) => Promise<string>;
  public deleteNewCollegeFormTemplate: (formId: string) => Promise<string>;

  constructor(id: string) {
    this.addNewCollegeFormTemplate = async (
      objectFile: string,
      dateAdded: string,
      fileName: string
    ) => {
      try {
        const db = CrudQuestionnnaire.db;
        const reference = ref(db, `school/colleges/${id}/formTemplates`);
        await push(reference, {
          objectFile,
          dateAdded,
          fileName,
        });
        return 'Successfull';
      } catch (error) {
        return 'error';
      }
    };

    this.deleteNewCollegeFormTemplate = async (formId: string) => {
      try {
        const db = CrudQuestionnnaire.db;
        const reference = ref(
          db,
          `school/colleges/${id}/formTemplates/${formId}`
        );
        await remove(reference);
        return 'Successfuly Deleted';
      } catch (error) {
        return 'error';
      }
    };

    this.editCollegeFormTemplate = async (
      objectFile: string,
      fileName: string,
      formId: string
    ) => {
      try {
        const db = CrudQuestionnnaire.db;
        await set(ref(db, `school/colleges/${id}/formTemplates/${formId}`), {
          objectFile,
          fileName,
        });
        return 'Successfuly Updated';
      } catch (error) {
        return 'error';
      }
    };
  }
}

// STUDENT REGISTRATION FUNCTION
const studentRegistration = async (
  data: StudentRegistration,
  uniqueId: string | null
) => {
  const {
    firstName,
    lastName,
    middleName,
    emailAddress,
    collegeName,
    selfDescription,
    birthDate,
    city_municipality,
    province_state,
    gender,
    studentImageProfile,
    studentImageCover,
    studentDocuments,
  } = data;

  const idReference = JSON.parse(uniqueId || '').id;
  try {
    const db = database;
    await set(ref(db, `students/${idReference}`), {
      studentDetails: {
        firstName,
        lastName,
        middleName,
        emailAddress,
        collegeName,
        gender: gender || 'NOT SET',
      },
      selfDescription: selfDescription || 'NOT SET',
      studentImageProfile: studentImageProfile || 'NOT SET',
      studentImageCover: studentImageCover || 'NOT SET',
      birthDate: {
        day: birthDate?.day || 'NOT SET',
        month: birthDate?.month || 'NOT SET',
        year: birthDate?.year || 'NOT SET',
      },
      address: {
        city_municipality: city_municipality || 'NOT SET',
        province_state: province_state || 'NOT SET',
      },
      studentDocuments: {
        birthCertificate: studentDocuments?.birthCertificate || 'NOT SET',
        schoolId: studentDocuments?.schoolId || 'NOT SET',
        curreculumVitae: studentDocuments?.curreculumVitae || 'NOT SET',
        applicationLetter: studentDocuments?.applicationLetter || 'NOT SET',
      },
    });
    return {
      message: 'Student registration has been saved successfully.',
      responseData: idReference,
    };
  } catch (error) {
    return {
      error: error,
      message: 'There was an error registering your company',
    };
  }
};

export { CrudQuestionnnaire, CollegeFormTemplated, studentRegistration };
