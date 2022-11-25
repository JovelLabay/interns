// REACT
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

// COMPONENTS
import CompanyMenu from '../menu/companyMenu';
import InternshipProgramsContainer from '../menuContainer/company/InternshipProgramsContainer';
import ApplicantsContainer from '../menuContainer/company/applicantsContainer';
import HomeContainer from '../menuContainer/company/homeContainer';
import InternsContainer from '../menuContainer/company/internsContainer';

import AddQuestionnaire from '../form/addQuestionnaire';

// STATIC DATA
import { data } from 'Data';

// OTHERS
import classNames from 'classnames';

// STATE MANAGEMENT
import {
  CompanyUserDetailsContext,
  DynamicContext,
} from '@/src/contexts/context';

// ICONS
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch, BiTrashAlt } from 'react-icons/bi';
import AddInternships from '../modals/addInternships';
import { FiList } from 'react-icons/fi';
import { database, store } from '@/src/firebase/firebaseConfig';
import { onValue, ref } from 'firebase/database';
import { ToastContainer } from 'react-toastify';
import { collection, onSnapshot } from 'firebase/firestore';
import SearchItem from '../common/searchItem';

const initialState = { id: 1 };

function CompanyDashboardContainer() {
  const context = useContext(DynamicContext);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [addRemoveModal, setAddRemoveModal] = useState({
    addInternship: false,
    addQuestionnaire: false,
    addSearch: false,
  });

  const [companyUserObject, setCompanyUserObject] = useState({
    companyQuestionnaire: [],
    companyCategories: [],
    companyInternships: [],
  });

  const [activeCompanyJobCategory, setActiveCompanyJobCategory] =
    useState('Unspecified');

  const currentMenu = useMemo(() => {
    document.title =
      'Interns | ' + data.companyDashboardMenu[state.id - 1].name;

    switch (state.id) {
      case 1:
        return <HomeContainer />;
      case 2:
        return <InternsContainer />;
      case 3:
        return <InternshipProgramsContainer />;
      case 4:
        return <ApplicantsContainer />;
      default:
        return null;
    }
  }, [state.id]);

  useEffect(() => {
    const db = database;

    // GET COMPANY QUESTIONNAIRES
    const postCatRef = ref(
      db,
      `companies/${localStorage.getItem('userId')}/companyQuestionnaires`
    );
    onValue(postCatRef, (snapshot) => {
      setCompanyUserObject((prev) => {
        return {
          ...prev,
          companyQuestionnaire: snapshot.val(),
        };
      });
    });

    // GET INTERNSHIP PROGRAMS
    const internshipReference = ref(db, 'school/categories');
    onValue(internshipReference, (snapshot) => {
      const data = snapshot.val() === null ? {} : snapshot.val();
      setCompanyUserObject((prev) => {
        return {
          ...prev,
          companyCategories: data,
        };
      });
    });
  }, []);

  useMemo(() => {
    const theCollegeName = activeCompanyJobCategory
      .toLowerCase()
      .replace(/\s/g, '_');

    const abort = onSnapshot(collection(store, theCollegeName), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setCompanyUserObject((prev: any) => {
        return {
          ...prev,
          companyInternships: data,
        };
      });
    });

    return () => {
      abort();
    };
  }, [activeCompanyJobCategory]);

  return (
    <CompanyUserDetailsContext.Provider
      value={{
        companyUserObject,
        setCompanyUserObject,
        activeCompanyJobCategory,
        setActiveCompanyJobCategory,
      }}
    >
      <div className="grid grid-cols-5">
        <CompanyMenu dispatch={dispatch} state={state} />
        <div className="col-span-4 h-[90vh] px-2">
          <section
            className={classNames(
              'bg-white rounded-md h-[10vh] mt-2 flex flex-row gap-10 px-3 py-3',
              {
                'bg-secondaryBgBlack': context?.isDarkMode,
              }
            )}
          >
            <button
              onClick={addModalToggle}
              className={classNames(
                'text-secondaryWhite flex flex-row items-center justify-center gap-5 font-medium',
                { 'text-teriaryWhite': context?.isDarkMode }
              )}
            >
              <AiOutlinePlus size={20} />
              Add internship programs
            </button>
            <button
              className={classNames(
                'text-secondaryWhite flex flex-row items-center justify-center gap-5 font-medium',
                { 'text-teriaryWhite': context?.isDarkMode }
              )}
            >
              <BiTrashAlt size={20} />
              Rejected Applicants
            </button>
            <button
              className={classNames(
                'text-secondaryWhite flex flex-row items-center justify-center gap-5 font-medium',
                { 'text-teriaryWhite': context?.isDarkMode }
              )}
              onClick={addModalToggle2}
            >
              <FiList size={20} />
              Initial Application Questionnaire
            </button>
            <button
              className={classNames(
                'text-secondaryWhite flex flex-row items-center justify-center font-thin gap-5 bg-mainBgWhite rounded outline-none px-5',
                { 'text-teriaryWhite bg-[#171622]': context?.isDarkMode }
              )}
              onClick={addModalToggle3}
            >
              <BiSearch size={20} />
              Search here...
            </button>
          </section>

          {/* THESE ARE THE DYNAMIC COMPONENTS FOR EACH MENU SELECTED */}
          {currentMenu}
        </div>
      </div>

      {/* MODALS */}
      <AddInternships
        addRemoveModal={addRemoveModal.addInternship}
        addModalToggle={addModalToggle}
      />

      {/* ADD QUESTION */}
      <AddQuestionnaire
        addRemoveModal={addRemoveModal.addQuestionnaire}
        addModalToggle2={addModalToggle2}
      />

      {/* SEARCH ITEM */}
      <SearchItem
        addRemoveModal={addRemoveModal.addSearch}
        addModalToggle3={addModalToggle3}
      />

      {/* TOAST */}
      <ToastContainer />
    </CompanyUserDetailsContext.Provider>
  );

  // HANDLERS
  function addModalToggle() {
    setAddRemoveModal((prev) => {
      return { ...prev, addInternship: !prev.addInternship };
    });
  }
  function addModalToggle2() {
    setAddRemoveModal((prev) => {
      return { ...prev, addQuestionnaire: !prev.addQuestionnaire };
    });
  }
  function addModalToggle3() {
    setAddRemoveModal((prev) => {
      return { ...prev, addSearch: !prev.addSearch };
    });
  }
}

function reducer(
  state: {
    id: number;
  },
  action: { type: number }
) {
  switch (action.type) {
    case 1:
      return { id: 1 };
    case 2:
      return { id: 2 };
    case 3:
      return { id: 3 };
    case 4:
      return { id: 4 };
    default:
      throw new Error();
  }
}

export default CompanyDashboardContainer;
