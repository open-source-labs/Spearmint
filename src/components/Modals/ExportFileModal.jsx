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

const remote = window.require('electron').remote;
const fs = remote.require('fs');

const ExportFileModal = ({ isExportModalOpen, setIsExportModalOpen }) => {
  const [fileName, setFileName] = useState('');
  const [invalidFileName, setInvalidFileName] = useState(false);
  const [{ projectFilePath, file }, dispatchToGlobal] = useContext(GlobalContext);

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
    if (fs.existsSync(projectFilePath + `/__tests__/${fileName}.test.js`)) {
      setInvalidFileName(true);
      return;
    }
    exportTestFile();
    closeExportModal();
    dispatchToGlobal(updateFile(''));
  };

  /* ------------------------------------------ EXPORT + DISPLAY FILE ------------------------------------------ */

  const exportTestFile = async () => {
    if (!fs.existsSync(projectFilePath + '/__tests__')) {
      fs.mkdirSync(projectFilePath + '/__tests__');
    }
    await fs.writeFile(projectFilePath + `/__tests__/${fileName}.test.js`, file, (err) => {
      if (err) throw err;
    });

    dispatchToGlobal(createFileTree(generateFileTreeObject(projectFilePath)));
    displayTestFile(projectFilePath + '/__tests__');
  };

  const displayTestFile = (testFolderFilePath) => {
    const fileContent = fs.readFileSync(testFolderFilePath + `/${fileName}.test.js`, 'utf8');
    console.log('fileContent: ', fileContent);
    dispatchToGlobal(updateFile(fileContent));
    dispatchToGlobal(toggleFolderView(testFolderFilePath));
    dispatchToGlobal(highlightFile(`${fileName}.test.js`));
  };

  const filePathMap = {};
  const generateFileTreeObject = (projectFilePath) => {
    const fileArray = fs.readdirSync(projectFilePath).map((fileName) => {
      //replace backslashes for Windows OS
      projectFilePath = projectFilePath.replace(/\\/g, '/');
      let filePath = `${projectFilePath}/${fileName}`;
      const file = {
        filePath,
        fileName,
        files: [],
      };
      //generateFileTreeObj will be recursively called if it is a folder
      const fileData = fs.statSync(file.filePath);
      if (file.fileName !== 'node_modules' && file.fileName !== '.git') {
        if (fileData.isDirectory()) {
          file.files = generateFileTreeObject(file.filePath);
          file.files.forEach((file) => {
            let javaScriptFileTypes = ['js', 'jsx', 'ts', 'tsx'];
            let fileType = file.fileName.split('.')[1];
            if (javaScriptFileTypes.includes(fileType)) {
              let componentName = file.fileName.split('.')[0];
              filePathMap[componentName] = file.filePath;
            }
          });
        }
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
      </ReactModal>
    </div>
  );
};

export default ExportFileModal;
