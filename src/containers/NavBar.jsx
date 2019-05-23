import React from "react";
import FileDirectory from "../components/NavBar/FileDirectory";

const prevIcon = require("../assets/prev_icon.png");
const exportIcon = require("../assets/export_icon.png");
const folderOpenIcon = require("../assets/folder_open_icon.png");
const saveIcon = require("../assets/save_icon.png");
const trashIcon = require("../assets/trash_icon.png");
const roundPlusIcon = require("../assets/round_plus_icon.png");

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: true
    };
    this.explorerOpen = this.explorerOpen.bind(this);
  }

  explorerOpen() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const container = {
      display: "flex",
      justifyContent: "flex-start",
      height: "100vh"
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
            <button style={button} onClick={this.explorerOpen}>
              <img src={prevIcon} style={icons} alt="fileExplorer" />{" "}
            </button>
            <button style={button}>
              <img src={exportIcon} style={icons} alt="export" />
            </button>
            <button style={button}>
              <img src={folderOpenIcon} style={icons} alt="folderOpen" />
            </button>
            <button style={button}>
              <img src={saveIcon} style={icons} alt="save" />
            </button>
            <button style={button}>
              <img src={trashIcon} style={icons} alt="delete" />
            </button>
          </div>
          <div id="bottomNav" style={bottomNav}>
            <button style={plusBtn}>
              <img src={roundPlusIcon} style={icons} alt="newTest" />
            </button>
          </div>
        </div>
        {this.state.opened && <FileDirectory />}
      </div>
    );
  }
}
