// REACT
import React, { useState } from 'react';

// UI
import { Disclosure, Transition } from '@headlessui/react';

// ICONS
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

// OTHERS
import classNames from 'classnames';

// TOAST COMPONENT
import { notify } from '../common/toast';
import { ToastContainer } from 'react-toastify';

// FIREBASE
import {
  deleteStudents,
  updateStudents,
} from '@/src/functions/firebaseFirestore';

function StudentListingContainer(
  props: AddStudentWithCollegeInterfaceWithHanler
) {
  const {
    firstName,
    lastName,
    middleName,
    college,
    id,
    defaultEmail,
    isEdit,
    setIsOpen,
  } = props;

  const [editStudent, setEditStudent] = useState({
    firstName,
    middleName,
    lastName,
  });

  return (
    <div
      className={classNames(
        'py-2 hover:cursor-pointer hover:bg-mainBgWhite rounded-md my-2',
        {
          'bg-mainBgWhite': isEdit === id,
        }
      )}
    >
      <Disclosure>
        <Disclosure.Button
          className="flex flex-col w-full justify-between px-2"
          onClick={() => {
            editHandler(id);
          }}
        >
          <span>
            {isEdit !== id &&
              `Fullname: ${firstName} ${middleName} ${lastName}`}
          </span>
          <span>{isEdit !== id && `Email: ${defaultEmail}`}</span>
          <span>{isEdit !== id && `Student ID: ${id}`}</span>
        </Disclosure.Button>
        <Transition show={isEdit === id}>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="First Name..."
                className="border bg-customBorder rounded px-2 py-1 outline-none"
                value={editStudent.firstName}
                onChange={(e) => {
                  setEditStudent((prev) => {
                    return {
                      ...prev,
                      firstName: e.target.value,
                    };
                  });
                }}
              />
              <input
                type="text"
                placeholder="Middle Name..."
                className="border bg-customBorder rounded px-2 py-1 outline-none"
                value={editStudent.middleName}
                onChange={(e) => {
                  setEditStudent((prev) => {
                    return {
                      ...prev,
                      middleName: e.target.value,
                    };
                  });
                }}
              />
              <input
                type="text"
                placeholder="Last Name..."
                className="border bg-customBorder rounded px-2 py-1 outline-none"
                value={editStudent.lastName}
                onChange={(e) => {
                  setEditStudent((prev) => {
                    return {
                      ...prev,
                      lastName: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className="flex justify-around items-center gap-3 pt-4">
              <button className="bg-yellow-500 w-[50%] flex justify-center py-2 rounded">
                <AiOutlineEdit
                  size={20}
                  color="#fff"
                  onClick={() => {
                    updateHandler(
                      college,
                      id,
                      editStudent.firstName,
                      editStudent.middleName,
                      editStudent.lastName
                    );
                  }}
                />
              </button>
              <button
                className="bg-red-500 w-[50%] flex justify-center py-2 rounded"
                onClick={() => {
                  deleteHandler(college, id);
                }}
              >
                <AiOutlineDelete size={20} color="#fff" />
              </button>
              <button
                className="bg-blue-400 w-[50%] flex justify-center py-2 rounded"
                onClick={() => {
                  editHandler('');
                  setEditStudent({
                    firstName: '',
                    lastName: '',
                    middleName: '',
                  });
                }}
              >
                <AiOutlineCloseCircle size={20} color="#fff" />
              </button>
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>

      {/* NOTIFICATION CONTAINER */}
      <ToastContainer />
    </div>
  );

  // EDIT STUDENT
  function editHandler(studentId: string) {
    setIsOpen((prev) => {
      return {
        ...prev,
        isEdit: studentId,
      };
    });
  }

  // UPDATE STUDENT
  function updateHandler(
    collegeName: string,
    studentId: string,
    firstName: string,
    middleName: string,
    lastName: string
  ) {
    updateStudents(collegeName, studentId, firstName, middleName, lastName)
      .then(() => {
        notify('Student updated successfully');
      })
      .catch((err) => {
        notify(err.message);
      });
  }

  // DELETE STUDENT
  function deleteHandler(collegeName: string, studentId: string) {
    deleteStudents(collegeName, studentId)
      .then(() => {
        notify('Student deleted successfully');
      })
      .catch((err) => {
        notify(err.message);
      });
  }
}

export default StudentListingContainer;
