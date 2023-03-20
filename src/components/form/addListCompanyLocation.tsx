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
import { successfulNotify, warningNotify, errorNotify } from '../common/toast';
import classNames from 'classnames';

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
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              name="nameOfTheLocation"
              className="inputBox w-full"
              placeholder="Location of the Company"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className={classNames(
                'flex h-[40px] flex-row items-center justify-center rounded-md bg-green-500 px-2 text-white',
                {
                  'cursor-not-allowed opacity-50': location === '',
                }
              )}
              disabled={location === ''}
              onClick={addLocationHandler}
            >
              Add
            </button>
            <button
              className="flex h-[40px] flex-row items-center justify-center rounded-md bg-red-500 px-2 text-white"
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
            className="text-balck h-[40px] rounded-md bg-primaryYellow px-3"
            onClick={addNewLocation}
          >
            Add New Location
          </button>
        )}
      </section>
      <div className="mt-5 h-[300px] overflow-auto">
        {values.map((value, index) => {
          return (
            <div
              key={index}
              className="mb-3 flex justify-between rounded bg-yellowBg py-5 px-3 text-left"
            >
              {locationController.editInputState === value[0] ? (
                <input
                  type="text"
                  placeholder="Edit Location"
                  className="inputBox mr-2 w-full"
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
                      className="rounded bg-red-500 p-2"
                      onClick={() => {
                        editLocationHandler('', '');
                      }}
                    >
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
                    <button
                      className={classNames('rounded bg-green-500 p-2', {
                        'cursor-not-allowed opacity-50': editLocation === '',
                      })}
                      disabled={editLocation === ''}
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
                      className="rounded bg-orange-500 p-2"
                      onClick={() => {
                        editLocationHandler(value[0], value[1].location);
                      }}
                    >
                      <AiOutlineEdit size={20} color="#fff" />
                    </button>
                    <button
                      className={classNames('rounded bg-red-500 p-2', {
                        'cursor-not-allowed opacity-50': values.length <= 1,
                      })}
                      disabled={values.length <= 1}
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
      warningNotify('Location already exists');
    } else {
      addNewCompanyLocation(location)
        .then((res) => {
          successfulNotify(res || 'Location Added Successfully');
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
      warningNotify('Location already exists');
    } else {
      editCompanyLocation(editState, id)
        .then((res) => {
          successfulNotify(res || 'Location Edited Successfully');
          editLocationHandler('', '');
        })
        .catch((err) => console.error(err));
    }
  }

  // DELETE LOCATION
  function deleteLocationFirebaseHandler(id: string) {
    deleteCompanyLocation(id)
      .then((res) => {
        successfulNotify(res || 'Location Deleted Successfully');
        editLocationHandler('', '');
      })
      .catch((err) => console.error(err));
  }
}

export default AddListCompanyLocation;
