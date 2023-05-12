import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

import internsLogo from '@/assets/logo/interns_logo.png';
import Link from 'next/link';
import { AiTwotoneMail } from 'react-icons/ai';
import { BsBrowserChrome, BsPersonFill } from 'react-icons/bs';
import CompanyDetail from '@component/interface/modal/student/companyDetail';
import { MdDescription } from 'react-icons/md';

function SompanyList() {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCompanyLists();
  }, []);

  return (
    <div>
      <div className="mb-3 flex gap-1 rounded bg-yellowBg p-2">
        <p>Company List</p>
      </div>
      <div className="flex flex-col gap-2 text-secondaryWhite">
        {companyList.map((companyDetail, index) => (
          <section key={index} className="rounded bg-customBorder p-2">
            <div className="flex items-center justify-start gap-2 pb-2">
              <Image
                width={50}
                height={50}
                src={companyDetail.company_image || internsLogo}
                alt="company logo"
                className="rounded-full"
              />
              <div className="w-full">
                <h4>{companyDetail.company_name}</h4>
                <p className="text-ellipsis text-xs italic">
                  {companyDetail.company_address}
                </p>
              </div>
            </div>
            {/* OTHER DETAILS */}
            <div className="flex flex-col gap-2 border-t-2 border-t-primaryYellow px-2 pt-2">
              {companyDetail.company_email !== '' && (
                <>
                  <p className="flex items-center gap-2 font-bold">
                    <AiTwotoneMail className="text-red-500" size={25} />
                    Company Email:
                  </p>
                  <Link href={`mailto:${companyDetail.company_email}`} passHref>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      Email Company
                    </a>
                  </Link>
                </>
              )}

              {companyDetail.company_website !== '' && (
                <>
                  <p className="flex items-center gap-2 font-bold">
                    <BsBrowserChrome className="text-blue-500" size={25} />
                    Company Website:
                  </p>
                  <Link href={companyDetail.company_website} passHref>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      Visit Company Website
                    </a>
                  </Link>
                </>
              )}

              <p className="flex items-center gap-2 font-bold">
                <BsPersonFill className="text-green-500" size={25} />
                Contact Person:
              </p>
              <p className="text-xs">{companyDetail.comapny_contact_person}</p>

              {companyDetail.company_description !== '' && (
                <>
                  <p className="flex items-center gap-2 font-bold">
                    <MdDescription className="text-pink-500" size={25} />
                    Company Description:
                  </p>
                  <p className="text-xs">{companyDetail.company_description}</p>
                </>
              )}

              <button
                className="mt-2 rounded bg-contastWhite py-2"
                onClick={() => {
                  setIsOpen(true);

                  setCompanyId(companyDetail.id);
                }}
              >
                See more
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* MODAL */}

      {companyId !== -1 && (
        <CompanyDetail
          modal={isOpen}
          setIsOpen={setIsOpen}
          companyId={companyId}
          setCompanyId={setCompanyId}
        />
      )}
    </div>
  );

  // COMPANY
  function getCompanyLists() {
    axios
      .get('/api/data/company')
      .then((res) => {
        setCompanyList(res.data.responsePayload);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default SompanyList;
