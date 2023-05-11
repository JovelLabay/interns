import React, { useState } from 'react';

function SompanyList() {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [companyJob, setCompanyJob] = useState<CompanyJob[]>([]);

  return (
    <div>
      <h1 className="mt-10 text-center">SompanyList</h1>
    </div>
  );
}

export default SompanyList;
