import React, { useContext } from 'react';
import styles from './RightPanel.module.scss';
import EditorView from './EditorView/EditorView';
import BrowserView from './BrowserView/BrowserView';
import { GlobalContext } from '../../context/globalReducer';

const RightPanel = () => {
  const [{ rightPanelDisplay, url }, _] = useContext(GlobalContext);

  return (
    <div id={styles.rightPanel}>
      {url && rightPanelDisplay === 'browserView' ? <BrowserView /> : <></>}
      {!url || rightPanelDisplay === 'codeEditorView' ? <EditorView /> : <></>}
    </div>
  );
};
export default RightPanel;
