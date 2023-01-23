import React, { useContext } from 'react';
import styles from './UserGuideView.module.scss';
import Instructions from './Instructions';
import { GlobalContext } from '../../context/reducers/globalReducer';

// const { ipcRenderer } = require('electron');

const UserGuideView = ({theme, accTestType}) => {
const [{ testCase }] = useContext(GlobalContext);

  return (
    <div 
      id={styles[`userGuide${theme}`]}
      className={styles.instructions}
      >
      <div id={styles.instructionsDiv}>
      </div>
      <br/>
      <Instructions
        title={testCase}
        accTestType={accTestType}
      />
    </div>
  );
} 


export default UserGuideView;