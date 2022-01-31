import React, { useContext, useState } from 'react';
import styles from './RightPanel.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditorView from './../../components/EditorView/EditorView';
import BrowserView from './../../components/BrowserView/BrowserView';
import { GlobalContext } from './../../context/reducers/globalReducer';
import { closeRightPanel, setTabIndex } from './../../context/actions/globalActions';
import TerminalView from './../../components/Terminal/TerminalView';

const RightPanel = () => {
  const [{ rightPanelDisplay, url, tabIndex }, dispatchToGlobal] = useContext(GlobalContext);

  return (
    <div id={styles.rightPanel}>
      <div id={styles.tabsContainer}>
        <Tabs 
          id={styles.tabsBox}
          value={tabIndex} 
          onChange={(event, newValue) => dispatchToGlobal(setTabIndex(newValue))} 
          centered
        >
          <Tab value={0} label="Code Editor" />
          <Tab value={1} label="Browser" />
          <Tab value={2} label="Test Terminal" />
        </Tabs>
      </div>

      <div className={styles.viewContainer} hidden={tabIndex !== 0}>
        <EditorView />
      </div>
      <div className={styles.viewContainer} hidden={tabIndex !== 1}>
        <BrowserView />
      </div>
      <div className={styles.viewContainer} hidden={tabIndex !== 2} >
        <TerminalView />
      </div>
    </div>
  );
};
export default RightPanel;
