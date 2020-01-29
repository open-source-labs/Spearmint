/**
 * the test nav bar at the top of the screen 
 */

import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addAction, addAssertion, addRender, addMiddleware } from '../../../context/testCaseActions';
import NewTestModal from '../../NavBar/Modals/NewTestModal';
import ReduxTestModal from '../../NavBar/Modals/ReduxTestModal';

const TestMenu = ({ dispatchToTestCase, dispatchToMockData, dispatchToReduxTestCase }) => {
  /* making new state for this componenet, naming it isMOdalOpen, making method for it called setIsModalOpen, setting initial state to false */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* create new state for redux? */
  //const [isReduxModalOpen, setIsReduxModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  // const openReduxModal = () => {
  //   setIsReduxModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const closeReduxModal = () => {
  //   setIsReduxModalOpen(false);
  // };

  const handleAddAction = e => {
    dispatchToTestCase(addAction());
  };
  const handleAddAssertion = e => {
    dispatchToTestCase(addAssertion());
  };
  const handleAddRender = e => {
    dispatchToTestCase(addRender());
  };
  // const handleAddMiddleware = e => {
  //   dispatchToTestCase(addMiddleware());
  // };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal}>New Test +</button>
          <NewTestModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchToMockData={dispatchToMockData}
            dispatchToTestCase={dispatchToTestCase}
          />

          {/* <button onClick={openReduxModal}>New Redux Test +</button>
          <ReduxTestModal
            isReduxModalOpen={isReduxModalOpen}
            closeReduxModal={closeReduxModal}
            //dispatchToMockData={dispatchToMockData}
            dispatchToReduxTestCase={dispatchToReduxTestCase}
          /> */}

        </div>
        <div id={styles.right}>
          <button onClick={handleAddAction}>Action</button>
          {/* <button onClick={handleAddMiddleware}>Middleware</button> */}
          <button data-testid='assertionButton' onClick={handleAddAssertion}>
            Assertion
          </button>
          <button data-testid='rerenderButton' onClick={handleAddRender}>
            Rerender
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestMenu;
