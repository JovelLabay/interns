import React, { Fragment, useContext, useState } from 'react';
import classNames from 'classnames';
import { DynamicContext } from '@/src/contexts/context';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { data } from 'Data';

function Documents() {
  const context = useContext(DynamicContext);
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = useState<{
    state: boolean;
    documentLink: unknown | string;
    documentName: string;
  }>({
    state: false,
    documentLink: '',
    documentName: '',
  });

  const documents = context?.watch().studentDocuments;
  const documentList: any[] = Object.entries(documents).map((key) => key);

  console.log(documentList);

  return (
    <div
      className={classNames(
        'my-2 flex flex-col gap-2',
        !context?.isDarkMode ? 'text-secondaryBgBlack' : 'text-white'
      )}
    >
      <h3
        className={classNames(
          'rounded py-2 px-2 font-medium',
          context?.isDarkMode ? 'bg-mainBgBlack' : 'bg-customBorder'
        )}
      >
        Documents
      </h3>
      <div className="grid grid-cols-1 gap-5 px-5 md:grid-cols-2 lg:grid-cols-4">
        {documentList.map((document, key) => (
          <a
            href={document[1]}
            target="_blank"
            rel="noreferrer"
            title={document[1] === 'NOT SET' ? 'No Document' : 'View Document'}
            key={key}
            className={classNames(
              'flex items-center justify-start gap-5 rounded-md p-3 uppercase',
              context?.isDarkMode ? 'bg-mainBgBlack' : 'bg-customBorder',
              document[1] === 'NOT SET' ? 'cursor-not-allowed opacity-50' : ''
            )}
          >
            <HiOutlineDocumentDuplicate size={30} />
            <span className="text-sm">{document[0]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Documents;
