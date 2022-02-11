import React, { useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HelpIcon from '@material-ui/icons/Help';
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
import { GlobalContext } from '../../context/reducers/globalReducer';

const TestMenuButtons = ({
  openModal,
  fileHandle,
  openScriptModal,
  saveTest,
  openDocs
}) => {

  const [{ theme }] = useContext(GlobalContext);

  return (
    <div id={styles[`testMenu${theme}`]}>
      <IconButton 
        variant="outlined" 
        onClick={openModal}
        title="Open New Test"
      >
        <CachedIcon fontSize="large"/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={fileHandle}
        title="Preview File"
      >
        <VisibilityIcon fontSize="large"/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={openScriptModal}
        title="Run File"
      >
        <PlayArrowIcon fontSize="large"/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={saveTest}
        title="Save File"
      >
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