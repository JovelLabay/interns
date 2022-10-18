// REACT
import React, { useEffect, useState } from 'react';

// FIREBASE FUNCTIONS
import { addNewCollege } from '@/src/functions/firebaseDatabase';

// SCHEMA VALIDATOR
import { AddCollegeValidator } from '@/src/validator/LogSignValidator';
import { yupResolver } from '@hookform/resolvers/yup';

// UI
import { Listbox } from '@headlessui/react';

// OTHERS
import classNames from 'classnames';

// STATIC DATA
import { data } from 'Data';

// USEFORM
import { useForm } from 'react-hook-form';

// ICONS
import { FiChevronDown } from 'react-icons/fi';

// TOAST
import { ToastContainer } from 'react-toastify';
import { notify } from '../common/toast';

function AddCollegeForm() {
  const [addCollegeData, setAddCollegeData] = useState({
    deanProfession: data.admin.collegeDeanProfession[0].name,
    collegeType: data.admin.collegeType[0].name,
  });

  const { register, handleSubmit, formState, setValue } =
    useForm<AddCollegeInterface>({
      resolver: yupResolver(AddCollegeValidator),
    });

  useEffect(() => {
    setValue('professionOfDean', addCollegeData.deanProfession);
    setValue('collegeType', addCollegeData.collegeType);
  }, [addCollegeData.collegeType, addCollegeData.deanProfession]);

  return (
    <div>
      <form
        className="flex flex-col items-start gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(submitNewCollege)();
        }}
      >
        <label htmlFor="nameOfDean">College Dean & Profession</label>
        <div className="flex justify-center items-center gap-3">
          <Listbox
            value={addCollegeData.deanProfession}
            onChange={(value) => {
              setAddCollegeData((prev) => {
                return { ...prev, deanProfession: value };
              });
            }}
          >
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-2 rounded-md border-2 border-primaryYellow w-[160px] flex justify-between">
                  <>{addCollegeData.deanProfession}</>
                  <FiChevronDown
                    size={30}
                    className={classNames('duration-300 text-secondaryWhite', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute bg-white rounded-md p-2 w-[160px] shadow-md hover:cursor-pointer max-h-[150px] overflow-auto z-50">
                  {data.admin.collegeDeanProfession.map((person) => (
                    <Listbox.Option
                      className="py-1"
                      key={person.id}
                      value={person.name}
                      hidden={person.id === 101}
                    >
                      {person.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
          <input
            type="text"
            placeholder="Ex. Jovel Labay..."
            className={
              formState.errors.professionOfDean
                ? 'bg-red-50 outline-none px-2 py-3 rounded-md border-2 border-red-500'
                : 'inputBox'
            }
            {...register('nameOfDean')}
          />
        </div>
        <label htmlFor="nameOfCollege">College Name & Type</label>
        <div className="flex justify-center items-center gap-3">
          <Listbox
            value={addCollegeData.collegeType}
            onChange={(value) => {
              setAddCollegeData((prev) => {
                return { ...prev, collegeType: value };
              });
            }}
          >
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-2 rounded-md border-2 border-primaryYellow w-[160px] flex justify-between z-50">
                  <>{addCollegeData.collegeType}</>
                  <FiChevronDown
                    size={30}
                    className={classNames('duration-300 text-secondaryWhite', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute bg-white rounded-md p-2 w-[160px] shadow-md hover:cursor-pointer max-h-[150px] overflow-auto">
                  {data.admin.collegeType.map((person) => (
                    <Listbox.Option
                      className="py-1"
                      key={person.id}
                      value={person.name}
                      hidden={person.id === 101}
                    >
                      {person.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
          <input
            type="text"
            placeholder="Ex. Computer Studies...."
            className={
              formState.errors.nameOfCollege
                ? 'bg-red-50 outline-none px-2 py-3 rounded-md border-2 border-red-500'
                : 'inputBox'
            }
            {...register('nameOfCollege')}
          />
        </div>

        <label htmlFor="shortNameOfCollege">Abbreviate college Name</label>
        <input
          type="text"
          placeholder="Ex. ComStud..."
          className={
            formState.errors.shortNameOfCollege
              ? 'bg-red-50 outline-none px-2 py-3 rounded-md border-2 border-red-500 w-full'
              : 'inputBox w-full'
          }
          {...register('shortNameOfCollege')}
        />

        <input
          type="submit"
          value="Add New College"
          className="buttonIcon2 w-full"
        />
      </form>

      {/* TOAST */}
      <ToastContainer />
    </div>
  );

  function submitNewCollege(data: AddCollegeInterface) {
    addNewCollege(
      data.nameOfCollege,
      data.shortNameOfCollege,
      data.nameOfDean,
      data.professionOfDean,
      data.collegeType
    )
      .then((res: string) => notify(res))
      .catch((err: any) => console.log(err));
  }
}

export default AddCollegeForm;
