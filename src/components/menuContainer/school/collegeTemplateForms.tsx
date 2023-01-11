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
  const [formId, setFormId] = useState(''); // To be used

  const componentRef = useRef(null);
  const formTemplates =
    collegeTemplateForm.formTemplates !== undefined
      ? Object.entries(collegeTemplateForm.formTemplates)
      : [];

  const addTemplateForm = new CollegeFormTemplated(activeBreadCrumbs.collegeId);

  return (
    <div className="relative flex h-[69vh] flex-col gap-5 overflow-auto">
      {formTemplates.length > 0 ? (
        <>
          {formTemplates.map((formTemplate: any, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border-2 border-primaryYellow py-5 px-10"
              >
                <div className="w-[50%] truncate">
                  {formTemplate[1].fileName}
                </div>
                <div className="flex flex-row items-center justify-center gap-5">
                  <button
                    className="rounded bg-red-500 p-2"
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
                    className="rounded bg-green-500 p-2"
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
                    className="rounded bg-blue-500 p-2"
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
        <div className="flex h-full items-center justify-center">
          <p className="text-xl text-secondaryWhite">No Form Templates</p>
        </div>
      )}

      <button
        className="fixed bottom-8 right-[150px] rounded-md bg-primaryYellow p-2 shadow-lg"
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
                <Dialog.Panel className="h-[95vh] w-[800px] overflow-y-auto rounded-md bg-white p-5 shadow-xl transition-all">
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
                  className="h-[95vh] w-[1000px] overflow-auto rounded-md bg-white p-16"
                  ref={componentRef}
                >
                  <ReactToPrint
                    trigger={() => (
                      <button className="fixed top-5 right-5 rounded-full bg-primaryYellow p-2 shadow-lg">
                        <AiOutlinePrinter size={25} color={'#fff'} />
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                  <button
                    className="fixed top-20 right-5 rounded-full bg-primaryYellow p-2 shadow-lg"
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
                  <div className="flex flex-row items-center justify-start">
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
