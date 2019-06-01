import React from "react";
import styles from "../../assets/stylesheets/components/NavBar/FileDirectory.module.scss";
import { useContext } from "react";
import { FileCodeContext } from "../../App";
let remote = window.require("electron").remote;
let electronFs = remote.require("fs");

const FileDirectory = ({ fileTree }) => {
  const setFileCode = useContext(FileCodeContext);

  const handleShowCode = fileTree => {
    const content = electronFs.readFileSync(fileTree, "utf8");
    setFileCode(content);
  };

  const convertToHTML = filetree => {
    let folderImg = "https://img.icons8.com/ios/15/000000/opened-folder.png";
    let fileImg = "https://img.icons8.com/metro/15/000000/document.png";

    return filetree.map(file => {
      if (file.fileName !== "node_modules" && file.fileName !== ".git") {
        if (file.files.length) {
          return (
            <ul key={file.fileName}>
              <span>
                <img src={folderImg} alt="" />
                <button id={styles.dirButton}>{file.fileName}</button>
              </span>
              {file.files.length && convertToHTML(file.files, fileImg)}
            </ul>
          );
        } else {
          return (
            <ul key={file.filePath}>
              <span>
                <img src={fileImg} alt="" />
                <button
                  // style={fileBtn}
                  id={styles.dirButton}
                  onClick={() => handleShowCode(file.filePath)}
                >
                  {file.fileName}
                </button>
              </span>
            </ul>
          );
        }
      }
    });
  };

  // const fileDir = {
  //   padding: ".625rem",
  //   height: "auto",
  //   width: "12rem",
  //   border: "grey",
  //   backgroundColor: "white",
  //   overflow: "scroll"
  // };

  // const ul = {
  //   marginLeft: "10px",
  //   listStyleType: "none",
  //   fontSize: "12px"
  // };

  // const fileBtn = {
  //   hover: "lightgrey",
  //   border: "none"
  // };

  return (
    <>
      <div id={styles.fileDirectory}>
        {/* <div style={fileDir} className='fileDir'> */}
        {fileTree && convertToHTML(fileTree)}
      </div>
    </>
  );
};

export default FileDirectory;
