import React, { useContext } from 'react';
import styles from './RightPanel.module.scss';
import EditorView from '../../components/EditorView/EditorView';
import BrowserView from '../../components/BrowserView/BrowserView';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { closeRightPanel } from '../../context/actions/globalActions';
const closeIcon = require('../../assets/images/close.png');

const RightPanel = () => {
  const [{ rightPanelDisplay, url }, dispatchToGlobal] = useContext(GlobalContext);
  
  const handleCloseRightPanelView = () => {
    dispatchToGlobal(closeRightPanel());
  };
  
  return (
    <div id={styles.rightPanel}>
      <img
        src={closeIcon}
        id={styles.close}
        alt='close'
        onClick={handleCloseRightPanelView}
      />

      {url && rightPanelDisplay === 'browserView' ? <BrowserView /> : <></>}
      {!url || rightPanelDisplay === 'codeEditorView' ? <EditorView /> : <></>}
    </div>
  );
};
export default RightPanel;
