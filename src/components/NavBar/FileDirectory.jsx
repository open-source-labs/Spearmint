import React, { Component } from "react";

const FileDirectory = props => {
  const fileDir = {
    padding: ".625rem",
    height: "auto",
    width: "11rem",
    border: "grey",
    backgroundColor: "grey"
  };

  //   const FileExplorer = () => {
  //     shell.openItem(path.join(__dirname, "../src/"));

  return (
    <div id="fileDir" style={fileDir}>
      <p>This is File Explorer section</p>
      {/* <div>{dialog.showOpenDialog(path.join(__dirname, "../src/"))}</div> */}
    </div>
  );
};

export default FileDirectory;
