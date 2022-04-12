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

const { ipcRenderer } = require('electron');
const os = require('os');
const folderOpenIcon = require('../../assets/images/folder-open.png');
import { FaFolderOpen } from 'react-icons/fa'
import { Button } from '@material-ui/core';

// Change execute command based on os platform
let execute = '\n';
if (os.platform() === 'win32') {
  execute = '\r';
}

const OpenFolder = () => {
  const [{ isProjectLoaded, isFileDirectoryOpen, isTestModalOpen }, dispatchToGlobal] = useContext(
    GlobalContext,
  );

  const handleOpenFolder = () => {
    // opens finder (or equivalent), prompts user to select file directory
    const directory = ipcRenderer.sendSync('OpenFolderButton.dialog');

    if (directory && directory[0]) {
      let directoryPath = directory[0];
      // replace backslashes for Windows OS
      directoryPath = directoryPath.replace(/\\/g, '/');
      // update state.projectFilePath to 'users/user/project....'
      dispatchToGlobal(setProjectFilePath(directoryPath));
      // update state.fileTree to be array of files + folders as objects 
      dispatchToGlobal(createFileTree(generateFileTreeObject(directoryPath)));
      // update state.isProjectLoaded to become "load"
      dispatchToGlobal(loadProject('load'));
      dispatchToGlobal(setTestCase(''));
      if (!isTestModalOpen) dispatchToGlobal(toggleModal());
      //if (!isFileDirectoryOpen) dispatchToGlobal(toggleFileDirectory());
      // Re-direct terminal directory to user selected directory
      ipcRenderer.send('terminal.toTerm', `cd "${directoryPath}"${execute}`);
    }
  };

  const filePathMap = {};
  const populateFilePathMap = (file) => {
    const javaScriptFileTypes = ['js', 'jsx', 'ts', 'tsx', 'vue', 'svelte'];
    const fileType = file.fileName.split('.')[1];
    if (javaScriptFileTypes.includes(fileType) || fileType === 'html') {
      filePathMap[file.fileName] = file.filePath;
    }
  };

  const generateFileTreeObject = (directoryPath) => {
    const filePaths = ipcRenderer.sendSync('Universal.readDir', directoryPath);
    const fileArray = filePaths.map((fileName) => {
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
      const isDirectory = ipcRenderer.sendSync('OpenFolderButton.isDirectory', filePath);
      if (file.fileName !== 'node_modules' && file.fileName !== '.git' && isDirectory) {
        file.files = generateFileTreeObject(file.filePath);
      }
      return file;
    });
    dispatchToGlobal(setFilePathMap(filePathMap));
    return fileArray;
  };

  return (
    <>
      {!isProjectLoaded ? (
        <Button 
          variant="outlined" 
          id={styles.openBtn} 
          onClick={handleOpenFolder}
        >
          <span>Open Folder</span>
          <FaFolderOpen size={'1.25rem'}/>
        </Button>
      ) : (
        <span onClick={handleOpenFolder} title='Open new folder'>
          <FaFolderOpen size={'1.5rem'}/>
        </span>
        // <button className={styles.navBtn}>
        //   <img
        //     src={folderOpenIcon}
        //     className={styles.icons}
        //     alt='folderOpen'
        //     title='open a new folder'
        //     onClick={handleOpenFolder}
        //   />
        //   <span className={styles.tooltip}>Open Folder</span>
        // </button>
      )}
    </>
  );
};

export default OpenFolder;
