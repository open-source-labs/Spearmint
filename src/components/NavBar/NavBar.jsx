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
  toggleTheme,
} from '../../context/actions/globalActions';
import OpenFolder from '../OpenFolder/OpenFolderButton';
import ExportFileModal from '../Modals/ExportFileModal';

import { VscSettingsGear } from 'react-icons/vsc'
import { FaFileExport, FaUserCircle } from 'react-icons/fa'
import { GoFileSubmodule } from 'react-icons/go'
import { Switch } from '@material-ui/core';

const NavBar = ({ inAboutPage }) => {
  const [{ fileTree, isFileDirectoryOpen, theme }, dispatchToGlobal] =
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

  const changeTheme = () => {
    localStorage.setItem("theme", theme === 'light' ? 'dark' : 'light');
    dispatchToGlobal(toggleTheme());
  };

  /*
   * renders: buttons + icons for navbar, exportFileModal, boxes to open new folder and enter url, file directory
   */
  return (
    <div id={styles[`navBar${theme}`]}>
      {/* File Explorer */}
      <div className={styles.btnContainer}>
        <span id={isFileDirectoryOpen ? styles.activeEffect : ''} onClick={handleToggleFileDirectory} title='Expand file explorer'>
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
        <span title='Change theme'>
          <Switch checked={theme === 'light' ? true : false} onChange={changeTheme}/>
        </span>
      </div>
      {!inAboutPage && (
        <ExportFileModal
          isExportModalOpen={isExportModalOpen}
          setIsExportModalOpen={setIsExportModalOpen}
        />
      )}
    </div>
  );
};

export default NavBar;
