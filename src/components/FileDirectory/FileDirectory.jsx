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

/**
 * Renders the FileDirectory react component, this is the directory of your project that opens to the left when the icon in the navbar is clicked
 * @param { Object[] } fileTree - Array of Objects including fileName - string, filePath - string, files - Array of Objects
 * @returns { JSX.Element } Returns the file directory, this is done "recursively" and you can choose to expand a Folder in another Folder
 */
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

  /**
   * Function that gives a file type a corresponding image
   * @param { string } file - Array of files and folders as Objects
   * @returns { JSX.Element } 
   */
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

  /**
   * Function that updates the global state by updating the current fileContent along with the current FilePath
   * 
   * It syncs the file you clicked in the File Directory, with the codeEditor in the RightPanel component.
   * @param { string } filePath
   * @returns { void } Returns void
   */
  const handleDisplayFileCode = (filePath) => {
    const fileContent = ipcRenderer.sendSync('Universal.readFile', filePath);
    dispatchToGlobal(updateFile(fileContent));
    console.log(`FILE PATH IN FILEDIRECTORY: ${filePath}`);
    dispatchToGlobal(setFilePath(filePath));
  };
  
  /**
   * Function that can toggle a folder by expanding or collapsing it's contents
   * @param { string } filePath
   * @returns { void } Returns void
   */
  const handleClickToggleFolderView = (filePath) => {
    dispatchToGlobal(toggleFolderView(filePath));
  };

  /**
   * Function that automatically directs the user to the CodeEditor tab in the rightPanel and highlights the current file being viewed.
   * @param { string } fileName
   * @returns { void } Returns void
   */
  const handleClickHighlightFile = (fileName) => {
    dispatchToGlobal(highlightFile(fileName));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
  };

/**
 * This function takes the filetree for the opened project and converts it into the HTML elements used to traverse your files in the Spearmint app
 * @param { Object[] } filetree
 * @returns { JSX.Element[] }
 */

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
