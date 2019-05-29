import React, { useState, useContext } from "react";
import FileDirectory from "../components/NavBar/FileDirectory";
import { FileTreeContext, ToggleContext } from '../App';
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const prevIcon = require("../assets/images/prev_icon.png");
const exportIcon = require("../assets/images/export_icon.png");
const folderOpenIcon = require("../assets/images/folder_open_icon.png");
const saveIcon = require("../assets/images/save_icon.png");
const trashIcon = require("../assets/images/trash_icon.png");
const roundPlusIcon = require("../assets/images/round_plus_icon.png");

const NavBar = () => {
  const [opened, setOpened] = useState(false);
  const [toggled, setToggled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fileTree = useContext(FileTreeContext);
  const setToggleView = useContext(ToggleContext);

  const explorerOpen = () => {
    setOpened(!opened)
  }

  const toggleClick = () => {
    toggled ? setToggleView(true) : setToggleView(false);
    setToggled(false);
    if(!toggled) setToggled(true);
  }

  const openModal = () => {
    setModalIsOpen(!false);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const container = {
    display: "flex",
    justifyContent: "flex-start",
    height: "100vh",
    width: "320px",
  };

  const navBar = {
    padding: ".625rem",
    height: "100%",
    width: "2rem",
    backgroundColor: "#02c2c3"
  };

  const topNav = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "80%"
  };

  const bottomNav = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "20%"
  };

  const button = {
    padding: "0",
    border: "0",
    margin: "1.6rem 0",
    width: "1.6rem",
    height: "1.6rem",
    cursor: "pointer",
    backgroundColor: "transparent",
    outline: "none"
  };

  const icons = {
    height: "1.25rem",
    width: "1.25rem"
  };

  const plusBtn = {
    padding: "0",
    border: "0",
    marginBottom: "2rem",
    width: "1.6rem",
    height: "1.6rem",
    cursor: "pointer",
    backgroundColor: "transparent",
    outline: "none"
  };

  return (
    <div id="container" style={container}>
      <div id="navBar" style={navBar}>
        <div id="topNav" style={topNav}>
          <button style={button} onClick={explorerOpen}>
            <img src={prevIcon} style={icons} alt="fileExplorer" />{" "}
          </button>
          <button style={button} onClick={openModal}>
            <img src={exportIcon} style={icons} alt="export" />
          </button>
          
          <ReactModal
            className="Modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Save testing file"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <h3>Convert to Javascript Code</h3>
            <FontAwesomeIcon
              id="delete-action"
              icon="times"
              onClick={closeModal}
            />
            <div>
              <p>File Name</p>
              <input type="text" />
              <button onClick={closeModal}>Cancel</button>
              <button>Save</button>
            </div>
          </ReactModal>
          
          <button style={button}>
            <img src={folderOpenIcon} style={icons} alt="folderOpen" />
          </button>
          <button style={button}>
            <img src={saveIcon} style={icons} alt="save" />
          </button>
          <button style={button} onClick={toggleClick}>
            <img src={trashIcon} style={icons} alt="delete" />
          </button>
        </div>

        <div id="bottomNav" style={bottomNav}>
          <button style={plusBtn}>
            <img src={roundPlusIcon} style={icons} alt="newTest" />
          </button>
        </div>
      </div>
      {!opened && <FileDirectory fileTree={fileTree} />}
    </div>
  );
  
}

export default NavBar;