import React from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HelpIcon from '@material-ui/icons/Help';
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';

const TestMenuButtons = ({
  openModal,
  fileHandle,
  openScriptModal,
  saveTest,
  openDocs
}) => {
  return (
    <div id={styles.testMenu}>
      <IconButton 
        variant="outlined" 
        onClick={openModal}
        title="Open New Test"
      >
        {/* <span>New Test</span> */}
        <CachedIcon fontSize="large"/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={fileHandle}
        title="Preview File"
      >
        {/* <span>Preview</span> */}
        <VisibilityIcon fontSize="large"/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={openScriptModal}
        title="Run File"
      >
        {/* <span>Run</span> */}
        <PlayArrowIcon fontSize="large"/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={saveTest}
        title="Save File"
      >
        {/* <span>Save</span> */}
        <SaveIcon fontSize="large"/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={openDocs}
        title="Need Help?"
      >
        <HelpIcon fontSize="large"/>
      </IconButton>
    </div>
  );
};

export default TestMenuButtons;