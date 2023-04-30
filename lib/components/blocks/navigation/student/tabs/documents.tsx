import { DynamicContext } from '@redux/context';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';

function Documents() {
  const context = useContext(DynamicContext);
  const [state, setState] = useState({
    eligibility: false,
  });

  React.useEffect(() => {
    const studentData: {
      isEligible: boolean;
    } = context?.studentData && JSON.parse(context?.studentData);

    setState((prev) => ({ ...prev, eligibility: studentData.isEligible }));
  }, []);

  return (
    <div>
      <h4
        className={classNames(
          'rounded-md p-2 text-center font-bold tracking-wide text-white',
          state.eligibility ? 'bg-green-300' : 'bg-red-300'
        )}
      >
        {state.eligibility ? 'NOT ELIGIBLE' : 'NOT ELIGIBLE'}
      </h4>
      <h4
        className={classNames(
          'my-2 rounded-md p-2 text-center font-bold tracking-wide text-white',
          state.eligibility ? 'bg-green-300' : 'bg-red-300'
        )}
      >
        {state.eligibility ? 'NOT ELIGIBLE' : 'NOT ELIGIBLE'}
      </h4>
      <div className="">sdfsdf</div>
    </div>
  );
}

export default Documents;
