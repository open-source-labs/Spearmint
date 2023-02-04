import React, { useContext } from 'react';
import styles from './UserGuideView.module.scss';
import Instructions from './Instructions';
import { GlobalContext } from '../../context/reducers/globalReducer';

// const { ipcRenderer } = require('electron');
/**
 *
 * @param {  } theme
 * @returns { JSX.Element } renders the UserGuide component
 */
const UserGuideView = ({ theme }: { theme: string }): JSX.Element => {
  const [{ testCase }] = useContext(GlobalContext);
  return (
    <div id={styles[`userGuide${theme}`]} className={styles.instructions}>
      <div id={styles.instructionsDiv}></div>
      <br />
      <Instructions title={testCase} />
    </div>
  );
};

export default UserGuideView;
