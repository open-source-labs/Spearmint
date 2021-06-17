/**
 * nav pannel
 * to export files, switch views, or open a new folder
 */

import React, { useState, useContext } from 'react';
import styles from './NavBar.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  toggleFileDirectory,
  toggleExportBool,
} from '../../context/actions/globalActions';
import FileDirectory from '../FileDirectory/FileDirectory';
import OpenFolder from '../OpenFolder/OpenFolderButton';
import ExportFileModal from '../Modals/ExportFileModal';

const menuIcon = require('../../assets/images/menu.png');
const exportIcon = require('../../assets/images/file-export.png');

const NavBar = ({ inAboutPage }) => {
  const [{ fileTree, isFileDirectoryOpen }, dispatchToGlobal] =
    useContext(GlobalContext);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  /* opens/closes the filedirectory */
  const handleToggleFileDirectory = () => {
    dispatchToGlobal(toggleFileDirectory());
  };

  /* exports the file (when true) */
  const openExportModal = () => {
    dispatchToGlobal(toggleExportBool());
    setIsExportModalOpen(true);
  };
  /*
   * renders: buttons + icons for navbar, exportFileModal, boxes to open new folder and enter url, file directory
   */
  return (
    <div id={inAboutPage ? styles.inAboutPage : styles.navBar}>
      {/* File Explorer */}
      <button className={styles.navBtn} onClick={handleToggleFileDirectory}>
        <img src={menuIcon} className={styles.icons} alt='fileExplorer' />
        <span className={styles.tooltip}>Expand File Explorer</span>
      </button>
      {/* Export */}
      <button className={styles.navBtn} onClick={openExportModal}>
        <img src={exportIcon} className={styles.icons} alt='export' title='Export a test file' />
        <span className={styles.tooltip}>Export</span>
      </button>
      {!inAboutPage && (
        <ExportFileModal
          isExportModalOpen={isExportModalOpen}
          setIsExportModalOpen={setIsExportModalOpen}
        />
      )}
      {/* Open Folder */}
      <OpenFolder />
      {isFileDirectoryOpen && <FileDirectory fileTree={fileTree} />}
    </div>
  );
};

export default NavBar;
