import React from 'react';
import styles from '../assets/stylesheets/components/LeftPanel/LeftPanel.module.scss';
import LeftTabs from '../components/LeftPanel/LeftTabs';
import TestFile from '../components/LeftPanel/TestFile';

const LeftPanel = () => (
  <>
    <div id={styles.leftPanel}>
      <LeftTabs />
      <TestFile />
    </div>
  </>
);

export default LeftPanel;
