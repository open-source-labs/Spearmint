import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addAction, addAssertion, addRender } from '../../../context/testCaseActions';

const TestMenu = ({ dispatchToTestCase }) => {
  const handleAddAction = e => {
    dispatchToTestCase(addAction());
  };
  const handleAddAssertion = e => {
    dispatchToTestCase(addAssertion());
  };
  const handleAddRender = e => {
    dispatchToTestCase(addRender());
  };

  return (
    <div id={styles.testMenu}>
<<<<<<< HEAD
      <button className='menu-btn' onClick={handleAddAction}>
        Action
      </button>
      <button className='menu-btn' onClick={handleAddAssertion}>
        Assertion
      </button>
      <button className='menu-btn' onClick={handleAddRender}>
        Rerender
=======
      <button id={styles.renderBtn} onClick={handleAddRender}>
        {!hasRerender ? 'Render' : 'Rerender'}
      </button>
      <button id={styles.actionBtn} onClick={handleAddAction}>
        Action
      </button>
      <button id={styles.assertionBtn} onClick={handleAddAssertion}>
        Assertion
>>>>>>> 7ba564ca16687835b1be1d961d0b52ac46ad8e4f
      </button>
    </div>
  );
};

export default TestMenu;
