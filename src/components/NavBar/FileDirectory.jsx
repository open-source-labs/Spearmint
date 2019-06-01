<<<<<<< HEAD
import './styles.css';
import React from 'react';
import { useContext } from 'react';
import { FileCodeContext, FilePathContext, ComponentNameContext } from '../../App';
let remote = window.require('electron').remote;
let electronFs = remote.require('fs');
=======
import React from "react";
import styles from "../../assets/stylesheets/components/NavBar/FileDirectory.module.scss";
import { useContext } from "react";
import {
  FileCodeContext,
  FilePathContext,
  ComponentNameContext
} from "../../App";
let remote = window.require("electron").remote;
let electronFs = remote.require("fs");
let path = remote.require("path");
>>>>>>> b1ed50647ec13e4186166f32953231a1e90a63be

const FileDirectory = ({ fileTree }) => {
  const setFileCode = useContext(FileCodeContext);
  const setFilePath = useContext(FilePathContext);
  const componentName = useContext(ComponentNameContext);

  const handleShowCode = fileTree => {
    const content = electronFs.readFileSync(fileTree, "utf8");
    setFileCode(content);
  };

  const convertToHTML = filetree => {
    let folderImg = "https://img.icons8.com/ios/20/000000/opened-folder.png";
    let fileImg = "https://img.icons8.com/metro/20/000000/document.png";

    return filetree.map(file => {
      const desiredComponentName = file.fileName
        .substring(0, file.fileName.indexOf(".") - 1)
        .toLowerCase();
      if (componentName && componentName === desiredComponentName) {
        setFilePath(file.filePath);
      }
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
                  id={styles.dirButton}
                  onClick={() => {
                    handleShowCode(file.filePath);
                  }}
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
