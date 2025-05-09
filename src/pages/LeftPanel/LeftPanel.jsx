import React, { useContext } from 'react'
import styles from './LeftPanel.module.scss';
import TestFile from '../TestFile/TestFile';
import { GlobalContext } from '../../context/reducers/globalReducer';

/**
 * Renders the LeftPanel react component. 
 * 
 * This component consists of main page to choose a test along with the individual testing component that you selected.
 * @returns { JSX.Element } Returns the LeftPanel react component
 */
const LeftPanel = () => {
//! Testing test Framework context
  const [{ theme }] = useContext(
    GlobalContext
  );
  return (
    <div id={styles[`leftPanel${theme}`]}>
      <TestFile/>    
    </div>
  );

};

export default LeftPanel;
