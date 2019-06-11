import React, { useContext } from 'react';
import styles from './RightPanel.module.scss';
import EditorView from './EditorView/EditorView';
import BrowserView from './BrowserView/BrowserView';
import { GlobalContext } from '../../context/globalReducer';

const RightPanel = () => {
  const [{ rightPanelDisplay }, _] = useContext(GlobalContext);

  return (
    <div id={styles.rightPanel}>
      {rightPanelDisplay === 'browserView' && <BrowserView />}
      {rightPanelDisplay === 'codeEditorView' && <EditorView />}
    </div>
  );
};
export default RightPanel;
