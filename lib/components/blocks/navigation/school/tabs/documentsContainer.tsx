import React, { useEffect, useState } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import axios from 'axios';
import { errorNotify } from '@component/interface/toast/toast';
import classNames from 'classnames';
import Image from 'next/image';
import internsLogo from '@/assets/logo/interns_logo.png';

function DocumentsContainer() {
  const [listCollege, setListCollege] = useState<ReturnCollegeProgram[]>([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });

  useEffect(() => {
    getCollegeList();
  }, [pagination.skip]);

  return (
    <div className="mx-28 flex h-[80vh] flex-col gap-2 rounded bg-white p-3">
      <div className="flex items-center justify-between rounded-md bg-yellowBg p-2">
        <p className="font-bold text-secondaryWhite">
          College Department Requirements
        </p>
      </div>

      <div className="grid grid-cols-3">
        <div className="p-2">
          <div className="flex h-[65vh] flex-col items-center justify-start gap-2 overflow-auto">
            {listCollege.length <= 0 ? (
              <tr className="h-full">
                <td
                  colSpan={8}
                  className="py-5 text-center text-secondaryWhite"
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              <>
                {listCollege.map((college, index) => (
                  <button
                    key={college.id}
                    className="flex w-full items-center justify-start gap-4 rounded bg-mainBgWhite p-3 text-left font-semibold text-secondaryWhite duration-300"
                  >
                    <Image
                      width={50}
                      height={50}
                      alt="profileImage"
                      className="rounded-full"
                      src={college.college_department_image || internsLogo}
                    />
                    <span className="flex flex-col items-start justify-center">
                      <span>{college.college_department_name}</span>
                      <span className="text-sm font-light">
                        {college.complete_program_name}
                      </span>
                      <span className="text-xs font-light italic">
                        {college.college_coordinator}
                      </span>
                    </span>
                  </button>
                ))}
              </>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              className={classNames(
                'w-[100px] rounded border-2 border-primaryYellow p-1',
                {
                  'cursor-not-allowed opacity-50': pagination.skip <= 0,
                }
              )}
              disabled={pagination.skip <= 0}
              onClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  skip: prev.skip - 20,
                  take: prev.take - 20,
                }));
              }}
            >
              Prev
            </button>
            <p>
              {pagination.skip === 0 ? 1 : pagination.skip} - {pagination.take}
            </p>
            <button
              className={classNames(
                'w-[100px] rounded border-2 border-primaryYellow p-1',
                {
                  'cursor-not-allowed opacity-50':
                    pagination.payloadLength !== 20,
                }
              )}
              disabled={pagination.payloadLength !== 20}
              onClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  skip: prev.skip + 20,
                  take: prev.take + 20,
                }));
              }}
            >
              Next
            </button>
          </div>
        </div>
        <div className="col-span-2 p-2">sdfsd</div>
      </div>
    </div>
  );

  function getCollegeList() {
    axios
      .get(`/api/data/collegeProgram?skip=${pagination.skip}`)
      .then((res) => {
        setListCollege(res.data.responsePayload);

        const length = res.data.responsePayloadLength;

        setPagination((prev) => ({ ...prev, payloadLength: length }));
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }
}

export default DocumentsContainer;
