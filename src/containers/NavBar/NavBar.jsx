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

  return (
    <div id={styles.navBar}>
      <button class={styles.navBtn} onClick={explorerOpen}>
        <img src={leftIcon} class={styles.icons} alt='fileExplorer' />
      </button>
      <button class={styles.navBtn} onClick={openModal}>
        <img src={exportIcon} class={styles.icons} alt='export' title='export a test file' />
      </button>

      <ExportFileModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <button class={styles.navBtn}>
        <img src={folderOpenIcon} class={styles.icons} alt='folderOpen' title='open a new folder' />
      </button>
      <button class={styles.navBtn}>
        <img src={saveIcon} class={styles.icons} alt='save' title='save the file' />
      </button>
      <button class={styles.navBtn} onClick={toggleClick}>
        <img src={codeIcon} class={styles.icons} alt='browserview' title='browser view' />
      </button>
      {!isOpen && <FileDirectory fileTree={fileTree} />}
    </div>
  );
};

export default NavBar;
