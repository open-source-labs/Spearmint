import React from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { IconButton } from '@material-ui/core';
import { AiFillFileAdd } from 'react-icons/ai'
import { BsFileEarmarkPlayFill } from 'react-icons/bs'
import { IoSave } from 'react-icons/io5';
import { MdOutlineHelp, MdPreview } from 'react-icons/md';

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
        title="New Test"
      >
        {/* <span>New Test</span> */}
        <AiFillFileAdd size={'1.25rem'}/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={fileHandle}
        title="Preview"
      >
        {/* <span>Preview</span> */}
        <MdPreview size={'1.25rem'}/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={openScriptModal}
        title="Run"
      >
        {/* <span>Run</span> */}
        <BsFileEarmarkPlayFill size={'1.25rem'}/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={saveTest}
        title="Save"
      >
        {/* <span>Save</span> */}
        <IoSave size={'1.25rem'}/>
      </IconButton>
      <IconButton 
        variant="outlined" 
        onClick={openDocs}
        title="Help"
      >
        {/* <span>Help</span> */}
        <MdOutlineHelp size={'1.25rem'}/>
      </IconButton>
    </div>
  );
};

export default TestMenuButtons;