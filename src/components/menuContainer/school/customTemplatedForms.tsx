// REACT
import React, { useEffect } from 'react';

// WYSIWYG
import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';

// FIREBASE FUNCIONS
import { CollegeFormTemplated } from '@/src/functions/firebaseDatabase2nd';

// COMPONENTS
import { errorNotify, successfulNotify } from '../../common/toast';
import classNames from 'classnames';

function CustomTemplatedForms({
  setIsOpenDocument,
  isOpenDocument,
  lala,
  setlala,
  setIsOpen,
  activeBreadCrumbs,
  setActiveBreadcrumb,
  fileName,
  setFileName,
  formId,
}: {
  setIsOpenDocument: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenDocument: boolean;
  lala: any;
  setlala: React.Dispatch<React.SetStateAction<any>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeBreadCrumbs: {
    collegeName: string;
    collegeId: string;
    action: string;
    collegeColor: string;
  };
  setActiveBreadcrumb: React.Dispatch<
    React.SetStateAction<{
      collegeName: string;
      collegeId: string;
      action: string;
      collegeColor: string;
    }>
  >;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  formId: string;
}) {
  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: ['', 'center', 'right', 'justify'] }],
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setlala(quill.root.innerHTML);
      });

      quill.clipboard.dangerouslyPasteHTML(lala || '');
    }
  }, [quill]);

  const addTemplateForm = new CollegeFormTemplated(activeBreadCrumbs.collegeId);

  return (
    <div>
      <div style={{ width: '100%', height: '73vh' }}>
        <div ref={quillRef} />
      </div>
      <div className="ju mt-16 flex items-center justify-between gap-5">
        <div className="flex gap-3">
          <button
            className="w-[100px] rounded-md border-2 border-primaryYellow py-1"
            onClick={() => {
              setIsOpen(false);
              setlala('');
            }}
          >
            Cancel
          </button>
          <button
            className="w-[100px] rounded-md bg-blue-500 py-1 text-white"
            onClick={() => setIsOpenDocument(!isOpenDocument)}
          >
            View
          </button>
          <button
            className={classNames(
              'w-[100px] rounded-md bg-primaryYellow py-1 text-white'
            )}
            onClick={() => {
              activeBreadCrumbs.action === 'EDIT'
                ? updateCustomTemplated()
                : addToCustomTemplated();
            }}
          >
            {activeBreadCrumbs.action === 'EDIT' ? 'Update' : 'Save'}
          </button>
        </div>
        <input
          type="text"
          placeholder="File Name"
          className="inputBox"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
    </div>
  );

  function addToCustomTemplated() {
    if (!fileName) return errorNotify('Please enter a file name');

    addTemplateForm
      .addNewCollegeFormTemplate(lala, new Date().toString(), fileName)
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

  function updateCustomTemplated() {
    if (!fileName) return errorNotify('Please enter a file name');

    addTemplateForm
      .editCollegeFormTemplate(lala, fileName, formId)
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

export default CustomTemplatedForms;
