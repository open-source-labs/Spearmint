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
    <header>
      <div id={styles.testMenu}>
        <button id={styles.actionBtn} onClick={handleAddAction}>
          ACTION
        </button>
        <button id={styles.assertionBtn} onClick={handleAddAssertion}>
          ASSERTION
        </button>
        <button id={styles.renderBtn} onClick={handleAddRender}>
          RERENDER
        </button>
      </div>
    </header>
  );
};

export default TestMenu;
