import React, { useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import CachedIcon from '@mui/icons-material/Cached';
import { GlobalContext } from '../../context/reducers/globalReducer';

const TestMenuButtons = ({
  resetTests,
  fileHandle,
  openScriptModal,
  saveTest,
  openDocs
}) => {

  const [{ theme }] = useContext(GlobalContext);

  return (
    <div id={styles[`testMenu${theme}`]}>
      <IconButton variant="outlined" onClick={resetTests} title="New Test" size="large">
        <CachedIcon fontSize="large"/>
      </IconButton>
      <IconButton variant="outlined" onClick={fileHandle} title="Preview File" size="large">
        <VisibilityIcon fontSize="large"/>
      </IconButton>
      <IconButton
        variant="outlined"
        onClick={openScriptModal}
        title="Run File"
        size="large">
        <PlayArrowIcon fontSize="large"/>
      </IconButton>
      <IconButton variant="outlined" onClick={saveTest} title="Save File" size="large">
        <SaveIcon fontSize="large"/>
      </IconButton>
      <IconButton variant="outlined" onClick={openDocs} title="Need Help?" size="large">
        <HelpIcon fontSize="large"/>
      </IconButton>
    </div>
  );
};

export default TestMenuButtons;