import React, { useEffect, useState } from 'react';

// FIREBASE FUNCTIONS
import { CompanyCategory } from '@/src/functions/firebaseDatabase';
import { successfulNotify, warningNotify, errorNotify } from '../common/toast';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';
import classNames from 'classnames';

function AddJobCategoryForm() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [edit, setEdit] = useState({
    editInputState: '',
    isEdit: '',
  });
  const [category, setCategory] = useState('');

  const [categories, setCategories] = useState<[string, any][]>();

  const getFreshCategories = () => {
    new CompanyCategory()
      .getCategoryLists()
      .then((data) => {
        const values = Object.entries(data) || [];
        setCategories(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFreshCategories();
  }, []);

  return (
    <div>
      <div>
        {isAddOpen ? (
          <div className="flex flex-row items-center justify-center gap-3">
            <input
              placeholder="Name of job category"
              className="inputBox"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button
              className={classNames(
                'flex h-[40px] flex-row items-center justify-center rounded-md bg-green-500 px-2 text-white',
                {
                  'cursor-not-allowed opacity-50': category === '',
                }
              )}
              disabled={category === ''}
              onClick={addCategoryHandler}
            >
              Add
            </button>
            <button
              className="flex h-[40px] flex-row items-center justify-center rounded-md bg-red-500 px-2 text-white"
              onClick={() => {
                setIsAddOpen(false);
                setCategory('');
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="text-balck h-[40px] rounded-md bg-primaryYellow px-3"
            onClick={() => setIsAddOpen(true)}
          >
            Add Job Category
          </button>
        )}
      </div>
      <div className="my-5 h-[350px] overflow-auto">
        {categories?.map((category, index) => {
          return (
            <div key={index}>
              {edit.isEdit === category[0] ? (
                <div className="mb-3 flex justify-between rounded bg-yellowBg py-5 px-3 text-left">
                  <input
                    className="inputBox mr-2 w-full"
                    value={edit.editInputState}
                    placeholder="Edit Category"
                    onChange={(e) =>
                      setEdit({ ...edit, editInputState: e.target.value })
                    }
                  />

                  <div className="flex gap-2">
                    <button
                      className="rounded bg-red-500 p-2"
                      onClick={() => {
                        editToggle('', '');
                      }}
                    >
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
                    <button
                      className={classNames('rounded bg-green-500 p-2', {
                        'cursor-not-allowed opacity-50':
                          edit.editInputState === '',
                      })}
                      disabled={edit.editInputState === ''}
                      onClick={() => {
                        editCategoryHandler(category[0], edit.editInputState);
                      }}
                    >
                      <AiOutlineCheckCircle size={20} color="#fff" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-3 flex justify-between rounded bg-yellowBg py-5 px-3 text-left">
                  <p>{category[1].categoryName}</p>

                  <div className="flex gap-2">
                    <button
                      className="rounded bg-orange-500 p-2"
                      onClick={() => {
                        editToggle(category[0], category[1].categoryName);
                      }}
                    >
                      <AiOutlineEdit size={20} color="#fff" />
                    </button>
                    <button
                      className={classNames('rounded bg-red-500 p-2', {
                        'cursor-not-allowed opacity-50':
                          categories?.length <= 1,
                      })}
                      disabled={categories?.length <= 1}
                      onClick={() => deleteCategoryHandler(category[0])}
                    >
                      <AiOutlineDelete size={20} color="#fff" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // FUNCTIONS
  function addCategoryHandler() {
    const isUnique = categories?.find(
      (value) =>
        value[1].categoryName.toLocaleLowerCase() ===
        category.toLocaleLowerCase()
    );

    if (isUnique) {
      warningNotify('Category already exist');
    } else {
      new CompanyCategory(category)
        .setNewCategoryName()
        .then((res) => {
          successfulNotify(res || 'Category Added Successfully');
          setCategory('');
          getFreshCategories();
          setIsAddOpen(false);
        })
        .catch((err) => console.error(err));
    }
  }

  function deleteCategoryHandler(id: string) {
    new CompanyCategory(category)
      .deleteCategory(id)
      .then((res) => {
        successfulNotify(res || 'Category Deleted Successfully');
        getFreshCategories();
      })
      .catch((err) => console.error(err));
  }

  function editCategoryHandler(id: string, value: string) {
    const isUnique = categories?.find(
      (value) =>
        value[1].categoryName.toLocaleLowerCase() ===
        category.toLocaleLowerCase()
    );

    if (isUnique) {
      warningNotify('Category already exist');
    } else {
      new CompanyCategory(category)
        .editCategory(id, value)
        .then((res) => {
          successfulNotify(res || 'Category Edited Successfully');
          getFreshCategories();
          editToggle('', '');
        })
        .catch((err) => console.error(err));
    }
  }

  function editToggle(id: string, name: string) {
    setEdit({ editInputState: name, isEdit: id });
  }
}

export default AddJobCategoryForm;
