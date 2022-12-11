import React from 'react';

// EXTERNAL
import { Listbox } from '@headlessui/react';
import classNames from 'classnames';

// STATIC DATA
import { data } from 'Data';

// REACT HOOK FORM
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

// ICONS
import { FiChevronDown } from 'react-icons/fi';

function ExisitingFormSetup({
  register,
  setValue,
  watch,
  locationLists,
}: {
  register: UseFormRegister<StudentRegistration>;
  setValue: UseFormSetValue<StudentRegistration>;
  watch: UseFormWatch<StudentRegistration>;
  locationLists: [
    string,
    {
      location: string;
    }
  ][];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* PERSONAL DETAILS */}
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          First Name
        </label>
        <input
          type="text"
          placeholder="First Name"
          title="CompanyName"
          className="border-2 rounded py-3 px-2 outline-none border-primaryYellow bg-teriaryWhite"
          disabled
          {...register('firstName')}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          Middle Name
        </label>
        <input
          type="text"
          placeholder="Middle Name"
          title="CompanyName"
          className="border-2 rounded py-3 px-2 outline-none border-primaryYellow bg-teriaryWhite"
          disabled
          {...register('middleName')}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Last Name"
          title="CompanyName"
          className="border-2 rounded py-3 px-2 outline-none border-primaryYellow bg-teriaryWhite"
          disabled
          {...register('lastName')}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Email Address"
          title="CompanyName"
          className="border-2 rounded py-3 px-2 outline-none border-primaryYellow bg-teriaryWhite"
          disabled
          {...register('emailAddress')}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          College/School
        </label>
        <input
          type="email"
          placeholder="College/School"
          title="CompanyName"
          className="border-2 rounded py-3 px-2 outline-none border-primaryYellow bg-teriaryWhite"
          disabled
          {...register('collegeName')}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          Self Description
        </label>
        <textarea
          placeholder="Self Description"
          title="CompanyName"
          className="inputBox"
          {...register('selfDescription')}
        />
      </div>

      {/* BIRTH DATE */}
      <section>
        <label htmlFor="" className="inputlabel">
          Birth Date
        </label>
        <div className="flex justify-between items-center mt-1">
          <Listbox>
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-[80px] flex justify-between ">
                  {watch().birthDate?.month === undefined
                    ? 'MM'
                    : watch().birthDate?.month}
                  <FiChevronDown
                    size={30}
                    className={classNames('duration-300 text-secondaryWhite', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute bg-white rounded-md p-2 w-[80px] shadow-md hover:cursor-pointer max-h-[150px] overflow-auto z-50">
                  {data.months.map((item) => (
                    <Listbox.Option
                      className="py-1"
                      key={item.id}
                      value={item.name}
                      hidden={item.id === 101}
                      onClick={() => setValue('birthDate.month', item.name)}
                    >
                      {item.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
          <Listbox>
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-[80px] flex justify-between ">
                  {watch().birthDate?.day === undefined
                    ? 'DD'
                    : watch().birthDate?.day}
                  <FiChevronDown
                    size={30}
                    className={classNames('duration-300 text-secondaryWhite', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute bg-white rounded-md p-2 w-[80px] shadow-md hover:cursor-pointer max-h-[150px] overflow-auto z-50">
                  {data.days.map((item) => (
                    <Listbox.Option
                      className="py-1"
                      key={item.id}
                      value={item.name}
                      hidden={item.id === 101}
                      onClick={() => setValue('birthDate.day', item.name)}
                    >
                      {item.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
          <Listbox>
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-[100px] flex justify-between ">
                  {watch().birthDate?.year === undefined
                    ? 'YYYY'
                    : watch().birthDate?.year}
                  <FiChevronDown
                    size={30}
                    className={classNames('duration-300 text-secondaryWhite', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute bg-white rounded-md p-2 w-[100px] shadow-md hover:cursor-pointer max-h-[150px] overflow-auto z-50">
                  {data.years.map((item) => (
                    <Listbox.Option
                      className="py-1"
                      key={item.id}
                      value={item.name}
                      hidden={item.id === 101}
                      onClick={() => setValue('birthDate.year', item.name)}
                    >
                      {item.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>
      </section>

      {/* OTHERS */}
      <section>
        <label htmlFor="" className="inputlabel">
          City or Municipality
        </label>
        <Listbox>
          {({ open }: { open: boolean }) => (
            <div className="relative">
              <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-full flex justify-between mt-1">
                {watch().city_municipality === undefined
                  ? 'Select City or Municipality'
                  : watch().city_municipality}
                <FiChevronDown
                  size={30}
                  className={classNames('duration-300 text-secondaryWhite', {
                    'rotate-180': open,
                  })}
                />
              </Listbox.Button>
              <Listbox.Options className="absolute bg-white rounded-md p-2 w-full shadow-md hover:cursor-pointer max-h-[150px] overflow-auto">
                {locationLists.map((item) => (
                  <Listbox.Option
                    className="py-1"
                    key={item[0]}
                    value={item[1].location}
                    onClick={() =>
                      setValue('city_municipality', item[1].location)
                    }
                  >
                    {item[1].location}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      </section>
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          Province or State
        </label>
        <input
          type="email"
          placeholder="Province or State"
          title="CompanyName"
          className="inputBox"
          {...register('province_state')}
        />
      </div>

      <section>
        <label htmlFor="" className="inputlabel">
          Sex
        </label>
        <Listbox>
          {({ open }: { open: boolean }) => (
            <div className="relative">
              <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-full flex justify-between mt-1">
                {watch().gender === undefined ? 'Select' : watch().gender}
                <FiChevronDown
                  size={30}
                  className={classNames('duration-300 text-secondaryWhite', {
                    'rotate-180': open,
                  })}
                />
              </Listbox.Button>
              <Listbox.Options className="absolute bg-white rounded-md p-2 w-full shadow-md hover:cursor-pointer max-h-[150px] overflow-auto z-50">
                {data.gender.map((item) => (
                  <Listbox.Option
                    className="py-1"
                    key={item.id}
                    value={item.name}
                    hidden={item.id === 101}
                    onClick={() => setValue('gender', item.name)}
                  >
                    {item.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      </section>
    </div>
  );
}

export default ExisitingFormSetup;
