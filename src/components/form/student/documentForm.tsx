// REACT
import React from 'react';

// USEFORM
import { UseFormWatch } from 'react-hook-form';

// ICONS
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from 'react-icons/ai';

function DocumentForm({
  uploadProfileImage,
  watch,
}: {
  uploadProfileImage(e: React.ChangeEvent<HTMLInputElement>): void;
  watch: UseFormWatch<StudentRegistration>;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-10 min-h-[70vh]">
      {/* BIRTH CERTIFICATE */}
      <div className="flex flex-col items-center justify-center my-4">
        {watch().studentDocuments?.birthCertificate ? (
          <label
            className="text-secondaryWhite border-2 rounded-md px-10 py-5 border-primaryYellow border-dashed
             bg-customBorder hover:cursor-pointer"
          >
            <a
              className="py-3"
              href={watch().studentDocuments?.birthCertificate}
              target="_blank"
              rel="noreferrer"
              download
            >
              <AiOutlineCloudDownload size={30} />
            </a>
          </label>
        ) : (
          <label
            className="text-secondaryWhite border-2 rounded-md px-10 py-5 border-primaryYellow border-dashed
             bg-mainBgWhite hover:cursor-pointer"
          >
            <AiOutlineCloudUpload size={40} />
            <input
              className="imageUpload"
              type="file"
              title="birthCertificate"
              accept="application/pdf"
              name="birthCertificate"
              onChange={uploadProfileImage}
            />
          </label>
        )}
        <p className="mt-5 inputlabel">Birth Cerificate</p>
      </div>

      {/* SCHOOL ID */}
      <div className="flex flex-col items-center justify-center my-4">
        {watch().studentDocuments?.schoolId ? (
          <label
            className="text-secondaryWhite border-2 rounded-md px-10 py-5 border-primaryYellow border-dashed
             bg-customBorder hover:cursor-pointer"
          >
            <a
              className="py-3"
              href={watch().studentDocuments?.schoolId}
              target="_blank"
              rel="noreferrer"
              download
            >
              <AiOutlineCloudDownload size={30} />
            </a>
          </label>
        ) : (
          <label
            className="text-secondaryWhite border-2 rounded-md px-10 py-5 border-primaryYellow border-dashed
             bg-mainBgWhite hover:cursor-pointer"
          >
            <AiOutlineCloudUpload size={40} />
            <input
              className="imageUpload"
              type="file"
              title="schoolId"
              accept="application/pdf"
              name="schoolId"
              onChange={uploadProfileImage}
            />
          </label>
        )}
        <p className="mt-5 inputlabel">School ID</p>
      </div>

      {/* RESUME */}
      <div className="flex flex-col items-center justify-center my-4">
        {watch().studentDocuments?.curreculumVitae ? (
          <label
            className="text-secondaryWhite border-2 rounded-md px-10 py-5 border-primaryYellow border-dashed
             bg-customBorder hover:cursor-pointer"
          >
            <a
              className="py-3"
              href={watch().studentDocuments?.curreculumVitae}
              target="_blank"
              rel="noreferrer"
              download
            >
              <AiOutlineCloudDownload size={30} />
            </a>
          </label>
        ) : (
          <label
            className="text-secondaryWhite border-2 rounded-md px-10 py-5 border-primaryYellow border-dashed
             bg-mainBgWhite hover:cursor-pointer"
          >
            <AiOutlineCloudUpload size={40} />
            <input
              className="imageUpload"
              type="file"
              title="curriculumVitae"
              accept="application/pdf"
              name="curriculumVitae"
              onChange={uploadProfileImage}
            />
          </label>
        )}
        <p className="mt-5 inputlabel">Curreculum Vitae</p>
      </div>

      {/* APPLICATION LETTER */}
      <div className="flex flex-col items-center justify-center my-4">
        {watch().studentDocuments?.applicationLetter ? (
          <label
            className="text-secondaryWhite border-2 rounded-md px-10 py-5 border-primaryYellow border-dashed
             bg-customBorder hover:cursor-pointer"
          >
            <a
              className="py-3"
              href={watch().studentDocuments?.applicationLetter}
              target="_blank"
              rel="noreferrer"
              download
            >
              <AiOutlineCloudDownload size={30} />
            </a>
          </label>
        ) : (
          <label
            className="text-secondaryWhite border-2 rounded-md px-10 py-5 border-primaryYellow border-dashed
             bg-mainBgWhite hover:cursor-pointer"
          >
            <AiOutlineCloudUpload size={40} />
            <input
              className="imageUpload"
              type="file"
              title="applicationLetter"
              accept="application/pdf"
              name="applicationLetter"
              onChange={uploadProfileImage}
            />
          </label>
        )}
        <p className="mt-5 inputlabel">Application Letter</p>
      </div>
    </div>
  );
}

export default DocumentForm;
