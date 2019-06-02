import React, { useState, useContext } from 'react';
import styles from './NavBar.module.scss';
import { GlobalContext } from '../../context/globalReducer';
import { toggleBrowser, toggleFileDirectory } from '../../context/globalActions';
import FileDirectory from './FileDirectory/FileDirectory';
import ExportFileModal from './ExportFileModal/ExportFileModal';

const leftIcon = require('../../assets/images/chevron-left.png');
const exportIcon = require('../../assets/images/file-export.png');
const folderOpenIcon = require('../../assets/images/folder-open.png');
const saveIcon = require('../../assets/images/save.png');
const codeIcon = require('../../assets/images/code.png');

const NavBar = () => {
  const [{ fileTree, isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleFileDirectory = () => {
    dispatchToGlobal(toggleFileDirectory());
  };

  const handleBrowserToggle = () => {
    dispatchToGlobal(toggleBrowser());
  };

  const openModal = () => {
    setIsModalOpen(!false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const button = {
    padding: '0',
    border: '0',
    margin: '1.6rem 0',
    width: '1.6rem',
    height: '1.6rem',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    outline: 'none',
  };

  const icons = {
    height: '1.25rem',
    width: '1.25rem',
  };

  return (
    <div id={styles.navBar}>
      <button style={button} onClick={handleToggleFileDirectory}>
        <img src={leftIcon} style={icons} alt='fileExplorer' />{' '}
      </button>
      <button style={button} onClick={openModal}>
        <img src={exportIcon} style={icons} alt='export' />
      </button>

      <ExportFileModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <button style={button}>
        <img src={folderOpenIcon} style={icons} alt='folderOpen' />
      </button>
      <button style={button}>
        <img src={saveIcon} style={icons} alt='save' />
      </button>
      <button style={button} onClick={handleBrowserToggle}>
        <img src={codeIcon} style={icons} alt='delete' />
      </button>

      {isFileDirectoryOpen && <FileDirectory fileTree={fileTree} />}
    </div>
  );
};

export default NavBar;
