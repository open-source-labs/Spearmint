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
      <button className='menu-btn' onClick={handleAddAction}>
        ACTION
      </button>
      <button className='menu-btn' onClick={handleAddAssertion}>
        ASSERTION
      </button>
      <button className='menu-btn' onClick={handleAddRender}>
        {!reRender ? 'RENDER' : 'RERENDER'}
      </button>
    </div>
    //</div>
  );
};

export default TestMenu;
