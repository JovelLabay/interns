import { errorNotify } from '@component/interface/toast/toast';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { AiOutlineFileWord } from 'react-icons/ai';

function submittedDocument({
  modal,
  toggleSubmittedDoc,
  objectEditStudent,
}: {
  modal: boolean;
  toggleSubmittedDoc: () => void;
  objectEditStudent: string;
}) {
  const [documentList, setDocumentList] = useState<Submitted[]>([]);
  const [subModal, setSubModal] = useState(false);
  const [docUrl, setDocUrl] = useState('');

  useEffect(() => {
    getDocuments();
  }, [objectEditStudent]);

  const docxFile = docUrl;

  return (
    <>
      <Transition appear show={modal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10 hidden xl:block"
          onClose={() => {
            toggleSubmittedDoc();

            setDocumentList([]);
          }}
        >
          <Transition.Child
            as={React.Fragment}
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
            <div className="flex min-h-full items-center justify-end p-4">
              <Transition.Child
                as={React.Fragment}
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Dialog.Panel className="w-[35vw] rounded-md bg-white p-3">
                  <div className="flex flex-row items-center justify-end text-secondaryWhite">
                    <button
                      onClick={() => {
                        toggleSubmittedDoc();

                        setDocumentList([]);
                      }}
                      className="w-[100px] rounded border-2 border-primaryYellow py-1"
                    >
                      Close
                    </button>
                  </div>

                  <div className="h-[85vh] overflow-auto py-2 pr-2 text-secondaryWhite">
                    <h3 className={'text-center font-medium'}>
                      Submitted Documents
                    </h3>
                    <div className="my-5 flex flex-col justify-start gap-2 overflow-auto">
                      {documentList.map((doc, index) => (
                        <button
                          key={index}
                          className={classNames(
                            'flex items-center justify-start gap-3 rounded bg-customBorder p-3',
                            doc.submitted_document === null &&
                              'cursor-not-allowed opacity-50'
                          )}
                          onClick={() => {
                            setSubModal(true);
                            setDocUrl(doc.submitted_document);
                          }}
                          disabled={
                            doc.submitted_document === null ? true : false
                          }
                          title={
                            doc.submitted_document === null
                              ? 'No Submissions'
                              : doc.submitted_document_name
                          }
                        >
                          <AiOutlineFileWord size={30} />
                          <span className="w-full text-ellipsis">
                            {doc.submitted_document_name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* SUB MODAL */}
      <Transition appear show={subModal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10 hidden xl:block"
          onClose={() => {
            setSubModal(false);
            setDocUrl('');
          }}
        >
          <Transition.Child
            as={React.Fragment}
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
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[55vw] rounded-md bg-white p-3">
                  <div className="flex flex-row items-center justify-end text-secondaryWhite">
                    <button
                      onClick={() => {
                        setSubModal(false);
                        setDocUrl('');
                      }}
                      className="w-[100px] rounded border-2 border-primaryYellow py-1"
                    >
                      Close
                    </button>
                  </div>

                  <div className="h-[85vh] overflow-auto py-2 pr-2 text-secondaryWhite">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                        docxFile
                      )}`}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );

  function getDocuments() {
    if (objectEditStudent) {
      const parseStudentData = JSON.parse(objectEditStudent);

      axios
        .get(
          `/api/data/studentDocument?collegeId=${parseStudentData?.Student_User_Profile?.College_Department?.id}&studentUserProfileId=${parseStudentData?.Student_User_Profile?.id}`
        )
        .then((res) => {
          setDocumentList(res.data.submittedDocuments);
        })
        .catch((err) => {
          errorNotify('Something went wrong. Please try again later.');
          console.error(err);
        });
    }
  }
}

export default submittedDocument;
