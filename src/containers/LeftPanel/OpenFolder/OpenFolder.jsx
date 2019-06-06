import React, { useContext } from 'react';
import styles from './OpenFolder.module.scss';
import { loadProject, createFileTree, setProjectFilePath } from '../../../context/globalActions';
import { GlobalContext } from '../../../context/globalReducer';

const folderOpenIcon = require('../../../assets/images/folder-open.png');

const { remote } = window.require('electron');
const electronFs = remote.require('fs');
const { dialog } = remote;

const OpenFolder = () => {
  const [{ isProjectLoaded }, dispatchToGlobal] = useContext(GlobalContext);

  const handleOpenFolder = () => {
    const directory = dialog.showOpenDialog({
      properties: ['openDirectory'],
      filters: [
        { name: 'Javascript Files', extensions: ['js', 'jsx'] },
        { name: 'Style', extensions: ['css'] },
        { name: 'Html', extensions: ['html'] },
      ],
    });

    if (directory && directory[0]) {
      dispatchToGlobal(setProjectFilePath(directory[0]));
      dispatchToGlobal(loadProject());
      dispatchToGlobal(createFileTree(generateFileTreeObject(directory[0])));
    }
  };

  //reads contents within the selected directory and checks if it is a file/folder
  const generateFileTreeObject = directoryPath => {
    const fileArray = electronFs.readdirSync(directoryPath).map(fileName => {
      const file = {
        filePath: `${directoryPath}/${fileName}`,
        fileName,
        files: [],
      };
      //generateFileTreeObj will be recursively called if it is a folder
      const fileData = electronFs.statSync(file.filePath);
      if (file.fileName !== 'node_modules' && file.fileName !== '.git') {
        if (fileData.isDirectory()) {
          file.files = generateFileTreeObject(file.filePath);
        }
      }

      return file;
    });

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
        </button>
      )}
    </span>
  );
};

export default OpenFolder;
