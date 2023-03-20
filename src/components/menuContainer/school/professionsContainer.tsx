import React from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';

function ProfessionsContainer() {
  return (
    <div className="mx-28 flex h-[80vh] flex-col items-center justify-center gap-5 rounded bg-white p-3">
      <AiOutlineConsoleSql size={50} />
      <h1>Professions Under Development</h1>
    </div>
  );
}

export default ProfessionsContainer;
