import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import Draggable from 'react-draggable';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { withStyles } from '@material-ui/core/styles';
import {
  setFilePathMap,
  createFileTree,
  toggleFolderView,
  highlightFile,
  toggleExportBool,
  updateFile,
  toggleFileDirectory,
} from '../../context/actions/globalActions';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FaFileExport } from "react-icons/fa"
import { Button, TextField, InputAdornment } from '@material-ui/core';

import styles from './Modal.module.scss';

const { ipcRenderer } = require('electron');

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8f54a0',
      },
      '& label.Mui-focused': {
        color: '#8f54a0',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#8f54a0',
      },
    },
  },
})(TextField);

const ExportFileModal = ({ isExportModalOpen, setIsExportModalOpen }) => {
  const [fileName, setFileName ] = useState('');
  const [invalidFileName, setInvalidFileName] = useState(false);
  const [{ projectFilePath, file, validCode, theme }, dispatchToGlobal] = useContext(GlobalContext);

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

  // /* ------------------------------------------ EXPORT + DISPLAY FILE ------------------------------------------ */

  const exportTestFile = () => {
    const folderPath = `${projectFilePath}/__tests__`;
    const folderExists = ipcRenderer.sendSync('ExportFileModal.exists', folderPath);
    if (!folderExists) {
      ipcRenderer.sendSync('ExportFileModal.mkdir', folderPath);
    }
    const filePath = `${projectFilePath}/__tests__/${fileName}.test.js`;
    ipcRenderer.sendSync('ExportFileModal.fileCreate', filePath, file);

    dispatchToGlobal(createFileTree(generateFileTreeObject(projectFilePath)));
    displayTestFile(folderPath);
  };

  const displayTestFile = (testFolderFilePath) => {
    const filePath = `${testFolderFilePath}/${fileName}.test.js`;
    const fileContent = ipcRenderer.sendSync('ExportFileModal.readFile', filePath);

    dispatchToGlobal(updateFile(fileContent));
    dispatchToGlobal(toggleFolderView(testFolderFilePath));
    dispatchToGlobal(highlightFile(`${fileName}.test.js`));
    dispatchToGlobal(toggleFileDirectory(true));
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

  return (
    <div id={styles[theme]}>
      <ReactModal
        className={styles.modal}
        isOpen={isExportModalOpen}
        onRequestClose={closeExportModal}
        contentLabel='Save testing file'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        overlayClassName={styles[`modalOverlay${theme}`]}
      >
        <Draggable>
          <div id={styles.container}>
            <AiOutlineCloseCircle
              id={styles.escapeButton} 
              onKeyPress={closeExportModal}
              onClick={closeExportModal}
            /> 
            {validCode ? (
              <div id={styles.body}>
                <p id={styles.text}>Export test file</p>
                
                <CssTextField
                  id="text"
                  name="text"
                  value={fileName}
                  onChange={handleChangeFileName}
                  label="Filename"
                  variant="outlined"
                  size="small"
                  error={invalidFileName}
                  helperText={invalidFileName && `A file with the name ${fileName} already exists.`}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">.test.js</InputAdornment>,
                  }}
                />
                <div id={styles.exportBtns}>
                  <Button 
                    variant="contained" 
                    onClick={handleClickSave}
                    id={styles.saveBtn}
                  >
                    <span>Save</span>
                    <FaFileExport size={'1.25rem'}/>
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={closeExportModal}
                    id={styles.cancelBtn}
                  >
                    <span>Cancel</span>
                    <AiOutlineCloseCircle size={'1.25rem'}/>
                  </Button>
                </div>
              </div>
            ) : (
              <div id={styles.body}>
                <p>Please fill out all required fields before exporting your test file</p>
              </div>
            )}
          </div>
        </Draggable>
      </ReactModal>
    </div>
  );
};

export default ExportFileModal;
