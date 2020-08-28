/**
 * functionality to open a new folder and generate the file tree for it
 */

import React, { useContext } from 'react';
import styles from './OpenFolderButton.module.scss';
import {
  loadProject,
  createFileTree,
  setFilePathMap,
  setProjectFilePath,
  // updateFile,
  // setFilePath,
} from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';

const folderOpenIcon = require('../../assets/images/folder-open.png');

const { remote } = window.require('electron');
const electronFs = remote.require('fs');
const { dialog } = remote;

const OpenFolder = () => {
  const [{ isProjectLoaded }, dispatchToGlobal] = useContext(GlobalContext);
  const filePathMap = {};

  const handleOpenFolder = () => {
    const directory = dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      filters: [
        { name: 'Javascript Files', extensions: ['js', 'jsx'] },
        { name: 'Style', extensions: ['css'] },
        { name: 'Html', extensions: ['html'] },
      ],
      message: 'Please select your project folder',
    });

    if (directory && directory[0]) {
      let directoryPath = directory[0];
      //replace backslashes for Windows OS
      directoryPath = directoryPath.replace(/\\/g, '/');
      dispatchToGlobal(setProjectFilePath(directoryPath));
      dispatchToGlobal(createFileTree(generateFileTreeObject(directoryPath)));
      dispatchToGlobal(loadProject('load'));
    }
  };

  //reads contents within the selected directory and checks if it is a file/folder
  const generateFileTreeObject = (directoryPath) => {
    const fileArray = electronFs.readdirSync(directoryPath).map((fileName) => {
      //replace backslashes for Windows OS
      directoryPath = directoryPath.replace(/\\/g, '/');
      let filePath = `${directoryPath}/${fileName}`;
      const file = {
        filePath,
        fileName,
        files: [],
      };
      //generateFileTreeObj will be recursively called if it is a folder
      const fileData = electronFs.statSync(file.filePath);
      if (file.fileName !== 'node_modules' && file.fileName !== '.git') {
        if (fileData.isDirectory()) {
          file.files = generateFileTreeObject(file.filePath);
          file.files.forEach((file) => {
            let javaScriptFileTypes = ['js', 'jsx', 'ts', 'tsx'];
            let fileType = file.fileName.split('.')[1];
            if (javaScriptFileTypes.includes(fileType)) {
              let componentName = file.fileName.split('.')[0];
              filePathMap[componentName] = file.filePath;
            }
          });
        }
      }
      return file;
    });
    dispatchToGlobal(setFilePathMap(filePathMap));
    return fileArray;
  };

  return (
    <span>
      {!isProjectLoaded ? (
        <button id={styles.openBtn} onClick={handleOpenFolder}>
          Open Folder
        </button>
      ) : (
        <button className={styles.navBtn}>
          <img
            src={folderOpenIcon}
            className={styles.icons}
            alt='folderOpen'
            title='open a new folder'
            onClick={handleOpenFolder}
          />
          <span className={styles.tooltip}>Open Folder</span>
        </button>
      )}
    </span>
  );
};

export default OpenFolder;
