import React from 'react';

interface Props {
  type: string;
  placeHolder: string;
  value: string | number;
  tectBoxHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

function InputBox({
  type,
  placeHolder,
  value,
  tectBoxHandler,
  className,
}: Props) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={tectBoxHandler}
    />
  );
}

export default InputBox;
