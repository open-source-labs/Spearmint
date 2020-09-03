import React, { useContext } from 'react';
import styles from './FileDirectory.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  toggleFolderView,
  highlightFile,
  toggleRightPanel,
  updateFile,
  setFilePath,
} from '../../context/actions/globalActions';

const { remote } = window.require('electron');
const fs = remote.require('fs');
const fileImg = require('../../assets/images/file-document-outline.svg');
const FileDirectory = ({ fileTree }) => {
  const [{ isFolderOpen, isFileHighlighted, projectFilePath }, dispatchToGlobal] = useContext(
    GlobalContext
  );
  const idx = projectFilePath.lastIndexOf('/');
  const projectName = projectFilePath.substring(idx + 1);

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

  const differImg = (file) => {
    const imageTypes = ['.psd', '.ai', '.png', '.gif', '.svg', '.jpg', '.ps', '.eps', '.tif'];
    let idx = file.lastIndexOf('.');
    let fileType = file.substring(idx);
    if (imageTypes.includes(fileType)) {
      return <img id={styles.file} src={ICON_MAP['img']} alt='img' />;
    } else if (ICON_MAP[fileType]) {
      return <img id={styles.file} src={ICON_MAP[fileType]} alt={fileType} />;
    } else {
      return <img id={styles.file} src={ICON_MAP.etc} alt='file' />;
    }
  };

  const handleDisplayFileCode = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    dispatchToGlobal(updateFile(fileContent));
    dispatchToGlobal(setFilePath(filePath));
  };

  const handleClickToggleFolderView = (filePath) => {
    dispatchToGlobal(toggleFolderView(filePath));
  };

  const handleClickHighlightFile = (fileName) => {
    dispatchToGlobal(highlightFile(fileName));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
  };

  const convertToHTML = (filetree) => {
    return filetree.map((file) => {
      if (
        file.fileName !== 'node_modules' &&
        // file.fileName !== '.git' &&
        file.fileName[0] !== '.'
      ) {
        if (file.files.length) {
          return (
            <ul key={file.fileName}>
              <li>
                <button
                  id={styles.dirButton}
                  onClick={() => handleClickToggleFolderView(file.filePath)}
                >
                  <img id={styles.folder} src={ICON_MAP.folder} alt='folder' />
                  {file.fileName}
                </button>
              </li>
              {/* {file.files.length && */}
              {isFolderOpen[file.filePath] && convertToHTML(file.files, fileImg)}
            </ul>
          );
        } else {
          return (
            <ul key={file.filePath}>
              <li>
                <button
                  id={
                    isFileHighlighted === file.fileName
                      ? styles.dirButtonHilighted
                      : styles.dirButton
                  }
                  onClick={() => {
                    handleDisplayFileCode(file.filePath);
                    handleClickHighlightFile(file.fileName);
                  }}
                >
                  {differImg(file.fileName)}
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
      <div id={styles.fileDirectory}>
        <div id={styles.explorer}>{projectName}</div>
        {fileTree && convertToHTML(fileTree)}
      </div>
    </>
  );
};

export default FileDirectory;
