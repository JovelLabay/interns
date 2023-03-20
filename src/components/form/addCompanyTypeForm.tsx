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
import { successfulNotify, errorNotify, warningNotify } from '../common/toast';
import classNames from 'classnames';

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
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              name="nameOfTheLocation"
              className="inputBox w-full"
              placeholder="Type of Company"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            />
            <button
              className={classNames(
                'flex h-[40px] flex-row items-center justify-center rounded-md bg-green-500 px-2 text-white',
                {
                  'cursor-not-allowed opacity-50': companyType === '',
                }
              )}
              disabled={companyType === ''}
              onClick={() => addCompanyType(companyType)}
            >
              Add
            </button>
            <button
              className="flex h-[40px] flex-row items-center justify-center rounded-md bg-red-500 px-2 text-white"
              onClick={() => {
                openHandler();
                setCompanyType('');
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="text-balck h-[40px] rounded-md bg-primaryYellow px-3"
            onClick={openHandler}
          >
            Add New Type of Company
          </button>
        )}
      </section>
      <div className="mt-5 h-[300px] overflow-auto">
        {values.map((value, index) => {
          return (
            <div
              key={index}
              className="mb-3 flex justify-between rounded bg-yellowBg py-5 px-3 text-left"
            >
              {companyTypeList.editCompanyInputState === value[0] ? (
                <input
                  type="text"
                  placeholder="Edit Location"
                  className="inputBox mr-2 w-full"
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
                      className="rounded bg-red-500 p-2"
                      onClick={() => editHandler('')}
                    >
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
                    <button
                      className={classNames('rounded bg-green-500 p-2', {
                        'cursor-not-allowed opacity-50': editCompanyType === '',
                      })}
                      disabled={editCompanyType === ''}
                      onClick={() => {
                        editCurrentCompanyType(editCompanyType, value[0]);
                      }}
                    >
                      <AiOutlineCheckCircle size={20} color="#fff" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="rounded bg-orange-500 p-2">
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
                      className={classNames('rounded bg-red-500 p-2', {
                        'cursor-not-allowed opacity-50': values.length === 1,
                      })}
                      disabled={values.length === 1}
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
      warningNotify('This company type already exists');
    } else {
      addNewCompanyType(type)
        .then((res) => {
          successfulNotify(res || 'Company Type Added Successfully');
          setCompanyType('');
        })
        .catch((err) => errorNotify(err.message || 'Something went wrong'));
    }
  }

  // EDIT COMPANY TYPE
  function editCurrentCompanyType(type: string, id: string) {
    const currentCompanyType = values.find(
      (value) => value[1].type.toLocaleLowerCase() === type.toLocaleLowerCase()
    );

    if (currentCompanyType) {
      warningNotify('This company type already exists');
    } else {
      editCompanyTypeAction(type, id)
        .then((res) => {
          successfulNotify(res || 'Company Type Edited Successfully');
          editHandler('');
        })
        .catch((err) => errorNotify(err.message || 'Something went wrong'));
    }
  }

  // DELETE COMPANY TYPE
  function deleteCurrentCompanyType(id: string) {
    deleteCompanyType(id)
      .then((res) =>
        successfulNotify(res || 'Company Type Deleted Successfully')
      )
      .catch((err) => errorNotify(err.message || 'Something went wrong'));
  }
}

export default AddCompanyTypeForm;
