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
  toggleFileDirectory,
  setTestCase,
  toggleModal,
} from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';

const ipc = require('electron').ipcRenderer;
const folderOpenIcon = require('../../assets/images/folder-open.png');

const { remote } = window.require('electron');
const electronFs = remote.require('fs');
const { dialog } = remote;

const OpenFolder = () => {
  const [{ isProjectLoaded, isFileDirectoryOpen, isTestModalOpen }, dispatchToGlobal] = useContext(
    GlobalContext,
  );

  const handleOpenFolder = async () => {
    const directory = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      filters: [
        { name: 'Javascript Files', extensions: ['js', 'jsx'] },
        { name: 'Style', extensions: ['css'] },
        { name: 'Html', extensions: ['html'] },
      ],
      message: 'Please select your project folder',
    });
    if (directory && directory.filePaths[0]) {
      let directoryPath = directory.filePaths[0];
      // replace backslashes for Windows OS
      directoryPath = directoryPath.replace(/\\/g, '/');
      dispatchToGlobal(setProjectFilePath(directoryPath));
      dispatchToGlobal(createFileTree(generateFileTreeObject(directoryPath)));
      dispatchToGlobal(loadProject('load'));
      dispatchToGlobal(setTestCase(''));
      if (!isTestModalOpen) dispatchToGlobal(toggleModal());
      if (!isFileDirectoryOpen) dispatchToGlobal(toggleFileDirectory());

      // Re-direct terminal directory to user selected directory
      ipc.send('terminal.toTerm', `cd ${directoryPath}\n`);
    }
  };

  const filePathMap = {};
  const populateFilePathMap = (file) => {
    const javaScriptFileTypes = ['js', 'jsx', 'ts', 'tsx'];
    const fileType = file.fileName.split('.')[1];
    if (javaScriptFileTypes.includes(fileType) || fileType === 'html') {
      // const componentName = file.fileName.split('.')[0];
      filePathMap[file.fileName] = file.filePath;
    }
  };

  const generateFileTreeObject = (directoryPath) => {
    const fileArray = electronFs.readdirSync(directoryPath).map((fileName) => {
      // replace backslashes for Windows OS
      directoryPath = directoryPath.replace(/\\/g, '/');
      const filePath = `${directoryPath}/${fileName}`;
      const file = {
        filePath,
        fileName,
        files: [],
      };

      populateFilePathMap(file);

      // generateFileTreeObj will be recursively called if it is a folder
      const fileData = electronFs.statSync(file.filePath);
      if (file.fileName !== 'node_modules' && file.fileName !== '.git' && fileData.isDirectory()) {
        file.files = generateFileTreeObject(file.filePath);
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
