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
  };
  setActiveBreadcrumb: React.Dispatch<
    React.SetStateAction<{
      collegeName: string;
      collegeId: string;
      action: string;
    }>
  >;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
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
      <div className="mt-16 flex gap-5 ju justify-between items-center">
        <div className="flex gap-3">
          <button
            className="border-2 border-primaryYellow rounded-md py-1 w-[100px]"
            onClick={() => {
              setIsOpen(false);
              setlala('');
            }}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 rounded-md py-1 w-[100px] text-white"
            onClick={() => setIsOpenDocument(!isOpenDocument)}
          >
            View
          </button>
          <button
            className={classNames(
              'bg-primaryYellow rounded-md text-white py-1 w-[100px]',
              {
                'cursor-not-allowed': activeBreadCrumbs.action === 'EDIT',
              }
            )}
            onClick={() => {
              activeBreadCrumbs.action === 'EDIT'
                ? null
                : addToCustomTemplated();
            }}
            disabled={activeBreadCrumbs.action === 'EDIT'}
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
        });
      })
      .catch((err) => console.error(err));
  }
}

export default CustomTemplatedForms;
