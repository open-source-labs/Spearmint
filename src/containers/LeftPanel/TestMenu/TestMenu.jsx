import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addAction, addAssertion, addRender } from '../../../context/testCaseActions';

const TestMenu = ({ dispatchToTestCase }) => {
  const [reRender, setReRender] = useState(false);

  const handleAddAction = e => {
    dispatchToTestCase(addAction());
  };
  const handleAddAssertion = e => {
    dispatchToTestCase(addAssertion());
  };
  const handleAddRender = e => {
    dispatchToTestCase(addRender());
    if (!reRender) setReRender(true);
  };

  return (
    // <div className='flex-container'>
    // <div id='left-menu'>
    //   <button className='menu-btn'>New Test</button>
    // </div>
    <div id={styles.testMenu}>
      <button id={styles.renderBtn} onClick={handleAddRender}>
        {!reRender ? 'Render' : 'Rerender'}
      </button>
      <button id={styles.actionBtn} onClick={handleAddAction}>
        Action
      </button>
      <button id={styles.assertionBtn} onClick={handleAddAssertion}>
        Assertion
      </button>
    </div>
    //</div>
  );
};

export default TestMenu;
