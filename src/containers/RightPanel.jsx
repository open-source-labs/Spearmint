import React from 'react';
import styles from '../assets/stylesheets/components/RightPanel/RightPanel.module.scss';
import EditorView from '../components/RightPanel/EditorView';
import BrowserView from '../components/RightPanel/BrowserView';

const RightPanel = () => {
  return (
    <div id={styles.rightPanel}>
      <BrowserView />
      <EditorView />
    </div>
  );
};
export default RightPanel;
