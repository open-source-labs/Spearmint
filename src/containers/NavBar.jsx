import React, { useState, useContext } from 'react';
import FileDirectory from '../components/NavBar/FileDirectory';
import { FileTreeContext, ToggleContext } from '../App';
import ExportFileModal from '../components/NavBar/ExportFileModal';

const leftIcon = require('../assets/images/chevron-left.png');
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

  const explorerOpen = () => {
    setIsOpen(!isOpen);
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

  const container = {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100vh',
    width: '320px',
  };

  const navBar = {
    height: '100%',
    width: '3rem',
    backgroundColor: '#02c2c3',
  };

  const topNav = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '80%',
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
    <div id='container' style={container}>
      <div id='navBar' style={navBar}>
        <div id='topNav' style={topNav}>
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
        </div>

        {!isOpen && <FileDirectory fileTree={fileTree} />}
      </div>
    </div>
  );
};

export default NavBar;
