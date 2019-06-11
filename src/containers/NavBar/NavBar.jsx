import React, { useState, useContext } from 'react';
import styles from './NavBar.module.scss';
import { GlobalContext } from '../../context/globalReducer';
import { toggleFileDirectory, toggleRightPanel } from '../../context/globalActions';
import FileDirectory from './FileDirectory/FileDirectory';
import OpenFolder from '../LeftPanel/OpenFolder/OpenFolderButton';
import ExportFileModal from './Modals/ExportFileModal';
import BrowserModal from './Modals/BrowserModal';

const menuIcon = require('../../assets/images/menu.png');
const exportIcon = require('../../assets/images/file-export.png');
const browserIcon = require('../../assets/images/google-chrome.png');
const codeIcon = require('../../assets/images/visual-studio-code.png');

const NavBar = () => {
  const [{ fileTree, isFileDirectoryOpen, url }, dispatchToGlobal] = useContext(GlobalContext);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isBrowserModalOpen, setIsBrowserModalOpen] = useState(false);

  const handleToggleFileDirectory = () => {
    dispatchToGlobal(toggleFileDirectory());
  };

  const handleEditorToggle = () => {
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
  };

  const handleBrowserToggle = () => {
    dispatchToGlobal(toggleRightPanel('browserView'));
  };

  const openExportModal = () => {
    setIsExportModalOpen(true);
  };

  const closeExportModal = () => {
    setIsExportModalOpen(false);
  };

  // const closeBrowserModal = () => {
  //   setIsBrowserModalOpen(false);
  // };

  return (
    <div id={styles.navBar}>
      <button className={styles.navBtn} onClick={handleToggleFileDirectory}>
        <img src={menuIcon} className={styles.icons} alt='fileExplorer' />
      </button>
      <button className={styles.navBtn} onClick={openExportModal}>
        <img src={exportIcon} className={styles.icons} alt='export' title='Export a test file' />
      </button>
      <ExportFileModal isExportModalOpen={isExportModalOpen} closeExportModal={closeExportModal} />
      <OpenFolder />
      <button className={styles.navBtn} onClick={handleEditorToggle}>
        <img src={codeIcon} className={styles.icons} alt='codeview' title='Code View' />
      </button>
      <button className={styles.navBtn} onClick={handleBrowserToggle}>
        <img src={browserIcon} className={styles.icons} alt='browserview' title='Browser view' />
      </button>
      {/* <BrowserModal isBrowserModalOpen={isBrowserModalOpen} closeBrowserModal={closeBrowserModal} /> */}

      {isFileDirectoryOpen && <FileDirectory fileTree={fileTree} />}
    </div>
  );
};

export default NavBar;
