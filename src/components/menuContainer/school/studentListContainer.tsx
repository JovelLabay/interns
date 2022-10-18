// REACT
import React, { useEffect, useState } from 'react';

// ICONS
import { BiDotsVerticalRounded } from 'react-icons/bi';

// COMPONENTS OR LAYOUTS
import AddStudents from '@/src/components/modals/addStudents';
import StudentListingContainer from '@/src/components/blocks/studentListingContainer';

// FIREBASE
import { collection, onSnapshot } from 'firebase/firestore';
import { database, store } from '@/src/firebase/firebaseConfig';

// FIREBASE
import { onValue, ref } from 'firebase/database';

// UI
import { Popover } from '@headlessui/react';

function StudentListContainer() {
  const [isOpen, setIsOpen] = useState({
    addStudents: false,
    addStudentsTitle: '',
    isSearch: '',
    isEdit: '',
    searchInput: '',
    studentNumber: 0,
  });

  const [listOfColleges, setListOfColleges] = useState({});

  const listingOfColleges: [string, CollegeListInterface][] =
    Object.entries(listOfColleges);

  useEffect(() => {
    // LIST OF COLLEGES
    const db = database;
    const collegeReference = ref(db, 'school/colleges');
    onValue(collegeReference, (snapshot) => {
      const data = snapshot.val() === null ? {} : snapshot.val();
      setListOfColleges(data);
    });
  }, []);

  return (
    <div className="flex gap-3 overflow-x-auto">
      {listingOfColleges.map((college, index) => {
        return (
          <div key={index} className="flex flex-col gap-2 w-[350px]">
            <section className="bg-white gap-2 py-[10px] px-2 rounded flex justify-between items-center">
              <div className="flex gap-2">
                {isOpen.isSearch === college[1].collegeName ? (
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="Search"
                      className="w-[280px] py-2 px-1 rounded outline-none bg-mainBgWhite text-sm"
                      value={isOpen.searchInput}
                      onChange={(e) => {
                        setIsOpen((prev) => {
                          return {
                            ...prev,
                            searchInput: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      onClick={() => {
                        setIsOpen((prev) => {
                          return {
                            ...prev,
                            isSearch: '',
                          };
                        });
                      }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="rounded-full h-[30px] w-[30px] bg-primaryYellow" />
                    <Popover className="relative mt-2">
                      <Popover.Button>
                        <BiDotsVerticalRounded size={25} />
                      </Popover.Button>

                      <Popover.Panel className="absolute z-10 w-[200px] ">
                        <div className="grid grid-cols-1 gap-3 bg-white p-4 rounded shadow-lg text-left">
                          <button
                            onClick={() => {
                              searchHandler(college[1].collegeName);
                            }}
                          >
                            Search
                          </button>
                          <button
                            onClick={() =>
                              addStudentToggle(college[1].collegeName)
                            }
                          >
                            Add Students
                          </button>
                          <button>Disolve College</button>
                          <button>Edit College</button>
                          <button>print</button>
                          <button>Information</button>
                        </div>

                        <img src="/solutions.jpg" alt="" />
                      </Popover.Panel>
                    </Popover>

                    <p className="font-medium text-secondaryWhite">
                      {college[1].collegeName}
                    </p>
                  </div>
                )}
              </div>
            </section>
            <div className="bg-white rounded h-[70vh] overflow-auto p-2">
              <StudentNames
                name={college[1].collegeName}
                searchInput={isOpen.searchInput}
                isSearch={isOpen.isSearch}
              />
            </div>
          </div>
        );
      })}

      {/* ADD STUDENT MODAL */}
      <AddStudents
        isOpen={isOpen.addStudents}
        addStudentToggle={addStudentToggle}
        addStudentsTitle={isOpen.addStudentsTitle}
      />
    </div>
  );

  // LIST OF ALL STUDENTS
  function StudentNames({
    name,
    searchInput,
    isSearch,
  }: {
    name: string;
    searchInput: string;
    isSearch: string;
  }) {
    const theCollegeName = name.toLowerCase().replace(/\s/g, '_');

    const [listOfStudents, setListOfStudents] = useState({});
    const listsOfStudents: [string, AddStudentWithCollegeInterface][] =
      Object.entries(listOfStudents);

    useEffect(() => {
      const abort = onSnapshot(
        collection(store, theCollegeName),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setListOfStudents(data);
        }
      );

      return () => {
        abort();
      };
    }, []);

    return (
      <div>
        <p className="text-center bg-primaryYellow rounded-full py-1">
          There are {listsOfStudents.length} in this college.
        </p>
        {isSearch === name
          ? listsOfStudents
              .filter((studentFullName) =>
                `${studentFullName[1].firstName} ${studentFullName[1].middleName} ${studentFullName[1].lastName}`
                  .toLocaleLowerCase()
                  .includes(searchInput.toLocaleLowerCase())
              )
              .map((student, index) => {
                const {
                  firstName,
                  lastName,
                  defaultEmail,
                  middleName,
                  college,
                  id,
                } = student[1];
                return (
                  <div key={index}>
                    <StudentListingContainer
                      firstName={firstName}
                      lastName={lastName}
                      middleName={middleName}
                      college={college}
                      id={id}
                      defaultEmail={defaultEmail}
                      isEdit={isOpen.isEdit}
                      setIsOpen={setIsOpen}
                    />
                  </div>
                );
              })
          : listsOfStudents.map((student, index) => {
              const {
                firstName,
                lastName,
                defaultEmail,
                middleName,
                college,
                id,
              } = student[1];
              return (
                <div key={index}>
                  <StudentListingContainer
                    firstName={firstName}
                    lastName={lastName}
                    middleName={middleName}
                    college={college}
                    id={id}
                    defaultEmail={defaultEmail}
                    isEdit={isOpen.isEdit}
                    setIsOpen={setIsOpen}
                  />
                </div>
              );
            })}
      </div>
    );
  }

  // SEARCH HANDLER
  function searchHandler(collegeName: string) {
    setIsOpen((prev) => {
      return {
        ...prev,
        isSearch: collegeName,
      };
    });
  }

  // ADD STUDENT HANDLER
  function addStudentToggle(name: string) {
    setIsOpen((prev) => {
      return {
        ...prev,
        addStudents: !prev.addStudents,
        addStudentsTitle: name,
      };
    });
  }
}

export default StudentListContainer;
