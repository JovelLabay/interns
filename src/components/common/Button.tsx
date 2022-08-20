import React, { ReactNode } from 'react';

interface Props {
  className: string;
  buttonContext: ReactNode;
}

function Button({ buttonContext, className }: Props) {
  return <button className={className}>{buttonContext}</button>;
}

export default Button;
