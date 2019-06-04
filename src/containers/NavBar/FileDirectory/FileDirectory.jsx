import React, { useContext } from 'react';
import styles from './FileDirectory.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { displayFileCode, setFilePath } from '../../../context/globalActions';

const { remote } = window.require('electron');
let fs = remote.require('fs');
const fileImg = require('../../../assets/images/file-document-outline.svg');

const FileDirectory = ({ fileTree }) => {
  const [{ componentName }, dispatchToGlobal] = useContext(GlobalContext);

  const handleDisplayFileCode = fileTree => {
    const fileContent = fs.readFileSync(fileTree, 'utf8');
    dispatchToGlobal(displayFileCode(fileContent));
  };

  const ICON_MAP = {
    '.html': 'https://img.icons8.com/small/16/000000/html.png',
    '.json': 'https://img.icons8.com/small/16/000000/json.png',
    '.js': 'https://img.icons8.com/small/16/000000/js.png',
    '.css': 'https://img.icons8.com/small/16/000000/css.png',
    '.md': 'https://img.icons8.com/small/16/000000/txt.png',
    img: 'https://img.icons8.com/small/16/000000/image-file.png',
    etc: 'https://img.icons8.com/small/16/000000/code-file.png',
    folder: 'https://img.icons8.com/small/16/000000/folder-invoices.png',
  };

  const differImg = file => {
    const imageTypes = ['.psd', '.ai', '.png', '.gif', '.svg', '.jpg', '.ps', '.eps', '.tif'];
    let idx = file.lastIndexOf('.');
    let fileType = file.substring(idx);
    if (imageTypes.includes(fileType)) {
      return <img id={styles.file} src={ICON_MAP['img']} alt='image' />;
    } else if (ICON_MAP[fileType]) {
      return <img id={styles.file} src={ICON_MAP[fileType]} alt={fileType} />;
    } else {
      return <img id={styles.file} src={ICON_MAP.etc} alt='file' />;
    }
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
            <ul>
              <li>
                <img id={styles.folder} src={ICON_MAP.folder} alt='folder' />
                <button id={styles.dirButton}>{file.fileName}</button>
              </li>
              {file.files.length && convertToHTML(file.files, fileImg)}
            </ul>
          );
        } else {
          return (
            <ul>
              <li>
                {differImg(file.fileName)}
                <button
                  id={styles.dirButton}
                  onClick={() => {
                    handleDisplayFileCode(file.filePath);
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
