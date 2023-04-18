import axios from 'axios';
import React, { useState } from 'react';
import {
  AiOutlineConsoleSql,
  AiOutlinePlusCircle,
  AiOutlineSearch,
} from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import Papa from 'papaparse';

function StudentContainer() {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const valuesArray: string[][] = [];

        results.data.map((d: any) => {
          valuesArray.push(Object.values(d));
        });

        console.log(valuesArray);
      },
    });
  };
  return (
    <div className="mx-28 flex h-[80vh] flex-col gap-2 rounded bg-white p-3">
      <div className="flex items-center justify-between rounded-md bg-yellowBg p-2">
        <p className="font-bold text-secondaryWhite">Manage Practicumers</p>
        <div className="flex items-center justify-center gap-3">
          <button
            className="rounded bg-primaryYellow p-2"
            title="Search School Year"
          >
            <AiOutlineSearch size={20} />
          </button>
          <button className="rounded bg-primaryYellow p-2" title="Refresh">
            <BiRefresh size={20} />
          </button>
          <button
            className="rounded bg-primaryYellow p-2"
            title="Add School Year"
          >
            <AiOutlinePlusCircle size={20} />
          </button>
        </div>
      </div>

      {/* <table></table> */}

      <input
        placeholder="sdf"
        type="file"
        name="file"
        onChange={changeHandler}
        // accept only csv and excel files
        accept=".csv"
        style={{ display: 'block', margin: '10px auto' }}
      />
    </div>
  );
}

export default StudentContainer;
