import React, { useState, useContext } from 'react';
import styles from './NavBar.module.scss';
import { GlobalContext } from '../../context/globalReducer';
import { toggleFileDirectory } from '../../context/globalActions';
import FileDirectory from './FileDirectory/FileDirectory';
import ExportFileModal from './Modals/ExportFileModal';
import BrowserModal from './Modals/BrowserModal';

const menuIcon = require('../../assets/images/menu.png');
const exportIcon = require('../../assets/images/file-export.png');
const folderOpenIcon = require('../../assets/images/folder-open.png');
const saveIcon = require('../../assets/images/content-save-outline.png');
const codeIcon = require('../../assets/images/google-chrome.png');

const NavBar = () => {
  const [{ fileTree, isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrowserModalOpen, setIsBrowserModalOpen] = useState(false);

  const handleToggleFileDirectory = () => {
    dispatchToGlobal(toggleFileDirectory());
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const browserModalOpen = () => {
    // console.log('object')
    setIsBrowserModalOpen(true);
  };
  // console.log('browser', isBrowserModalOpen);
  const closeBrowserModal = () => {
    setIsBrowserModalOpen(false);
  };

  return (
    <div id={styles.navBar}>
      <button className={styles.navBtn} onClick={handleToggleFileDirectory}>
        <img src={menuIcon} className={styles.icons} alt='fileExplorer' />
      </button>
      <button className={styles.navBtn} onClick={openModal}>
        <img src={exportIcon} className={styles.icons} alt='export' title='export a test file' />
      </button>

      <ExportFileModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <button className={styles.navBtn}>
        <img
          src={folderOpenIcon}
          className={styles.icons}
          alt='folderOpen'
          title='open a new folder'
        />
      </button>
      <button className={styles.navBtn}>
        <img src={saveIcon} className={styles.icons} alt='save' title='save the file' />
      </button>
      <button className={styles.navBtn} onClick={browserModalOpen}>
        <img src={codeIcon} className={styles.icons} alt='browserview' title='browser view' />
      </button>
      <BrowserModal isBrowserModalOpen={isBrowserModalOpen} closeBrowserModal={closeBrowserModal} />

      {isFileDirectoryOpen && <FileDirectory fileTree={fileTree} />}
    </div>
  );
};

export default NavBar;
