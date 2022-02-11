import React, { useContext } from 'react';
import styles from './FileDirectory.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  toggleFolderView,
  highlightFile,
  toggleRightPanel,
  updateFile,
  setFilePath,
  setTabIndex,
} from '../../context/actions/globalActions';
import { MdImage } from 'react-icons/md';
import { AiFillHtml5 } from 'react-icons/ai';
import { DiCss3 } from 'react-icons/di'
import { IoLogoJavascript, IoLogoVue } from 'react-icons/io5';
import { VscJson } from 'react-icons/vsc';
import { FaReact, FaSass } from 'react-icons/fa';
import { SiTypescript, SiJest } from 'react-icons/si';
import { RiFileCodeFill } from 'react-icons/ri';
import { HiFolder, HiFolderOpen } from 'react-icons/hi'

const { ipcRenderer } = require('electron');

const fileImg = require('../../assets/images/file-document-outline.svg');

const FileDirectory = ({ fileTree }) => {
  const [{ isFolderOpen, isFileHighlighted, projectFilePath }, dispatchToGlobal] = useContext(
    GlobalContext
  );
  const idx = projectFilePath.lastIndexOf('/');
  const projectName = projectFilePath.substring(idx + 1);

  const ICON_MAP = {
    '.html': <AiFillHtml5 size={'1rem'}/>,
    '.json': <VscJson size={'1rem'}/>,
    '.js': <IoLogoJavascript size={'1rem'}/>,
    '.css': <DiCss3 size={'1rem'}/>,
    '.jsx': <FaReact size={'1rem'}/>,
    '.tsx': <FaReact size={'1rem'}/>,
    '.ts': <SiTypescript size={'1rem'}/>,
    'vue': <IoLogoVue size={'1rem'}/>,
    'scss': <FaSass size={'1rem'}/>,
    'sass': <FaSass size={'1rem'}/>,
  };

  const differImg = (file) => {
    const imageTypes = ['.psd', '.ai', '.png', '.gif', '.svg', '.jpg', '.ps', '.eps', '.tif'];
    if (file.includes('.test')){
      return <SiJest size={'1rem'}/>;
    }
    let idx = file.lastIndexOf('.');
    let fileType = file.substring(idx);
    if (imageTypes.includes(fileType)) {
      return <MdImage size={'1rem'}/>;
    } else if (ICON_MAP[fileType]) {
      return ICON_MAP[fileType];
    } else {
      return <RiFileCodeFill size={'1rem'}/>;
    }
  };

  const handleDisplayFileCode = (filePath) => {
    const fileContent = ipcRenderer.sendSync('Universal.readFile', filePath);
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
                  {isFolderOpen[file.filePath] ? <HiFolderOpen size={'1rem'}/> : <HiFolder size={'1rem'}/>}
                  <span>{file.fileName}</span>
                </button>
              </li>
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
                    dispatchToGlobal(setTabIndex(0));
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
        <div id={styles.explorer}>{projectName.toUpperCase()}</div>
        <div id={styles.fileTreeContainer}>
          {fileTree && convertToHTML(fileTree)}
        </div>
      </div>
    </>
  );
};

export default FileDirectory;
