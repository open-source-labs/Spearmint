import React, { useState, useContext } from 'react';
import styles from './NavBar.module.scss';
import FileDirectory from './FileDirectory/FileDirectory';
import ExportFileModal from './ExportFileModal/ExportFileModal';
import { FileTreeContext, ToggleContext, FileToggleContext } from '../../App';

const closeIcon = require('../../assets/images/close.png');
const leftIcon = require('../../assets/images/sq_br_first_icon.png');
const rightIcon = require('../../assets/images/sq_br_last_icon.png');
const exportIcon = require('../../assets/images/export.png');
const folderOpenIcon = require('../../assets/images/folder_open.png');
const saveIcon = require('../../assets/images/save_icon.png');
const codeIcon = require('../../assets/images/app_window_shell.png');

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggled, setToggled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileTree = useContext(FileTreeContext);
  const setToggleView = useContext(ToggleContext);
  const fileToggle = useContext(FileToggleContext);

  const explorerOpen = () => {
    setIsOpen(!isOpen);
    isOpen ? fileToggle(false) : fileToggle(true);
  };

  const toggleClick = () => {
    toggled ? setToggleView(true) : setToggleView(false);
    setToggled(false);
    if (!toggled) setToggled(true);
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
      <button style={button} onClick={explorerOpen}>
        <img src={leftIcon} style={icons} alt='fileExplorer' />{' '}
      </button>
      <button style={button} onClick={openModal}>
        <img src={exportIcon} style={icons} alt='export' title='export a test file' />
      </button>

      <ExportFileModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <button style={button}>
        <img src={folderOpenIcon} style={icons} alt='folderOpen' title='open a new folder' />
      </button>
      <button style={button}>
        <img src={saveIcon} style={icons} alt='save' title='save the file' />
      </button>
      <button style={button} onClick={toggleClick}>
        <img src={codeIcon} style={icons} alt='browserview' title='browser view' />
      </button>

      {!isOpen && <FileDirectory fileTree={fileTree} />}
    </div>
  );
};

export default NavBar;
