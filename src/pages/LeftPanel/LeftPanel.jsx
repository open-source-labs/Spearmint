import React, { useContext } from 'react'
import styles from './LeftPanel.module.scss';
import TestFile from '../TestFile/TestFile';
import { GlobalContext } from '../../context/reducers/globalReducer';

const LeftPanel = ({accTestType, handleAccChange}) => {

  const [{ theme }] = useContext(
    GlobalContext
  );

  return (
    <div id={styles[`leftPanel${theme}`]}>
      <TestFile 
        accTestType={accTestType}
        handleAccChange={handleAccChange}
      />    
    </div>
  );

};

export default LeftPanel;
