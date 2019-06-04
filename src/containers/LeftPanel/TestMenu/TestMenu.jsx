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
      <button id={styles.renderBtn} onClick={handleAddRender}>
        {!hasRerender ? 'Render' : 'Rerender'}
      </button>
      <button id={styles.actionBtn} onClick={handleAddAction}>
        Action
      </button>
      <button id={styles.assertionBtn} onClick={handleAddAssertion}>
        Assertion
      </button>
    </div>
  );
};

export default TestMenu;
