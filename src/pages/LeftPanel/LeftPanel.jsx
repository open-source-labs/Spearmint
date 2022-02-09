import React, { useContext } from 'react'
import styles from './LeftPanel.module.scss';
import TestFile from '../TestFile/TestFile';
import { GlobalContext } from '../../context/reducers/globalReducer';

const LeftPanel = () => {

  const [{ theme }] = useContext(
    GlobalContext
  );

  return (
    <div id={styles[`leftPanel${theme}`]}>
      <TestFile />    
    </div>
  );

};

export default LeftPanel;
