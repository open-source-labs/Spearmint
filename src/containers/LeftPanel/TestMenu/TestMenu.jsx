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
      <button id={styles.renderBtn} onClick={handleAddAction}>
        Action
      </button>
      <button id={styles.actionBtn} onClick={handleAddAssertion}>
        Assertion
      </button>
      <button id={styles.assertionBtn} onClick={handleAddRender}>
        Rerender
      </button>
    </div>
  );
};

export default TestMenu;
