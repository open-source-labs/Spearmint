import React, { useState, useContext } from 'react';
import styles from './UserGuideView.module.scss';
import Instructions from './Instructions';
import { GlobalContext } from '../../context/reducers/globalReducer';

const { ipcRenderer } = require('electron');

// TO DO TUESDAY
// find way to pass test type and test/title to pass to Instructions

const UserGuideView = () => {
  // TO DO 
// conditionally change background color depending on light/dark mode
const [{ theme, testCase }, dispatchToGlobal] = useContext(GlobalContext);

  return (
    <div 
      id={styles[`userGuide${theme}`]}
      className={styles.instructions}
      >
      <div id={styles.instructionsDiv}>
        <br />
        <br />
        <p>CONDITIONALLY RENDERED VIDEO WILL GO HERE</p>
      </div>
      <br/>
      <br/>
      <Instructions
      title={testCase}
      />
    </div>
  );
}

export default UserGuideView;