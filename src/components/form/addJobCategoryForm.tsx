import React, { useEffect, useState } from 'react';

// FIREBASE FUNCTIONS
import { CompanyCategory } from '@/src/functions/firebaseDatabase';
import { successfulNotify } from '../common/toast';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

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
              className="bg-green-500 rounded-md h-[40px] flex flex-row items-center justify-center px-2 text-white"
              onClick={addCategoryHandler}
            >
              Add
            </button>
            <button
              className="bg-red-500 rounded-md h-[40px] flex flex-row items-center justify-center px-2 text-white"
              onClick={() => setIsAddOpen(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-primaryYellow rounded-md h-[40px] px-3 text-balck"
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
                <div className="flex justify-between rounded bg-yellowBg py-5 px-3 text-left mb-3">
                  <input
                    className="inputBox w-full mr-2"
                    value={edit.editInputState}
                    placeholder="Edit Category"
                    onChange={(e) =>
                      setEdit({ ...edit, editInputState: e.target.value })
                    }
                  />

                  <div className="flex gap-2">
                    <button
                      className="bg-red-500 p-2 rounded"
                      onClick={() => {
                        editToggle('', '');
                      }}
                    >
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
                    <button
                      className="bg-green-500 p-2 rounded"
                      onClick={() => {
                        editCategoryHandler(category[0], edit.editInputState);
                      }}
                    >
                      <AiOutlineCheckCircle size={20} color="#fff" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between rounded bg-yellowBg py-5 px-3 text-left mb-3">
                  <p>{category[1].categoryName}</p>

                  <div className="flex gap-2">
                    <button
                      className="bg-orange-500 p-2 rounded"
                      onClick={() => {
                        editToggle(category[0], category[1].categoryName);
                      }}
                    >
                      <AiOutlineEdit size={20} color="#fff" />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded"
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
      successfulNotify('Category already exist');
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
      successfulNotify('Category already exist');
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
