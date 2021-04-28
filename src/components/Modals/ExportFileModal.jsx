import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  setFilePathMap,
  createFileTree,
  toggleFolderView,
  highlightFile,
  toggleExportBool,
  updateFile,
} from '../../context/actions/globalActions';

import styles from './ExportFileModal.module.scss';

const { ipcRenderer } = require('electron');

const ExportFileModal = ({ isExportModalOpen, setIsExportModalOpen }) => {
  const [fileName, setFileName] = useState('');
  const [invalidFileName, setInvalidFileName] = useState(false);
  const [{ projectFilePath, file, validCode }, dispatchToGlobal] = useContext(GlobalContext);

  const handleChangeFileName = (e) => {
    setFileName(e.target.value);
    setInvalidFileName(false);
  };

  /* cancel export file (when false) */
  const closeExportModal = () => {
    setIsExportModalOpen(false);

    // reset fileName and invalidFileName
    setInvalidFileName(false);
    setFileName('');
    dispatchToGlobal(toggleExportBool());
    dispatchToGlobal(updateFile(''));
  };

  const handleClickSave = () => {
    // file name uniqueness check
    const filePath = `${projectFilePath}/__tests__/${fileName}.test.js`;
    const fileExists = ipcRenderer.sendSync('ExportFileModal.exists', filePath);
    if (fileExists) {
      setInvalidFileName(true);
      return;
    }
    exportTestFile();
    closeExportModal();
    dispatchToGlobal(updateFile(''));
  };

  /* ------------------------------------------ EXPORT + DISPLAY FILE ------------------------------------------ */

  const exportTestFile = async () => {
    const folderPath = `${projectFilePath}/__tests__`;
    const folderExists = ipcRenderer.sendSync('ExportFileModal.exists', folderPath);
    if (!folderExists) {
      ipcRenderer.sendSync('ExportFileModal.mkdir', folderPath);
    }
    const filePath = `${projectFilePath}/__tests__/${fileName}.test.js`;
    ipcRenderer.sendSync('ExportFileModal.fileCreate', { filePath, file });

    dispatchToGlobal(createFileTree(generateFileTreeObject(projectFilePath)));
    displayTestFile(folderPath);
  };

  const displayTestFile = (testFolderFilePath) => {
    const filePath = `${testFolderFilePath}/${fileName}.test.js`;
    const fileContent = ipcRenderer.sendSync('ExportFileModal.readFile', filePath);

    dispatchToGlobal(updateFile(fileContent));
    dispatchToGlobal(toggleFolderView(testFolderFilePath));
    dispatchToGlobal(highlightFile(`${fileName}.test.js`));
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

  const generateFileTreeObject = (projectFilePath) => {
    const filePaths = ipcRenderer.sendSync('Universal.readDir', projectFilePath);
    const fileArray = filePaths.map((fileName) => {
      // replace backslashes for Windows OS
      projectFilePath = projectFilePath.replace(/\\/g, '/');
      const filePath = `${projectFilePath}/${fileName}`;
      const file = {
        filePath,
        fileName,
        files: [],
      };

      populateFilePathMap(file);

      // generateFileTreeObj will be recursively called if it is a folder
      const fileData = ipcRenderer.sendSync('Universal.stat', file.filePath);
      if (file.fileName !== 'node_modules' && file.fileName !== '.git' && fileData) {
        file.files = generateFileTreeObject(file.filePath);
      }
      return file;
    });
    dispatchToGlobal(setFilePathMap(filePathMap));
    return fileArray;
  };

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  return (
    <div>
      <ReactModal
        className={styles.modal}
        isOpen={isExportModalOpen}
        onRequestClose={closeExportModal}
        contentLabel='Save testing file'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        style={modalStyles}
      >
        <div id={styles.title}>
          <p>Convert to Javascript Code</p>
          <svg id={styles.close} onClick={closeExportModal}>
            <path d='M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z' />
          </svg>
        </div>
        {validCode ? (
          <div id={styles.body}>
            <p>File Name</p>
            <input type='text' value={fileName} onChange={handleChangeFileName} />
            {invalidFileName && <p>A file with the name '{fileName}' already exists.</p>}
            <button id={styles.save} onClick={closeExportModal}>
              Cancel
            </button>
            <button id={styles.save} onClick={handleClickSave}>
              Save
            </button>
          </div>
        ) : (
          <div id={styles.body}>
            <p>Please fill out all required fields before exporting your test file</p>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default ExportFileModal;
