import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import React, { useContext } from 'react';
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

function Details({
  isUpdate,
  register,
  errors,
}: {
  isUpdate: boolean;
  register: UseFormRegister<{
    studentDetails: {
      firstName: string;
      lastName: string;
      middleName: string;
    };
  }>;
  errors: FieldErrorsImpl<{
    [x: string]: any;
  }>;
}) {
  const context = useContext(DynamicContext);

  return (
    <div
      className={classNames(
        'my-2 flex flex-col gap-2',
        !context?.isDarkMode ? 'text-secondaryBgBlack' : 'text-white'
      )}
    >
      {/* PERONAL */}
      <h3
        className={classNames(
          'rounded py-2 px-2 font-medium',
          context?.isDarkMode ? 'bg-mainBgBlack' : 'bg-customBorder'
        )}
      >
        Personal
      </h3>
      <div className="grid grid-cols-1 gap-4 px-3 py-2 md:grid-cols-2 lg:grid-cols-3">
        {isUpdate ? (
          <>
            <section className="">
              <h4 className="font-medium">First Name</h4>
              <input
                type="text"
                placeholder="First Name"
                className={classNames(
                  'w-full rounded border-2 border-primaryYellow bg-mainBgWhite py-2 px-3 outline-none',
                  {
                    'bg-secondaryBgBlack text-white': context?.isDarkMode,
                  }
                )}
                {...register('studentDetails.firstName')}
              />
            </section>
            <section className="">
              <h4 className="font-medium">Middle Name</h4>
              <input
                type="text"
                placeholder="Middle Name"
                className={classNames(
                  'w-full rounded border-2 border-primaryYellow bg-mainBgWhite py-2 px-3 outline-none',
                  {
                    'bg-secondaryBgBlack text-white': context?.isDarkMode,
                  }
                )}
                {...register('studentDetails.middleName')}
              />
            </section>
            <section className="">
              <h4 className="font-medium">Last Name</h4>
              <input
                type="text"
                placeholder="Last Name"
                className={classNames(
                  'w-full rounded border-2 border-primaryYellow bg-mainBgWhite py-2 px-3 outline-none',
                  {
                    'bg-secondaryBgBlack text-white': context?.isDarkMode,
                  }
                )}
                {...register('studentDetails.lastName')}
              />
            </section>
          </>
        ) : (
          <>
            <section className="">
              <h4 className="font-medium">First Name</h4>
              <p className="italic">
                {context?.watch().studentDetails?.firstName}
              </p>
            </section>
            <section className="">
              <h4 className="font-medium">Middle Name</h4>
              <p className="italic">
                {context?.watch().studentDetails?.middleName}
              </p>
            </section>
            <section className="">
              <h4 className="font-medium">Last Name</h4>
              <p className="italic">
                {context?.watch().studentDetails?.lastName}
              </p>
            </section>
            <section className="">
              <h4 className="font-medium">Gender</h4>
              <p className="italic">
                {context?.watch().studentDetails?.gender}
              </p>
            </section>
            <section className="">
              <h4 className="font-medium">Email Address</h4>
              <p className="italic">
                {context?.watch().studentDetails?.emailAddress}
              </p>
            </section>
          </>
        )}
      </div>

      {/* ADDRESS */}
      <h3
        className={classNames(
          'rounded py-2 px-2 font-medium',
          context?.isDarkMode ? 'bg-mainBgBlack' : 'bg-customBorder'
        )}
      >
        Address
      </h3>
      <div className="grid grid-cols-1 gap-4 px-3 py-2 md:grid-cols-2 lg:grid-cols-3">
        {isUpdate ? (
          <>
            <section className="">
              <h4 className="font-medium">City / Municipality</h4>
              <input
                type="text"
                placeholder="City / Municipality"
                className={classNames(
                  'w-full rounded border-2 border-primaryYellow bg-mainBgWhite py-2 px-3 outline-none',
                  {
                    'bg-secondaryBgBlack text-white': context?.isDarkMode,
                  }
                )}
              />
            </section>
            <section className="">
              <h4 className="font-medium">State / Province</h4>
              <input
                type="text"
                placeholder="State / Province"
                className={classNames(
                  'w-full rounded border-2 border-primaryYellow bg-mainBgWhite py-2 px-3 outline-none',
                  {
                    'bg-secondaryBgBlack text-white': context?.isDarkMode,
                  }
                )}
              />
            </section>
          </>
        ) : (
          <>
            <section className="">
              <h4 className="font-medium">City / Municipality</h4>
              <p className="italic">
                {context?.watch().address?.city_municipality}
              </p>
            </section>
            <section className="">
              <h4 className="font-medium">State / Province</h4>
              <p className="italic">
                {context?.watch().address?.province_state}
              </p>
            </section>
          </>
        )}
      </div>

      {/* BIRTHDATE */}
      <h3
        className={classNames(
          'rounded py-2 px-2 font-medium',
          context?.isDarkMode ? 'bg-mainBgBlack' : 'bg-customBorder'
        )}
      >
        Birthdate
      </h3>
      <div className="grid grid-cols-1 gap-4 px-3 py-2 md:grid-cols-2 lg:grid-cols-3">
        <section className="flex gap-2">
          <h4 className="font-medium">Day: </h4>
          <p className="italic">{context?.watch().birthDate?.day}</p>
        </section>
        <section className="flex gap-2">
          <h4 className="font-medium">Month: </h4>
          <p className="italic">{context?.watch().birthDate?.month}.</p>
        </section>
        <section className="flex gap-2">
          <h4 className="font-medium">Year: </h4>
          <p className="italic">{context?.watch().birthDate?.year}</p>
        </section>
      </div>
    </div>
  );
}

export default Details;
