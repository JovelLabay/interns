// REACT
import React, { useState } from 'react';

// DATABASE
import {
  addNewCompanyType,
  deleteCompanyType,
  editCompanyType as editCompanyTypeAction,
} from '@/src/functions/firebaseDatabase';

// REACT ICONS
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

// COMPONENTS
import { notify } from '../common/toast';

function AddCompanyTypeForm({ companyTypes }: { companyTypes: object }) {
  const [companyTypeList, setCompanyTypesList] = useState({
    companyInputState: false,
    editCompanyInputState: '',
  });

  const values: [string, { type: string }][] =
    companyTypes === null ? [] : Object.entries(companyTypes);

  const [companyType, setCompanyType] = useState('');
  const [editCompanyType, setEditCompanyType] = useState('');

  return (
    <div>
      <section>
        {companyTypeList.companyInputState ? (
          <div className="flex justify-between items-center gap-2">
            <input
              type="text"
              name="nameOfTheLocation"
              className="inputBox w-full"
              placeholder="Type of Company"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            />
            <button
              className="bg-green-500 rounded-md h-[40px] flex flex-row items-center justify-center px-2 text-white"
              onClick={() => addCompanyType(companyType)}
            >
              Add
            </button>
            <button
              className="bg-red-500 rounded-md h-[40px] flex flex-row items-center justify-center px-2 text-white"
              onClick={openHandler}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-primaryYellow rounded-md h-[40px] px-3 text-balck"
            onClick={openHandler}
          >
            Add New Type of Company
          </button>
        )}
      </section>
      <div className="h-[300px] overflow-auto mt-5">
        {values.map((value, index) => {
          return (
            <div
              key={index}
              className="flex justify-between rounded bg-yellowBg py-5 px-3 text-left mb-3"
            >
              {companyTypeList.editCompanyInputState === value[0] ? (
                <input
                  type="text"
                  placeholder="Edit Location"
                  className="inputBox w-full mr-2"
                  value={editCompanyType}
                  onChange={(e) => setEditCompanyType(e.target.value)}
                />
              ) : (
                <p>{value[1].type}</p>
              )}

              <div className="flex gap-2">
                {companyTypeList.editCompanyInputState === value[0] ? (
                  <>
                    <button
                      className="bg-red-500 p-2 rounded"
                      onClick={() => editHandler('')}
                    >
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
                    <button
                      className="bg-green-500 p-2 rounded"
                      onClick={() => {
                        editCurrentCompanyType(editCompanyType, value[0]);
                      }}
                    >
                      <AiOutlineCheckCircle size={20} color="#fff" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-orange-500 p-2 rounded">
                      <AiOutlineEdit
                        size={20}
                        color="#fff"
                        onClick={() => {
                          editHandler(value[0]);
                          setEditCompanyType(value[1].type);
                        }}
                      />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded"
                      onClick={() => {
                        deleteCurrentCompanyType(value[0]);
                      }}
                    >
                      <AiOutlineDelete size={20} color="#fff" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // OPEN HANDLER
  function openHandler() {
    setCompanyTypesList({
      ...companyTypeList,
      companyInputState: !companyTypeList.companyInputState,
    });
  }

  // EDIT HANDLER
  function editHandler(id: string) {
    setCompanyTypesList({
      ...companyTypeList,
      editCompanyInputState: id,
    });
  }

  // ADD COMPANY TYPE
  function addCompanyType(type: string) {
    const currentCompanyType = values.find(
      (value) => value[1].type.toLocaleLowerCase() === type.toLocaleLowerCase()
    );

    if (currentCompanyType) {
      notify('This company type already exists');
    } else {
      addNewCompanyType(type)
        .then((res) => {
          notify(res || 'Company Type Added Successfully');
          setCompanyType('');
        })
        .catch((err) => notify(err.message || 'Something went wrong'));
    }
  }

  // EDIT COMPANY TYPE
  function editCurrentCompanyType(type: string, id: string) {
    const currentCompanyType = values.find(
      (value) => value[1].type.toLocaleLowerCase() === type.toLocaleLowerCase()
    );

    if (currentCompanyType) {
      notify('This company type already exists');
    } else {
      editCompanyTypeAction(type, id)
        .then((res) => {
          notify(res || 'Company Type Edited Successfully');
          editHandler('');
        })
        .catch((err) => notify(err.message || 'Something went wrong'));
    }
  }

  // DELETE COMPANY TYPE
  function deleteCurrentCompanyType(id: string) {
    deleteCompanyType(id)
      .then((res) => notify(res || 'Company Type Deleted Successfully'))
      .catch((err) => notify(err.message || 'Something went wrong'));
  }
}

export default AddCompanyTypeForm;
