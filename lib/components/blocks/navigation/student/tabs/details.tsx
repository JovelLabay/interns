import React, { useContext } from 'react';
import { DynamicContext } from '@redux/context';

function Details() {
  const context = useContext(DynamicContext);

  console.log(context?.studentData);
  return (
    <div>
      <h1>Sdfsdf</h1>
    </div>
  );
}

export default Details;
