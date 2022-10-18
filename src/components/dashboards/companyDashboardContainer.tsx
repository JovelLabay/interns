// REACT
import React, { useContext, useMemo, useReducer, useState } from 'react';

// COMPONENTS
import CompanyMenu from '../menu/companyMenu';
import ApplicantsContainer from '../menuContainer/company/applicantsContainer';
import HomeContainer from '../menuContainer/company/homeContainer';
import InternsContainer from '../menuContainer/company/internsContainer';
import StudentsContainer from '../menuContainer/company/studentsContainer';
import AddQuestionnaire from '../form/addQuestionnaire';

// STATIC DATA
import { data } from 'Data';

// OTHERS
import classNames from 'classnames';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// ICONS
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import AddInternships from '../modals/addInternships';
import { FiList } from 'react-icons/fi';

const initialState = { id: 1 };

function CompanyDashboardContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [addRemoveModal, setAddRemoveModal] = useState({
    addInternship: false,
    addQuestionnaire: false,
  });

  const context = useContext(DynamicContext);

  const currentMenu = useMemo(() => {
    document.title =
      'Interns | ' + data.companyDashboardMenu[state.id - 1].name;

    switch (state.id) {
      case 1:
        return <HomeContainer />;
      case 2:
        return <InternsContainer />;
      case 3:
        return <StudentsContainer />;
      case 4:
        return <ApplicantsContainer />;
      case 5:
        return <InternsContainer />;
      default:
        return null;
    }
  }, [state.id]);

  return (
    <>
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
    </>
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
    case 5:
      return { id: 5 };
    default:
      throw new Error();
  }
}

export default CompanyDashboardContainer;
