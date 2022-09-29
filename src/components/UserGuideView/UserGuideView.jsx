import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { updateFile } from '../../context/actions/globalActions';
import styles from './UserGuideView.module.scss';

const { ipcRenderer } = require('electron');

const UserGuideView = () => {


  return (
    <div id={styles.userGuide}>
      <h1>User Guide</h1>
      <p>Check here for instructions and video tutorials.</p>
    </div>
  );
}

export default UserGuideView;