import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addAction, addAssertion, addRender } from '../../../context/testCaseActions';

const TestMenu = ({ dispatchToTestCase, hasRerender }) => {
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
      <button className='menu-btn' onClick={handleAddAction}>
        ACTION
      </button>
      <button className='menu-btn' onClick={handleAddAssertion}>
        ASSERTION
      </button>
      <button className='menu-btn' onClick={handleAddRender}>
        {!hasRerender ? 'RENDER' : 'RERENDER'}
      </button>
    </div>
  );
};

export default TestMenu;
