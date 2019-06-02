import React, { useState, useContext } from 'react';
import styles from '../assets/stylesheets/components/NavBar/NavBar.module.scss';
import FileDirectory from '../components/NavBar/FileDirectory';
import ExportFileModal from '../components/NavBar/ExportFileModal';
import { FileTreeContext, ToggleContext, FileToggleContext } from '../App';

const closeIcon = require('../assets/images/close-outline.png');
const leftIcon = require('../assets/images/chevron-left.png');
const rightIcon = require('../assets/images/chevron-right.png');
const exportIcon = require('../assets/images/file-export.png');
const folderOpenIcon = require('../assets/images/folder-open.png');
const saveIcon = require('../assets/images/save.png');
const codeIcon = require('../assets/images/code.png');

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

  // const container = {
  //   display: 'flex',
  //   justifyContent: 'flex-start',
  //   height: '100vh',
  //   width: '320px',
  // }

  // const navBar = {
  //   padding: '.625rem',
  //   height: '100%',
  //   width: '2rem',
  //   backgroundColor: '#02c2c3',
  // }

  // const topNav = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   height: '80%',
  // }

  // const bottomNav = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   height: '20%',
  // }

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

  // const plusBtn = {
  //   padding: "0",
  //   border: "0",
  //   marginBottom: "2rem",
  //   width: "1.6rem",
  //   height: "1.6rem",
  //   cursor: "pointer",
  //   backgroundColor: "transparent",
  //   outline: "none"
  // };

  return (
    // <div id='container' style={container}>
    // <div id='navBar' style={navBar}>
    //  <div id='topNav' style={topNav}>
    <div id={styles.navBar}>
      <button style={button} onClick={explorerOpen}>
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
      <button style={button} onClick={toggleClick}>
        <img src={codeIcon} style={icons} alt='delete' />
      </button>
      {/* </div> */}

      {/* </div> */}
      {!isOpen && <FileDirectory fileTree={fileTree} />}
    </div>
  );
};

export default NavBar;
