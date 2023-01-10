// REACT
import React, { useEffect, useState } from 'react';

// UI
import { Disclosure, Switch, Transition } from '@headlessui/react';

// ICONS
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlinePlusCircle,
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
import { collection, onSnapshot } from 'firebase/firestore';
import { store } from '@/src/firebase/firebaseConfig';
import { BeatLoader } from 'react-spinners';
import EditStudents from '../modals/EditStudents';

function StudentListingContainer({
  isOpen,
}: {
  isOpen: {
    addStudents: boolean;
    addStudentsTitle: string;
    isSearch: string;
    isEdit: string;
    searchInput: string;
    studentNumber: number;
    collegeId: string;
    index: number;
    collegeName: string;
    id: string;
    collegeCourses: string[];
    studentCourse: string;
    studentStatus: boolean;
  };
}) {
  const [listOfStudents, setListOfStudents] = useState<
    StudentListObjectInterface[]
  >([]);
  const [isEdit, setIsEdit] = useState({
    editStatus: false,
  });

  useEffect(() => {
    const abort = onSnapshot(
      collection(
        store,
        `${isOpen.collegeName.toLowerCase().replace(/\s/g, '_')}`
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            college: doc.data().college,
            collegeId: doc.data().collegeId,
            defaultEmail: doc.data().defaultEmail,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            middleName: doc.data().middleName,
            studentCourse: doc.data().studentCourse,
            studentStatus: doc.data().studentStatus,
          };
        });
        setListOfStudents(data);
      }
    );

    return () => {
      abort();
    };
  }, [isOpen.id]);

  return (
    <>
      {listOfStudents.length === 0 ? (
        <BeatLoader color="#000" size={20} className="my-20 text-center" />
      ) : (
        <table className="w-full text-left text-sm ">
          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Default Email
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Student Course
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Student Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listOfStudents.map((listStudent, index) => (
              <tr
                className="border-b bg-white duration-300 hover:cursor-pointer hover:bg-mainBgWhite"
                key={index}
              >
                <th className="whitespace-nowrap px-6 py-4 font-semibold">
                  {listStudent.defaultEmail}
                </th>
                <td className="px-6 py-4">{`${listStudent.firstName} ${listStudent.middleName} ${listStudent.lastName}`}</td>
                <td className="px-6 py-4">{listStudent.studentCourse}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={classNames(
                      'rounded-full py-2 px-3 text-secondaryWhite',
                      listStudent.studentStatus ? 'bg-green-300' : 'bg-red-300'
                    )}
                  >
                    {listStudent.studentStatus ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="flex justify-center gap-2 px-6 py-4">
                  <button
                    className="buttonIcon-edit"
                    onClick={() => {
                      setIsEdit((prev) => {
                        return {
                          ...prev,
                          editStatus: true,
                        };
                      });
                    }}
                  >
                    <AiOutlineEdit size={20} color="#fff" />
                  </button>
                  <button
                    className="buttonIcon-delete"
                    onClick={() => {
                      if (listStudent.studentStatus) {
                        notify('Cannot delete active student');
                      } else {
                        deleteThisStudent(listStudent.college, listStudent.id);
                      }
                    }}
                  >
                    <AiOutlineDelete size={20} color="#fff" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* EDIT */}
      <EditStudents isEdit={isEdit} setIsEdit={setIsEdit} />
    </>
  );

  function deleteThisStudent(collegeName: string, id: string) {
    deleteStudents(collegeName, id)
      .then((res) => {
        notify(res);
      })
      .catch((error) => {
        notify(error);
      });
  }
}

export default StudentListingContainer;
