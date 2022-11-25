import { push, ref, remove, set } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';

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

export default CrudQuestionnnaire;
