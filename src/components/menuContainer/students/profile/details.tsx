import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import React, { useContext } from 'react';

function Details() {
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
      <div className="grid grid-cols-1 gap-4 px-3 md:grid-cols-2 lg:grid-cols-3">
        <section className="">
          <h4 className="font-medium">First Name</h4>
          <p className="italic">{context?.watch().studentDetails?.firstName}</p>
        </section>
        <section className="">
          <h4 className="font-medium">Middle Name</h4>
          <p className="italic">
            {context?.watch().studentDetails?.middleName}
          </p>
        </section>
        <section className="">
          <h4 className="font-medium">Last Name</h4>
          <p className="italic">{context?.watch().studentDetails?.lastName}</p>
        </section>
        <section className="">
          <h4 className="font-medium">Gender</h4>
          <p className="italic">{context?.watch().studentDetails?.gender}</p>
        </section>
        <section className="">
          <h4 className="font-medium">Email Address</h4>
          <p className="italic">
            {context?.watch().studentDetails?.emailAddress}
          </p>
        </section>
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
      <div className="grid grid-cols-1 gap-4 px-3 md:grid-cols-2 lg:grid-cols-3">
        <section className="">
          <h4 className="font-medium">First Name</h4>
          <p className="italic">
            {context?.watch().address?.city_municipality}
          </p>
        </section>
        <section className="">
          <h4 className="font-medium">Middle Name</h4>
          <p className="italic">{context?.watch().address?.province_state}</p>
        </section>
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
      <div className="grid grid-cols-1 gap-4 px-3 md:grid-cols-2 lg:grid-cols-3">
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
