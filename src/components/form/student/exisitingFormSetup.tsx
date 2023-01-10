import React, { useMemo } from 'react';

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
  const count = useMemo(() => {
    return watch().selfDescription?.length;
  }, [watch().selfDescription]);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {/* PERSONAL DETAILS */}
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Email Address"
          title="CompanyName"
          className="rounded border-2 border-primaryYellow bg-teriaryWhite py-3 px-2 outline-none"
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
          className="rounded border-2 border-primaryYellow bg-teriaryWhite py-3 px-2 outline-none"
          disabled
          {...register('collegeName')}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="inputlabel">
          Self Description{' '}
          <span
            className={
              count >= 120
                ? 'rounded-full bg-red-500 px-2 font-thin text-white'
                : 'rounded-full bg-green-500 px-2 font-thin text-white'
            }
          >
            {count}
          </span>
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
        <div className="mt-1 flex items-center justify-between">
          <Listbox>
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button className="flex w-[80px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none ">
                  {watch().birthDate?.month === undefined
                    ? 'MM'
                    : watch().birthDate?.month}
                  <FiChevronDown
                    size={30}
                    className={classNames('text-secondaryWhite duration-300', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute z-50 max-h-[150px] w-[80px] overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
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
                <Listbox.Button className="flex w-[80px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none ">
                  {watch().birthDate?.day === undefined
                    ? 'DD'
                    : watch().birthDate?.day}
                  <FiChevronDown
                    size={30}
                    className={classNames('text-secondaryWhite duration-300', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute z-50 max-h-[150px] w-[80px] overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
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
                <Listbox.Button className="flex w-[100px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none ">
                  {watch().birthDate?.year === undefined
                    ? 'YYYY'
                    : watch().birthDate?.year}
                  <FiChevronDown
                    size={30}
                    className={classNames('text-secondaryWhite duration-300', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute z-50 max-h-[150px] w-[100px] overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
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
              <Listbox.Button className="mt-1 flex w-full justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none">
                {watch().city_municipality === undefined
                  ? 'Select City or Municipality'
                  : watch().city_municipality}
                <FiChevronDown
                  size={30}
                  className={classNames('text-secondaryWhite duration-300', {
                    'rotate-180': open,
                  })}
                />
              </Listbox.Button>
              <Listbox.Options className="absolute max-h-[150px] w-full overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
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
              <Listbox.Button className="mt-1 flex w-full justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none">
                {watch().gender === undefined ? 'Select' : watch().gender}
                <FiChevronDown
                  size={30}
                  className={classNames('text-secondaryWhite duration-300', {
                    'rotate-180': open,
                  })}
                />
              </Listbox.Button>
              <Listbox.Options className="absolute z-50 max-h-[150px] w-full overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
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
