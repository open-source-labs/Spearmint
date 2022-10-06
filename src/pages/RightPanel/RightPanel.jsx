import React, { useContext, useState } from 'react';
import styles from './RightPanel.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditorView from './../../components/EditorView/EditorView';
import BrowserView from './../../components/BrowserView/BrowserView';
import UserGuideView from './../../components/UserGuideView/UserGuideView';
import { GlobalContext } from './../../context/reducers/globalReducer';
import { closeRightPanel, setTabIndex } from './../../context/actions/globalActions';
import TerminalView from './../../components/Terminal/TerminalView';
import { withStyles } from '@material-ui/core/styles';

const StyledTabs = withStyles({
  root:{
    backgroundColor:'#8f54a0',
    borderRadius:'4px',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#24A19C',
    '& > span': {
      maxWidth: 40,
      width: '100%',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab {...props} />);

const RightPanel = () => {
  const [{ rightPanelDisplay, url, tabIndex, theme }, dispatchToGlobal] = useContext(GlobalContext);
  return (
    <div id={styles[`rightPanel${theme}`]}>
      <div id={styles.tabsContainer}>
        <StyledTabs 
          id={styles.tabsBox}
          value={tabIndex} 
          onChange={(event, newValue) => dispatchToGlobal(setTabIndex(newValue))} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <StyledTab  value={0} label="Code Editor" style={{ minWidth:'24%' }}/>
          <StyledTab  value={1} label="Browser" style={{ minWidth:'24%' }}/>
          <StyledTab  value={2} label="Test Terminal" style={{ minWidth:'24%' }}/>
          <StyledTab  value={3} label='User Guide' style={{ minWidth:'24%' }}/>
        </StyledTabs>
      </div>

      <div className={styles.viewContainer} hidden={tabIndex !== 0}>
        <EditorView />
      </div>
      <div className={styles.viewContainer} hidden={tabIndex !== 1}>
        <BrowserView />
      </div>
      <div className={styles.viewContainer} hidden={tabIndex !== 2}>
        <TerminalView />
      </div>
      <div className={styles.viewContainer} hidden={tabIndex !== 3}>
        <UserGuideView />
      </div>
    </div>
  );
};
export default RightPanel;
