import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';

function Activitylogs() {
  const [data, setData] = useState('Loading...');
  const [activityList, setActivityList] = useState<
    {
      id: number;
      activity_message: string;
      createdAt: string;
    }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const updateTime = setInterval(() => {
      setData(moment().format('dddd, MMMM Do YYYY, h:mm a'));
    }, 1000);

    getActivityList();

    return () => {
      clearInterval(updateTime);
    };
  }, []);

  const tableData = useMemo(() => {
    return activityList.filter((item) => {
      const regex = new RegExp(searchTerm.toLocaleLowerCase(), 'gi');
      return item.activity_message.toLocaleLowerCase().match(regex);
    });
  }, [searchTerm, activityList]);

  return (
    <div className="mx-28 flex h-[80vh] flex-col gap-2 rounded bg-white p-3">
      <div className="flex items-center justify-between">
        <h2>Deplays All the Recent Operations</h2>
        <input
          className={classNames(
            'w-[400px] rounded-md bg-mainBgWhite py-3 px-2 text-sm focus:outline-none'
          )}
          type="text"
          placeholder="Search Activity History..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-[70vh] w-full overflow-auto">
        <table className="w-full text-left text-sm ">
          <thead className="sticky top-0 bg-gray-100 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Unique Identifier
              </th>
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Message
              </th>
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Date Creation
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="whitespace-nowrap px-6 py-4 font-normal">
                  {item.id}
                </td>
                <td className=" text-ellipsis whitespace-nowrap px-6 py-4 font-normal">
                  {item.activity_message}
                </td>
                <td className=" text-ellipsis whitespace-nowrap px-6 py-4 font-normal">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-yellowBg py-2 px-3">
        <p className="text-sm font-thin text-secondaryWhite">{data}</p>
      </div>
    </div>
  );

  async function getActivityList() {
    const res = await fetch('/api/data/activityList');
    const data = await res.json();
    setActivityList(data.responsePayload);
  }
}

export default Activitylogs;
