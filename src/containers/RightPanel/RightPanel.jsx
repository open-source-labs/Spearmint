import React from 'react';
import styles from './RightPanel.module.scss';
import EditorView from './EditorView/EditorView';
import BrowserView from './BrowserView/BrowserView';

const RightPanel = () => {
  return (
    <div id={styles.rightPanel}>
      <BrowserView />
      <EditorView />
    </div>
  );
};
export default RightPanel;
