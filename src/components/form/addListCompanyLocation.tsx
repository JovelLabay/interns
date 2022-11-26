// REACT
import React, { useState } from 'react';

// FIREBASE FUNCTIONS
import {
  addNewCompanyLocation,
  deleteCompanyLocation,
  editCompanyLocation,
} from '@/src/functions/firebaseDatabase';

// ICONS
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

// TOAST
import { notify } from '../common/toast';

function AddListCompanyLocation(props: { currentLocations: object }) {
  const { currentLocations } = props;
  const [locationController, setLocationController] = React.useState({
    inputState: false,
    editInputState: '',
  });
  const values: [string, { location: string }][] =
    Object.entries(currentLocations) || [];

  const [location, setLocation] = useState('');
  const [editLocation, setEditLocation] = useState('');

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
          <button
            className="bg-primaryYellow rounded-md h-[40px] px-3 text-balck"
            onClick={addNewLocation}
          >
            Add New Location
          </button>
        )}
      </section>
      <div className="h-[300px] overflow-auto mt-5">
        {values.map((value, index) => {
          return (
            <div
              key={index}
              className="flex justify-between rounded bg-yellowBg py-5 px-3 text-left mb-3"
            >
              {locationController.editInputState === value[0] ? (
                <input
                  type="text"
                  placeholder="Edit Location"
                  className="inputBox w-full mr-2"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                />
              ) : (
                <p>{value[1].location}</p>
              )}

              <div className="flex gap-2">
                {locationController.editInputState === value[0] ? (
                  <>
                    <button
                      className="bg-red-500 p-2 rounded"
                      onClick={() => {
                        editLocationHandler('', '');
                      }}
                    >
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
                    <button
                      className="bg-green-500 p-2 rounded"
                      onClick={() => {
                        editLocationFirebaseHandler(editLocation, value[0]);
                      }}
                    >
                      <AiOutlineCheckCircle size={20} color="#fff" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-orange-500 p-2 rounded"
                      onClick={() => {
                        editLocationHandler(value[0], value[1].location);
                      }}
                    >
                      <AiOutlineEdit size={20} color="#fff" />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded"
                      onClick={() => deleteLocationFirebaseHandler(value[0])}
                    >
                      <AiOutlineDelete size={20} color="#fff" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  function addNewLocation() {
    setLocationController((prev) => {
      return { ...prev, inputState: !prev.inputState };
    });
  }

  function editLocationHandler(id: string, locationName: string) {
    setLocationController((prev) => {
      return { ...prev, editInputState: id };
    });

    setEditLocation(locationName);
  }

  // ADD NEW LOCATION
  function addLocationHandler() {
    const theCurrentLocaton = values.find((value) => {
      return (
        value[1].location.toLocaleLowerCase() === location.toLocaleLowerCase()
      );
    });

    if (theCurrentLocaton) {
      notify('Location already exists');
    } else {
      addNewCompanyLocation(location)
        .then((res) => {
          notify(res || 'Location Added Successfully');
          setLocation('');
        })
        .catch((err) => console.error(err));
    }
  }

  // EDIT LOCATION
  function editLocationFirebaseHandler(editState: string, id: string) {
    const theCurrentLocaton = values.find((value) => {
      return (
        value[1].location.toLocaleLowerCase() === location.toLocaleLowerCase()
      );
    });

    if (theCurrentLocaton) {
      notify('Location already exists');
    } else {
      editCompanyLocation(editState, id)
        .then((res) => {
          notify(res || 'Location Edited Successfully');
          editLocationHandler('', '');
        })
        .catch((err) => console.error(err));
    }
  }

  // DELETE LOCATION
  function deleteLocationFirebaseHandler(id: string) {
    deleteCompanyLocation(id)
      .then((res) => {
        notify(res || 'Location Deleted Successfully');
        editLocationHandler('', '');
      })
      .catch((err) => console.error(err));
  }
}

export default AddListCompanyLocation;
