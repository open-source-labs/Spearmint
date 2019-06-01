import React, { useState, useContext } from 'react';
import FileDirectory from '../components/NavBar/FileDirectory';
import { FileTreeContext, ToggleContext } from '../App';
import ReactModal from 'react-modal';

const closeIcon = require('../assets/images/close-outline.png');
const leftIcon = require('../assets/images/sq_br_first_icon.png');
const rightIcon = require('../assets/images/sq_br_last_icon.png');
const exportIcon = require('../assets/images/export_icon.png');
const folderOpenIcon = require('../assets/images/folder_open.png');
const saveIcon = require('../assets/images/save_icon.png');
const browserIcon = require('../assets/images/app_window_shell.png');

const NavBar = () => {
  const [opened, setOpened] = useState(false);
  const [toggled, setToggled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fileTree = useContext(FileTreeContext);
  const setToggleView = useContext(ToggleContext);

  const explorerOpen = () => {
    setOpened(!opened);
  };

  const toggleClick = () => {
    toggled ? setToggleView(true) : setToggleView(false);
    setToggled(false);
    if (!toggled) setToggled(true);
  };

  const openModal = () => {
    setModalIsOpen(!false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    outline: 'none',
  };

  const icons = {
    height: '1.25rem',
    width: '1.25rem',
    color: 'white',
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

          <ReactModal
            className='Modal'
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Save testing file'
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <h3>Convert to Javascript Code</h3>
            <img src={closeIcon} onClick={closeModal} />
            <div>
              <p>File Name</p>
              <input type='text' />
              <button onClick={closeModal}>Cancel</button>
              <button>Save</button>
            </div>
          </ReactModal>

          <button style={button}>
            <img src={folderOpenIcon} style={icons} alt='folderOpen' />
          </button>
          <button style={button}>
            <img src={saveIcon} style={icons} alt='save' />
          </button>
          <button style={button} onClick={toggleClick}>
            <img src={browserIcon} style={icons} alt='browser' />
          </button>
        </div>

        {!opened && <FileDirectory fileTree={fileTree} />}
      </div>
    </div>
  );
};

export default NavBar;
