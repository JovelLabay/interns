import React, { useState } from 'react';
import Image from 'next/image';
import internsLogo from '../../../../public/logo/interns_logo.png';

import { AiOutlineSearch } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Popover } from '@headlessui/react';
import { data } from 'Data';
import classNames from 'classnames';
import AddStudents from '../../modals/addStudents';

function StudentListContainer() {
  const [isOpen, setIsOpen] = useState({
    addStudents: false,
    deleteAll: false,
    addStudentsTitle: '',
  });

  function addStudentToggle(name: string) {
    setIsOpen((prev) => {
      return {
        ...prev,
        addStudents: !prev.addStudents,
        addStudentsTitle: name,
      };
    });
  }

  return (
    <div className="flex gap-3 overflow-x-auto">
      {data.admin.colleges.map((college, index) => {
        return (
          <div key={index} className="flex flex-col gap-2">
            <section className="bg-white gap-2 py-[10px] px-2 rounded flex justify-between items-center">
              <div className="flex gap-2">
                <Image
                  src={internsLogo}
                  width={24}
                  height={20}
                  style={{ borderRadius: '100%' }}
                />
                <p className="text-placeholderColor text-sm w-[190px] truncate">
                  {college.name}
                </p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <AiOutlineSearch color="#585858" size={20} />
                <Popover className="relative pt-2">
                  <Popover.Button>
                    <BiDotsVerticalRounded color="#585858" size={20} />
                  </Popover.Button>

                  <Popover.Panel
                    className={
                      index === 6
                        ? 'absolute z-10 w-[150px] right-0'
                        : 'absolute z-10 w-[150px] left-0'
                    }
                  >
                    <div className="flex flex-col gap-4 shadow-md bg-white rounded mt-2 p-3">
                      <button onClick={() => addStudentToggle(college.name)}>
                        Add Students
                      </button>
                      <button>Delete All</button>
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
            </section>
            <div className="bg-white rounded h-[70vh] overflow-auto p-2"></div>
          </div>
        );
      })}

      {/* MODAL FOR ADDING STUDENT */}
      <AddStudents
        isOpen={isOpen.addStudents}
        addStudentToggle={addStudentToggle}
        addStudentsTitle={isOpen.addStudentsTitle}
      />
    </div>
  );
}

export default StudentListContainer;
