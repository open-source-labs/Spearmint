/**
 * the test nav bar at the top of the screen 
 */

import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addAction, addAssertion, addRender, addMiddleware } from '../../../context/testCaseActions';
import NewTestModal from '../../NavBar/Modals/NewTestModal';

const TestMenu = ({ dispatchToTestCase, dispatchToMockData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAction = e => {
    dispatchToTestCase(addAction());
  };
  const handleAddAssertion = e => {
    dispatchToTestCase(addAssertion());
  };
  const handleAddRender = e => {
    dispatchToTestCase(addRender());
  };
  const handleAddMiddleware = e => {
    dispatchToTestCase(addMiddleware());
  };

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
        </div>
        <div id={styles.right}>
          <button onClick={handleAddAction}>Action</button>
          <button onClick={handleAddMiddleware}>Middleware</button>
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
