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
import { notify } from '../common/toast';
import { AiOutlinePlus } from 'react-icons/ai';

function AddCollegeForm() {
  const [addCollegeData, setAddCollegeData] = useState({
    deanProfession: data.admin.collegeDeanProfession[0].name,
    collegeType: data.admin.collegeType[0].name,
    collegeColor: '',
    courseTitle: '',
    collegeCourses: [] as string[],
  });

  const { register, handleSubmit, formState, setValue } =
    useForm<AddCollegeInterface>({
      resolver: yupResolver(AddCollegeValidator),
    });

  useEffect(() => {
    setValue('professionOfDean', addCollegeData.deanProfession);
    setValue('collegeType', addCollegeData.collegeType);
    setValue('collegeColor', addCollegeData.collegeColor);
  }, [addCollegeData]);

  return (
    <div>
      <form
        className="flex flex-col items-start gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(submitNewCollege)();
        }}
      >
        <label htmlFor="nameOfDean">Dean Title & Complete Name</label>
        <div className="flex items-center justify-center gap-3">
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
                <Listbox.Button className="flex w-[160px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none">
                  <>{addCollegeData.deanProfession}</>
                  <FiChevronDown
                    size={30}
                    className={classNames('text-secondaryWhite duration-300', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute z-50 max-h-[150px] w-[160px] overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
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
            placeholder="College Dean"
            className={
              formState.errors.professionOfDean
                ? 'rounded-md border-2 border-red-500 bg-red-50 px-2 py-3 outline-none'
                : 'inputBox'
            }
            {...register('nameOfDean')}
          />
        </div>
        <label htmlFor="nameOfCollege">College Type & Complete Name</label>
        <div className="flex items-center justify-center gap-3">
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
                <Listbox.Button className="z-50 flex w-[160px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none">
                  <>{addCollegeData.collegeType}</>
                  <FiChevronDown
                    size={30}
                    className={classNames('text-secondaryWhite duration-300', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute max-h-[150px] w-[160px] overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
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
            placeholder="College Name"
            className={
              formState.errors.nameOfCollege
                ? 'rounded-md border-2 border-red-500 bg-red-50 px-2 py-3 outline-none'
                : 'inputBox'
            }
            {...register('nameOfCollege')}
          />
        </div>

        <label htmlFor="shortNameOfCollege">College Courses</label>
        <ol className="flex flex-col items-start justify-start">
          {addCollegeData.collegeCourses.map((courses, index) => (
            <li
              className="ml-10 list-disc rounded p-2 duration-300 hover:cursor-pointer hover:bg-customBorder"
              title="Click to remove"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setAddCollegeData((prev) => {
                  return {
                    ...prev,
                    collegeCourses: prev.collegeCourses.filter(
                      (course) => course !== courses
                    ),
                  };
                });
              }}
            >
              {courses}
            </li>
          ))}
        </ol>
        <div className="flex w-full items-center justify-evenly gap-4">
          <input
            type="text"
            placeholder="Bachelor..."
            className="inputBox w-full"
            value={addCollegeData.courseTitle}
            onChange={(e) =>
              setAddCollegeData((prev) => {
                return { ...prev, courseTitle: e.target.value };
              })
            }
          />
          <button
            className="buttonIcon"
            onClick={(e) => {
              e.preventDefault();
              setAddCollegeData((prev) => {
                return {
                  ...prev,
                  collegeCourses: [...prev.collegeCourses, prev.courseTitle],
                  courseTitle: '',
                };
              });
            }}
          >
            <AiOutlinePlus />
          </button>
        </div>

        <label htmlFor="shortNameOfCollege">Abbreviated college Name</label>
        <input
          type="text"
          placeholder="ComStud"
          className={
            formState.errors.shortNameOfCollege
              ? 'w-full rounded-md border-2 border-red-500 bg-red-50 px-2 py-3 outline-none'
              : 'inputBox w-full'
          }
          {...register('shortNameOfCollege')}
        />

        <label htmlFor="shortNameOfCollege">College Passcode</label>
        <input
          type="password"
          placeholder="******"
          className={
            formState.errors.collegePasscode
              ? 'w-full rounded-md border-2 border-red-500 bg-red-50 px-2 py-3 outline-none'
              : 'inputBox w-full'
          }
          {...register('collegePasscode')}
        />

        <p>{JSON.stringify(formState.errors.collegePasscode?.message)}</p>
        <label htmlFor="shortNameOfCollege" className="flex items-center gap-2">
          College Color Theme
          <div
            style={{
              backgroundColor: addCollegeData.collegeColor,
              borderRadius: '50%',
              width: '20px',
              height: '20px',
            }}
          />
        </label>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {data.colors.map((color) => (
            <button
              key={color.id}
              style={{ backgroundColor: color.name }}
              className="rounded-full p-5"
              title={color.name}
              onClick={(e) => {
                e.preventDefault();

                setAddCollegeData({
                  ...addCollegeData,
                  collegeColor: color.name,
                });
              }}
            />
          ))}
        </div>

        <input
          type="submit"
          value="Add New College"
          className="text-balck h-[40px] w-full rounded-md bg-primaryYellow px-3 hover:cursor-pointer"
        />
      </form>
    </div>
  );

  function submitNewCollege(data: AddCollegeInterface) {
    addNewCollege(
      data.nameOfCollege,
      data.shortNameOfCollege,
      data.nameOfDean,
      data.professionOfDean,
      data.collegeType,
      parseInt(data.collegePasscode),
      data.collegeColor,
      addCollegeData.collegeCourses
    )
      .then((res: string) => notify(res))
      .catch((err: any) => console.log(err));
  }
}

export default AddCollegeForm;
