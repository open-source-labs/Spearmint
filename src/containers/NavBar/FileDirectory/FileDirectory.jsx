import React, { useContext } from 'react';
import styles from './FileDirectory.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { displayFileCode, setFilePath, toggleFolderView } from '../../../context/globalActions';

const { remote } = window.require('electron');
const fs = remote.require('fs');
const fileImg = require('../../../assets/images/file-document-outline.svg');
const folderImg = require('../../../assets/images/folder-outline.svg');

const FileDirectory = ({ fileTree }) => {
  const [{ componentName, isFolderOpen }, dispatchToGlobal] = useContext(GlobalContext);

  const handleDisplayFileCode = fileTree => {
    const fileContent = fs.readFileSync(fileTree, 'utf8');
    dispatchToGlobal(displayFileCode(fileContent));
  };

  const handleClickToggleFolderView = filePath => {
    dispatchToGlobal(toggleFolderView(filePath));
  };

  const convertToHTML = filetree => {
    return filetree.map(file => {
      const desiredComponentName = file.fileName
        .substring(0, file.fileName.indexOf('.') - 1)
        .toLowerCase();
      if (componentName && componentName === desiredComponentName) {
        dispatchToGlobal(setFilePath(file.filePath));
      }
      if (file.fileName !== 'node_modules' && file.fileName !== '.git') {
        if (file.files.length) {
          return (
            <ul key={file.fileName}>
              <span>
                <img
                  src={folderImg}
                  alt='folder'
                  onClick={() => handleClickToggleFolderView(file.filePath)}
                />
                <button
                  id={styles.dirButton}
                  onClick={() => handleClickToggleFolderView(file.filePath)}
                >
                  {file.fileName}
                </button>
              </span>
              {file.files.length &&
                isFolderOpen[file.filePath] &&
                convertToHTML(file.files, fileImg)}
            </ul>
          );
        } else {
          return (
            <ul key={file.filePath}>
              <span>
                <img src={fileImg} alt='file' />
                <button
                  id={styles.dirButton}
                  onClick={() => {
                    handleDisplayFileCode(file.filePath);
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

  return (
    <>
      <div id={styles.fileDirectory}>{fileTree && convertToHTML(fileTree)}</div>
    </>
  );
};

export default FileDirectory;
