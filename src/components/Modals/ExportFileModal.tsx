import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import { GlobalContext } from '../../context/reducers/globalReducer';
import withStyles from '@mui/styles/withStyles';
import {
  setFilePathMap,
  createFileTree,
  highlightFile,
  toggleExportBool,
  updateFile,
  setFileDirectory,
  setFolderView,
} from '../../context/actions/globalActions';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FaFileExport } from "react-icons/fa"
import { Button, TextField, InputAdornment } from '@mui/material';

import styles from './Modal.module.scss';
import { File, filePathMapType } from '../../utils/globalTypes';

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

/**
 * Renders the ExportFileModal react component, this component is the pop up when clicking on the Export File Button in the Navigation bar.
 * @property { boolean } isExportModalOpen
 * @property { Function } setIsExportModalOpen
 * @returns { JSX.Element } Returns the ExportFileModal react component
 */

interface ExportFileModalProps {
  isExportModalOpen: boolean;
  setIsExportModalOpen: React.Dispatch<boolean>;
}


const ExportFileModal = ({ isExportModalOpen, setIsExportModalOpen }: ExportFileModalProps) => {
  const [fileName, setFileName ] = useState('');
  const [invalidFileName, setInvalidFileName] = useState(false);
  const [{ projectFilePath, file, validCode, theme }, dispatchToGlobal] = useContext(GlobalContext);

  const handleChangeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setInvalidFileName(false);
  };
  
  /**
   * This function closes the existing Export File popup menu and also resets the state back to an empty string. 
   * 
   * Just in case a user wanted to reopen the modal later, the input box will be empty again.
   * 
   * @returns { void } Returns void
   */
  const closeExportModal = () => {
    setIsExportModalOpen(false);
    setInvalidFileName(false);
    setFileName('');
    dispatchToGlobal(toggleExportBool());
    dispatchToGlobal(updateFile(''));
  };

  /**
   * Function that creates a path of the modal when save button is clicked
   * @returns { void }
   */
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


  /**
   * This function creates a Test file in your local project directory
   * @returns { void }
   */
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
/**
 * Function that updates global state and highlights the test file where the user is redirected
 */
  const displayTestFile = (testFolderFilePath: string) => {
    const filePath = `${testFolderFilePath}/${fileName}.test.js`;
    const fileContent = ipcRenderer.sendSync('ExportFileModal.readFile', filePath);
    dispatchToGlobal(updateFile(fileContent));
    dispatchToGlobal(setFolderView(testFolderFilePath));
    dispatchToGlobal(highlightFile(`${fileName}.test.js`));
    // dispatchToGlobal(toggleFileDirectory(true));
    dispatchToGlobal(setFileDirectory(true));
  };

  const filePathMap: filePathMapType = {};
  const populateFilePathMap = (file: File) => {
    const javaScriptFileTypes = ['js', 'jsx', 'ts', 'tsx'];
    const fileType = file.fileName.split('.')[1];
    if (javaScriptFileTypes.includes(fileType) || fileType === 'html') {
      // const componentName = file.fileName.split('.')[0];
      filePathMap[file.fileName] = file.filePath;
    }
  };

  /**
   * Function that creates the FileTree Array of Objects
   * @param { string } - current project file directory
   * @returns { Object[] } Returns the FileTree Object
   */
  const generateFileTreeObject = (projectFilePath: string) => {
    const filePaths = ipcRenderer.sendSync('Universal.readDir', projectFilePath);
    const fileArray = filePaths.map((fileName: string) => {
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
          <div id={styles.container} title={'Export File Modal'}>
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
      </ReactModal>
    </div>
  );
};

export default ExportFileModal;
