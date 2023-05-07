import React, { useContext, useEffect, useState } from 'react';
import { DynamicContext } from '@redux/context';
import classNames from 'classnames';
import { splitUnderScore } from '@utils/commonFunction';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

function Details() {
  const context = useContext(DynamicContext);

  const [status, setStatus] = useState({
    studentStatus: '',
    eligibiligyStatus: false,
  });

  useEffect(() => {
    const parsedStudentData = JSON.parse(context?.studentData || '{}');

    setStatus({
      studentStatus: parsedStudentData?.student_status,
      eligibiligyStatus: parsedStudentData?.isEligible,
    });
  }, []);

  return (
    <div>
      <h2
        className={classNames(
          'rounded-md py-2 text-center text-white',
          status.studentStatus === 'INCOMPLETE'
            ? 'bg-red-500'
            : status.studentStatus === 'COMPLETE'
            ? 'bg-pink-500'
            : status.studentStatus === 'APPLYING'
            ? 'bg-yellow-500'
            : status.studentStatus === 'APPLIED'
            ? 'bg-blue-500'
            : status.studentStatus === 'FINISHED'
            ? 'bg-green-500'
            : 'bg-gray-500'
        )}
      >
        <span className="font-medium">Your Status: </span>
        <span className="font-thin">
          {splitUnderScore(status.studentStatus)}
        </span>
      </h2>
      <div
        className={classNames(
          'md:mx-15 my-5 flex min-h-[200px] flex-col items-center justify-center gap-5 rounded-md sm:mx-10 lg:mx-20 xl:mx-32',
          status.eligibiligyStatus ? 'bg-green-200' : 'bg-red-200'
        )}
      >
        {status.eligibiligyStatus ? (
          <AiFillCheckCircle size={50} className="text-green-500" />
        ) : (
          <AiFillCloseCircle size={50} className="text-red-500" />
        )}
        <h1
          className={classNames(
            'font-bold',
            status.eligibiligyStatus ? 'text-green-200' : 'text-red-500'
          )}
        >
          {status.eligibiligyStatus ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
        </h1>
      </div>
    </div>
  );
}

export default Details;
