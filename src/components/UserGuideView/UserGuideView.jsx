import React, { useState, useContext } from 'react';
import styles from './UserGuideView.module.scss';
import Instructions from './Instructions';

const { ipcRenderer } = require('electron');

const UserGuideView = () => {
// which props or hooks need to be passed in, in order to :
  // set state with mode (dark, light)
  // style view panel
  // successfully run terminal scripts, change directories, and install dependencies
// also look into: the conditional rendering in Instructions.jsx (are they all necessary?)
// is there a way to make the Instructions.jsx file more DRY?
// when I'm on the set root directory accordion, it boots me out, why?
  return (
    <div id={styles.userGuide}>
      <h1>User Guide</h1>
      <p>Check here for instructions and video tutorials.</p>
      <br/>
      <br/>
      <Instructions/>
    </div>
  );
}

export default UserGuideView;