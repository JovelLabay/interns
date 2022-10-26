// REACT
import React, { useState } from 'react';

// FIREBASE FUNCTIONS
import { addNewCompanyLocation } from '@/src/functions/firebaseDatabase';

// ICONS
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

// TOAST
import { ToastContainer } from 'react-toastify';
import { notify } from '../common/toast';

function AddListCompanyLocation(props: { currentLocations: object }) {
  const { currentLocations } = props;
  const [locationController, setLocationController] = React.useState({
    inputState: false,
  });
  const values: [string, { location: string }][] =
    Object.entries(currentLocations) || [];

  const [location, setLocation] = useState('');

  return (
    <div>
      <section>
        {locationController.inputState ? (
          <div className="flex justify-between items-center gap-2">
            <input
              type="text"
              name="nameOfTheLocation"
              className="inputBox w-full"
              placeholder="Location of the Company"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="bg-green-500 rounded-md h-[40px] flex flex-row items-center justify-center px-2 text-white"
              onClick={addLocationHandler}
            >
              Add
            </button>
            <button
              className="bg-red-500 rounded-md h-[40px] flex flex-row items-center justify-center px-2 text-white"
              onClick={() => {
                addNewLocation();
                setLocation('');
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={addNewLocation}>Add New Location</button>
        )}
      </section>
      <div className="h-[300px] overflow-auto mt-5">
        {values.map((value, index) => {
          return (
            <div
              key={index}
              className="flex justify-between rounded bg-yellowBg py-5 px-3 text-left mb-3"
            >
              <p>{value[1].location}</p>

              <div className="flex gap-2">
                <button className="buttonIcon">
                  <AiOutlineEdit />
                </button>
                <button className="buttonIcon">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* TOAST */}
      <ToastContainer />
    </div>
  );

  function addNewLocation() {
    setLocationController((prev) => {
      return { ...prev, inputState: !prev.inputState };
    });
  }

  function addLocationHandler() {
    addNewCompanyLocation(location)
      .then((res) => {
        notify(res || 'Location Added Successfully');
        setLocation('');
      })
      .catch((err) => console.error(err));
  }
}

export default AddListCompanyLocation;
