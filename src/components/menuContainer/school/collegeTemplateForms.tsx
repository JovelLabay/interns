// REACT
import React, { Fragment, useState, useRef } from 'react';

// UI
import { Dialog, Transition } from '@headlessui/react';

// ICONS
import {
  AiOutlineCloudDownload,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlusCircle,
  AiOutlinePrinter,
} from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

import CustomTemplatedForms from './customTemplatedForms';
import { successfulNotify } from '../../common/toast';

// EXTERNAL
import ReactToPrint from 'react-to-print';
import JsPDF from 'jspdf';

// FIREBASE
import { CollegeFormTemplated } from '@/src/functions/firebaseDatabase2nd';

function CollegeTemplateForms({
  activeBreadCrumbs,
  collegeTemplateForm,
  setActiveBreadcrumb,
}: {
  activeBreadCrumbs: {
    collegeName: string;
    collegeId: string;
    action: string;
    collegeColor: string;
  };
  collegeTemplateForm: any;
  setActiveBreadcrumb: React.Dispatch<
    React.SetStateAction<{
      collegeName: string;
      collegeId: string;
      action: string;
      collegeColor: string;
    }>
  >;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDocument, setIsOpenDocument] = useState(false);
  const [lala, setlala] = useState<any>();
  const [fileName, setFileName] = useState('');
  const [formId, setFormId] = useState('');

  const componentRef = useRef(null);
  const formTemplates =
    collegeTemplateForm.formTemplates !== undefined
      ? Object.entries(collegeTemplateForm.formTemplates)
      : [];

  const addTemplateForm = new CollegeFormTemplated(activeBreadCrumbs.collegeId);

  return (
    <div className="h-[69vh] flex flex-col relative overflow-auto gap-5">
      {formTemplates.length > 0 ? (
        <>
          {formTemplates.map((formTemplate: any, index) => {
            return (
              <div
                key={index}
                className="border-2 border-primaryYellow flex justify-between items-center py-5 px-10 rounded-md"
              >
                <div className="w-[50%] truncate">
                  {formTemplate[1].fileName}
                </div>
                <div className="flex flex-row items-center justify-center gap-5">
                  <button
                    className="p-2 rounded bg-red-500"
                    onClick={() => {
                      setActiveBreadcrumb((prev) => {
                        return {
                          ...prev,
                          action: 'DELETE',
                        };
                      });
                      deleteCustomTemplated(formTemplate[0]);
                    }}
                  >
                    <BsTrash color="#fff" size={25} />
                  </button>
                  <button
                    className="p-2 rounded bg-green-500"
                    onClick={() => {
                      setFileName(formTemplate[1].fileName);
                      setlala(formTemplate[1].objectFile);
                      setIsOpen(!isOpen);
                      setActiveBreadcrumb((prev) => {
                        return {
                          ...prev,
                          action: 'EDIT',
                        };
                      });
                      setFormId(formTemplate[0]);
                    }}
                  >
                    <AiOutlineEdit color="#fff" size={25} />
                  </button>
                  <button
                    className="p-2 rounded bg-blue-500"
                    onClick={() => {
                      setlala(formTemplate[1].objectFile);
                      setIsOpenDocument(!isOpenDocument);
                    }}
                  >
                    <AiOutlineEye color="#fff" size={25} />
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-secondaryWhite">No Form Templates</p>
        </div>
      )}

      <button
        className="fixed bottom-8 right-[150px] bg-primaryYellow p-2 rounded-md shadow-lg"
        onClick={() => {
          setIsOpen(!isOpen);
          setFileName('');
          setActiveBreadcrumb((prev) => {
            return {
              ...prev,
              action: 'ADD',
            };
          });
        }}
      >
        <AiOutlinePlusCircle size={28} color="#fff" />
      </button>

      {/* OFF CANVAS */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(!isOpen);
            setlala('');
          }}
        >
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

          <div className="fixed inset-0 ">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[95vh] shadow-xl transition-all bg-white w-[800px] rounded-md overflow-y-auto p-5">
                  <CustomTemplatedForms
                    setIsOpenDocument={setIsOpenDocument}
                    isOpenDocument={isOpenDocument}
                    lala={lala}
                    setlala={setlala}
                    setIsOpen={setIsOpen}
                    activeBreadCrumbs={activeBreadCrumbs}
                    setActiveBreadcrumb={setActiveBreadcrumb}
                    fileName={fileName}
                    setFileName={setFileName}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* VIEW THE DOCUMENT */}
      <Transition appear show={isOpenDocument} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpenDocument(!isOpenDocument);
          }}
        >
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
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
                  className="w-[1000px] bg-white h-[95vh] p-16 rounded-md overflow-auto"
                  ref={componentRef}
                >
                  <ReactToPrint
                    trigger={() => (
                      <button className="fixed top-5 right-5 bg-primaryYellow p-2 rounded-full shadow-lg">
                        <AiOutlinePrinter size={25} color={'#fff'} />
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                  <button
                    className="fixed top-20 right-5 bg-primaryYellow p-2 rounded-full shadow-lg"
                    onClick={() => {
                      const report = new JsPDF('portrait', 'pt', 'a4');
                      report
                        .html(
                          document.getElementById(
                            'printableArea'
                          ) as HTMLElement
                        )
                        .then(() => {
                          report.save('report.pdf');
                        });
                    }}
                  >
                    <AiOutlineCloudDownload size={25} color={'#fff'} />
                  </button>
                  <div className="flex flex-row justify-start items-center">
                    <div
                      id="printableArea"
                      dangerouslySetInnerHTML={{
                        __html: lala,
                      }}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );

  function deleteCustomTemplated(formId: string) {
    addTemplateForm
      .deleteNewCollegeFormTemplate(formId)
      .then((res) => {
        successfulNotify(res);
        setActiveBreadcrumb({
          collegeId: '',
          collegeName: '',
          action: '',
          collegeColor: '',
        });
      })
      .catch((err) => console.error(err));
  }
}
export default CollegeTemplateForms;
