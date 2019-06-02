import React, { useContext } from 'react';
import styles from './FileDirectory.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { displayFileCode, setFilePath } from '../../../context/globalActions';

let remote = window.require('electron').remote;
let fs = remote.require('fs');

const FileDirectory = ({ fileTree }) => {
  const [{ componentName }, dispatchToGlobal] = useContext(GlobalContext);

  const handleDisplayFileCode = fileTree => {
    const fileContent = fs.readFileSync(fileTree, 'utf8');
    dispatchToGlobal(displayFileCode(fileContent));
  };

  const convertToHTML = filetree => {
    let folderImg = 'https://img.icons8.com/ios/20/000000/opened-folder.png';
    let fileImg = 'https://img.icons8.com/metro/20/000000/document.png';

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
                <img src={folderImg} alt='' />
                <button id={styles.dirButton}>{file.fileName}</button>
              </span>
              {file.files.length && convertToHTML(file.files, fileImg)}
            </ul>
          );
        } else {
          return (
            <ul key={file.filePath}>
              <span>
                <img src={fileImg} alt='' />
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
