import React from 'react';
import styles from './LeftPanel.module.scss';
import TestFile from '../TestFile/TestFile';

const LeftPanel = () => (
  <>
    <div id={styles.leftPanel}>
      <TestFile />
    </div>
  </>
);

export default LeftPanel;
