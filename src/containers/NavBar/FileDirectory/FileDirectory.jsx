import React from 'react';
import styles from './FileDirectory.module.scss';
import { useContext } from 'react';
import { FileCodeContext, FilePathContext, ComponentNameContext } from '../../../App';
const remote = window.require('electron').remote;
const electronFs = remote.require('fs');
const path = remote.require('path');
const fileImg = require('../../../assets/images/file-document-outline.svg');
const folderImg = require('../../../assets/images/folder-outline.svg');

const FileDirectory = ({ fileTree }) => {
  const setFileCode = useContext(FileCodeContext);
  const setFilePath = useContext(FilePathContext);
  const componentName = useContext(ComponentNameContext);

  const handleShowCode = fileTree => {
    const content = electronFs.readFileSync(fileTree, 'utf8');
    setFileCode(content);
  };

  const convertToHTML = filetree => {
    return filetree.map(file => {
      const desiredComponentName = file.fileName
        .substring(0, file.fileName.indexOf('.') - 1)
        .toLowerCase();
      if (componentName && componentName === desiredComponentName) {
        setFilePath(file.filePath);
      }
      if (file.fileName !== 'node_modules' && file.fileName !== '.git') {
        if (file.files.length) {
          return (
            <ul key={file.fileName}>
              <li>
                <img id={styles.folder} src={folderImg} alt='folder' />
                <button id={styles.dirButton}>{file.fileName}</button>
              </li>
              {file.files.length && convertToHTML(file.files, fileImg)}
            </ul>
          );
        } else {
          return (
            <ul key={file.filePath}>
              <li>
                <img id={styles.file} src={fileImg} alt='file' />
                <button
                  id={styles.dirButton}
                  onClick={() => {
                    handleShowCode(file.filePath);
                  }}
                >
                  {file.fileName}
                </button>
              </li>
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
