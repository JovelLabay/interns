// REACT
import React, { Fragment, useContext, useId, useState } from 'react';

// STATE MANAGEMENT
import {
  CompanyUserDetailsContext,
  DynamicContext,
} from '@/src/contexts/context';

// UI
import { Dialog, Transition } from '@headlessui/react';

// OTHERS
import classNames from 'classnames';

// STATIC DATA
import { data } from 'Data';

// ICONS
import { BsTrash } from 'react-icons/bs';

// COMPONENTS
import QuestionnaireOptions from './questionnaireOptions';
import AddOnlyQuestionnaireForm from './addOnlyQuestionnaireForm';
import { notify } from '../common/toast';

// REACT ICONS
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from 'react-icons/ai';

// FUNCTIONS
import { CrudQuestionnnaire } from '@/src/functions/firebaseDatabase2nd';

function AddQuestionnaire({
  addRemoveModal,
  addModalToggle2,
}: {
  addRemoveModal: boolean;
  addModalToggle2: () => void;
}) {
  const context = useContext(DynamicContext);
  const context2 = useContext(CompanyUserDetailsContext);
  const uniqueID = useId();

  const [typeOfCustomField, setTypeOfCustomField] = useState(
    data.company.questionnaireType[0].name
  );

  const [addFreshQuestionnaire, setAddFreshQuestionnaire] = useState({
    labelId: '',
    labelName: '',
    labelType: '',
    mutltipleChoice: [] as string[],
  });
  const [isEditQuestionnaire, setIsEditQuestionnaire] = useState(0);
  const [isAddedNewQuestionnaire, setIsAddedNewQuestionnaire] = useState(false);
  const [editQuestionnaire, setEditQuestionnaire] = useState({
    labelId: '',
    labelName: '',
    labelType: '',
    mutltipleChoice: [] as string[],
  });

  const questionList = Object.entries(
    context2?.companyUserObject.companyQuestionnaire || []
  );

  return (
    <>
      <Transition appear show={addRemoveModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={addModalToggle2}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    'w-[900px] bg-white h-[700px] p-3 rounded-md',
                    { 'bg-mainBgBlack': context?.isDarkMode }
                  )}
                >
                  <div className="flex flex-row justify-between items-start mb-5">
                    <button
                      onClick={addModalToggle2}
                      className={classNames(
                        'border-2 rounded border-primaryYellow py-1 w-[100px]',
                        {
                          'text-teriaryWhite': context?.isDarkMode,
                        }
                      )}
                    >
                      Cancel
                    </button>
                  </div>
                  <nav className="flex flex-col gap-5">
                    <div className="flex flex-row gap-5 justify-between items-center">
                      <div className="flex gap-3">
                        <button className=" rounded bg-gray-500 py-2 mb-2 px-3 text-white">
                          <AiOutlineInfoCircle />
                        </button>
                        <button
                          className=" rounded bg-green-500 py-2 mb-2 px-3 text-white"
                          onClick={() => {
                            isAddedNewHandler();
                            setAddFreshQuestionnaire({
                              labelId: '',
                              labelName: '',
                              labelType: '',
                              mutltipleChoice: [] as string[],
                            });
                          }}
                        >
                          {!isAddedNewQuestionnaire
                            ? 'Add Questionnaire'
                            : 'Close Questionnaire/Clear'}
                        </button>
                      </div>
                      {isAddedNewQuestionnaire && (
                        <button
                          className=" rounded bg-primaryYellow py-2 mb-2 px-3 text-white"
                          onClick={() => crudHandler('ADD')}
                        >
                          Save
                        </button>
                      )}
                    </div>
                    <div>
                      {isAddedNewQuestionnaire && (
                        <AddOnlyQuestionnaireForm
                          typeOfCustomField={typeOfCustomField}
                          setTypeOfCustomField={setTypeOfCustomField}
                          freshQuestionnaires={{
                            setAddFreshQuestionnaire,
                            addFreshQuestionnaire,
                          }}
                        />
                      )}
                    </div>
                  </nav>
                  <div className="flex flex-col justify-center items-center">
                    <div
                      className={
                        !isAddedNewQuestionnaire
                          ? 'overflow-auto h-[550px]'
                          : 'overflow-auto h-[270px]'
                      }
                    >
                      {questionList.map((ques, index) => {
                        const question: FormListQuestionnaireInterface =
                          ques[1];
                        const id = index + 1;
                        return (
                          <div key={uniqueID + id} className="mb-3 pb-2">
                            <div className="flex justify-center items-start gap-3 mb-2">
                              <div className="flex flex-col items-start gap-2">
                                <label
                                  className={classNames(
                                    'text-secondaryWhite font-medium',
                                    {
                                      'text-teriaryWhite': context?.isDarkMode,
                                    }
                                  )}
                                >
                                  Question Title
                                </label>
                                <input
                                  className={classNames(
                                    'w-full py-2 px-3 rounded border-2 bg-mainBgWhite outline-none',
                                    {
                                      'bg-secondaryBgBlack text-white':
                                        context?.isDarkMode,
                                    },
                                    {
                                      'border-primaryYellow':
                                        isEditQuestionnaire === id,
                                    }
                                  )}
                                  placeholder="Question Title"
                                  disabled={
                                    isEditQuestionnaire !== id ? true : false
                                  }
                                  value={
                                    isEditQuestionnaire !== id
                                      ? question.labelName
                                      : editQuestionnaire.labelName
                                  }
                                  name="labelName"
                                  onChange={editState}
                                />
                              </div>
                              <div className="flex flex-col items-start gap-2">
                                <label
                                  className={classNames(
                                    'text-secondaryWhite font-medium',
                                    {
                                      'text-teriaryWhite': context?.isDarkMode,
                                    }
                                  )}
                                >
                                  Question Field Name
                                </label>
                                <input
                                  className={classNames(
                                    'w-full py-2 px-3 rounded border-2 bg-mainBgWhite outline-none',
                                    {
                                      'bg-secondaryBgBlack text-white':
                                        context?.isDarkMode,
                                    },
                                    {
                                      'border-primaryYellow':
                                        isEditQuestionnaire === id,
                                    }
                                  )}
                                  type="text"
                                  placeholder="Questionnaire Field Name"
                                  disabled={
                                    isEditQuestionnaire !== id ? true : false
                                  }
                                  value={
                                    isEditQuestionnaire !== id
                                      ? question.labelId
                                      : editQuestionnaire.labelId
                                  }
                                  name="labelId"
                                  onChange={editState}
                                />
                              </div>
                              <div className="flex flex-col items-start gap-2">
                                <label
                                  className={classNames(
                                    'text-secondaryWhite font-medium',
                                    {
                                      'text-teriaryWhite': context?.isDarkMode,
                                    }
                                  )}
                                >
                                  Question Type
                                </label>
                                <input
                                  className={classNames(
                                    'w-full py-2 px-3 rounded border-2 bg-customBorder outline-none',
                                    {
                                      'bg-backDropDark text-white':
                                        context?.isDarkMode,
                                    }
                                  )}
                                  type="text"
                                  placeholder="Questionnaire Type"
                                  disabled
                                  readOnly
                                  value={question.labelType}
                                />
                              </div>
                              <div className="flex flex-row items-start gap-2">
                                {isEditQuestionnaire !== id ? (
                                  <>
                                    <button
                                      className="buttonIcon-edit mt-9"
                                      onClick={() => editHandler(id, question)}
                                    >
                                      <AiOutlineEdit size={20} color="#fff" />
                                    </button>
                                    <button
                                      className="buttonIcon-delete mt-9"
                                      onClick={() =>
                                        crudHandler('DELETE', ques[0])
                                      }
                                    >
                                      <BsTrash size={20} color="#fff" />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="buttonIcon-edit mt-9"
                                      onClick={() =>
                                        crudHandler('UPDATE', ques[0])
                                      }
                                    >
                                      <AiOutlineCheckCircle
                                        size={20}
                                        color="#fff"
                                      />
                                    </button>
                                    <button
                                      className="buttonIcon-delete mt-9"
                                      onClick={() =>
                                        editHandler(0, {
                                          labelName: '',
                                          labelId: '',
                                          labelType: '',
                                          mutltipleChoice: [],
                                        })
                                      }
                                    >
                                      <AiOutlineCloseCircle
                                        size={20}
                                        color="#fff"
                                      />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-start">
                              {question.labelType === 'Multiple Choice' ||
                              question.labelType === 'True or False' ? (
                                <QuestionnaireOptions
                                  editedQuestionnaires={{
                                    editQuestionnaire,
                                    setEditQuestionnaire,
                                  }}
                                  isEditQuestionnaire={isEditQuestionnaire}
                                  id={id}
                                  question={question}
                                />
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );

  // INPUT STATE FOR EDIT
  function editState(e: React.ChangeEvent<HTMLInputElement>) {
    setEditQuestionnaire((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  // EDIT HANDLER
  function editHandler(id: number, question: FormListQuestionnaireInterface) {
    setIsEditQuestionnaire(id);
    setEditQuestionnaire((prev) => {
      return {
        ...prev,
        labelName: question.labelName,
        labelId: question.labelId,
        labelType: question.labelType,
        mutltipleChoice: question.mutltipleChoice,
      };
    });
  }

  // IS ADD NEW QUESTIONNAIRE
  function isAddedNewHandler() {
    setIsAddedNewQuestionnaire((prev) => !prev);
  }

  // CRUD HANDLER
  function crudHandler(crudName: string, id?: string) {
    if (crudName === 'ADD') {
      const lala = new CrudQuestionnnaire(
        localStorage.getItem('userId') || '',
        addFreshQuestionnaire.labelId,
        addFreshQuestionnaire.labelName,
        addFreshQuestionnaire.labelType,
        addFreshQuestionnaire.mutltipleChoice
      );
      lala.addNewQuestionnaire().then((res) => {
        isAddedNewHandler();
        notify(res || 'Ok');
      });
    } else if (crudName === 'UPDATE') {
      const lala = new CrudQuestionnnaire(
        localStorage.getItem('userId') || '',
        editQuestionnaire.labelId,
        editQuestionnaire.labelName,
        editQuestionnaire.labelType,
        editQuestionnaire.mutltipleChoice
      );

      lala.editQuestionnaire(id || '').then((res) => {
        editHandler(0, {
          labelName: '',
          labelId: '',
          labelType: '',
          mutltipleChoice: [],
        });
        notify(res || 'Ok');
      });
    } else {
      const lala = new CrudQuestionnnaire(
        localStorage.getItem('userId') || '',
        editQuestionnaire.labelId,
        editQuestionnaire.labelName,
        editQuestionnaire.labelType,
        editQuestionnaire.mutltipleChoice
      );

      lala.deleteQuestionnaire(id || '').then((res) => {
        notify(res || 'Ok');
      });
    }
  }
}

export default AddQuestionnaire;
