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
import OpenFolder from '../OpenFolder/OpenFolderButton';
import ExportFileModal from '../Modals/ExportFileModal';

import { VscSettingsGear } from 'react-icons/vsc'
import { FaFileExport, FaUserCircle } from 'react-icons/fa'
import { GoFileSubmodule } from 'react-icons/go'

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
    <div id={styles.navBar}>
      {/* File Explorer */}
      <div className={styles.btnContainer}>
        <span id={isFileDirectoryOpen && styles.activeEffect} onClick={handleToggleFileDirectory} title='Expand file explorer'>
          <GoFileSubmodule size={'1.5rem'}/>
        </span>
        <span onClick={openExportModal} title='Export test file'>
          <FaFileExport size={'1.5rem'}/>
        </span>
        <OpenFolder />
      </div>
      <div id={styles.spearmintTitle}>
        spearmint
      </div>
      <div className={styles.btnContainer}>
        <span title='Change user profile'>
          <FaUserCircle size={'1.5rem'}/>
        </span>
        <span title='Change settings'>
          <VscSettingsGear size={'1.5rem'}/>
        </span>
      </div>
      {/* <button className={styles.navBtn} onClick={handleToggleFileDirectory}>
        <img src={menuIcon} className={styles.icons} alt='fileExplorer'title='Expand file explorer' />
      </button>
      <button className={styles.navBtn} onClick={openExportModal}>
        <img src={exportIcon} className={styles.icons} alt='export' title='Export a test file' />
      </button> */}
      {!inAboutPage && (
        <ExportFileModal
          isExportModalOpen={isExportModalOpen}
          setIsExportModalOpen={setIsExportModalOpen}
        />
      )}
      {/* {isFileDirectoryOpen && <FileDirectory fileTree={fileTree} />} */}
    </div>
  );
};

export default NavBar;
