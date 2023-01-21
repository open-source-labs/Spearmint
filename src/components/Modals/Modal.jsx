/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */


import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.module.scss';
import { useNewTest } from './modalHooks';
import { 
  setTabIndex,
  setFilePathMap,
  createFileTree, 
  highlightFile,
  toggleExportBool,
  updateFile,
  setFileDirectory,
  setFolderView,
} from '../../context/actions/globalActions';
// Accordion view
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GlobalContext } from '../../context/reducers/globalReducer';
import Draggable from 'react-draggable';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { VscNewFile } from "react-icons/vsc"
import { Button, TextField, InputAdornment } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { FaFileExport } from "react-icons/fa";

// const ipc = require('electron').ipcRenderer;
const { ipcRenderer } = require('electron');
const os = require('os');

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

const Modal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  dispatchToMockData,
  dispatchTestCase,
  createTest,
  testType = null,
  puppeteerUrl = 'sample.io'
}) => {
  // /* cancel export file (when false) */
  const closeModal = () => {
    setIsModalOpen(false); 
    
    // reset fileName and invalidFileName
    setInvalidFileName(false);
    //setFileName('');
    dispatchToGlobal(toggleExportBool());
    //dispatchToGlobal(updateFile(''));
  };

  const { handleNewTest } = useNewTest(
    dispatchToMockData,
    dispatchTestCase,
    createTest,
    closeModal
  );
  const [fileName, setFileName] = useState('');
  const [invalidFileName, setInvalidFileName] = useState(false);
  // const script = useGenerateScript(title, testType, puppeteerUrl);
  const [btnFeedback, setBtnFeedback] = useState({ changedDir: false, installed: false });
  const [{ theme, validCode, projectFilePath, file }, dispatchToGlobal] = useContext(GlobalContext);

  const handleChangeFileName = (e) => {
    setFileName(e.target.value);
    setInvalidFileName(false);
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
    dispatchToGlobal(updateFile(''));
    
  };

  const clearAndClose = () => {
    setBtnFeedback({ ...btnFeedback, changedDir: false, installed: false });
    closeModal();
  };

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
    dispatchToGlobal(setFolderView(testFolderFilePath));
    dispatchToGlobal(highlightFile(`${fileName}.test.js`));
    // dispatchToGlobal(toggleFileDirectory(true));
    dispatchToGlobal(setFileDirectory(true));
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

  // Change execute command based on os platform
  let execute = '\n';
  if (os.platform() === 'win32') {
    execute = '\r';
  }

  const denoTest = () => {
    ipcRenderer.send('terminal.toTerm', `Deno test __tests__/${fileName}.test.js --allow-net ${execute}`);
  };

  const jestTest = () => {
    if (title === 'vue'){
      ipcRenderer.send('terminal.toTerm', `npx vue-cli-service test:unit ${fileName}${execute}`);
    }
    else{
      ipcRenderer.send('terminal.toTerm', `npx jest ${fileName}${execute}`);
    }
    dispatchToGlobal(setTabIndex(2));
  };
  const verboseTest = () => {
    if (title === 'vue'){
      ipcRenderer.send('terminal.toTerm', `npx vue-cli-service test:unit ${fileName}${execute} --verbose`);
    }
    else{
      ipcRenderer.send('terminal.toTerm', `npx jest --verbose ${fileName}${execute}`);
    }
    dispatchToGlobal(setTabIndex(2));
  };
  const coverageTest = () => {
    if (title === 'vue'){
      ipcRenderer.send('terminal.toTerm', `npx vue-cli-service test:unit ${fileName}${execute} --coverage`);      
    }
    else{
      ipcRenderer.send('terminal.toTerm', `npx jest --coverage ${fileName}${execute}`);
    }
    dispatchToGlobal(setTabIndex(2));
  };

  const clearTerminal = () => {
    ipcRenderer.send('terminal.toTerm', `clear${execute}`);
  }

// Home Button functionality  
// Warning that tests will not be saved while transitioning between test types
if (title === 'New Test') {
  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles[`modalOverlay${theme}`]}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <Draggable id={styles.testModal}>
        <div id={styles.container}>
          <AiOutlineCloseCircle
            id={styles.escapeButton} 
            onKeyPress={clearAndClose}
            onClick={clearAndClose}
          />              
          <div id={styles.body}>
            <p id={styles.text}>
              Do you want to start a new test? All unsaved changes
              will be lost.
            </p>
            <div id={styles.exportBtns}>
              <Button 
                variant="contained" 
                onClick={handleNewTest}
                id={styles.saveBtn}
              >
                <span>{title}</span>
                <VscNewFile size={'1.25rem'}/>
              </Button>
              <Button 
                variant="outlined" 
                onClick={closeModal}
                id={styles.cancelBtn}
              >
                <span>Cancel</span>
                <AiOutlineCloseCircle size={'1.25rem'}/>
              </Button>
            </div>
          </div>
        </div>
      </Draggable>
    </ReactModal>
  );
}

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isModalOpen}
      onRequestClose={clearAndClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName={styles[`modalOverlay${theme}`]}
      ariaHideApp={false}
    >
      {/* <Draggable> */}
      <div id={styles.containerRun}>
      {/* Modal Title */}
        <div id={styles.title}> 
        <p style={{ fontSize: 20 }}>Run Tests in Terminal</p>
        <AiOutlineCloseCircle
          id={styles.escapeButton} 
          onKeyPress={clearAndClose}
          onClick={clearAndClose}
        /> {console.log(title)} 
        
      </div>
      
      {/* Accordion View */}
      <div>
        {/* Export Instructions */}
        <br />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={styles.accordionSummary}
          >
            Export Test File 
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            <div id={styles.accordionDiv}>
              <br />
              <div id={styles.container}>
              {validCode ? (
                <div id={styles.body}>
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
                    {/* <Button 
                      variant="outlined" 
                      onClick={closeModal}
                      id={styles.cancelBtn}
                    >
                      <span>Cancel</span>
                    </Button> */}
                  </div>
                </div>
              ) : (
                <div id={styles.body}>
                  <p>Please fill out all required fields before exporting your test file</p>
                </div>
              )}
            </div>

            </div>
          </AccordionDetails>
        </Accordion>
        {/* Testing */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={styles.accordionSummary}
          >
            Select and Run Tests
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            {/* Select test to run */}
            <div id={styles.accordionDiv}>
              <pre>
                <div className='code-wrapper'>
                  <code>
                    {title === 'vue' && `npx vue-cli-service test:unit ${fileName}\n`}
                    {title === 'deno' && `deno test ${fileName} --allow-net\n`}
                    {title !== 'vue' && title !== 'deno' && `npx jest ${fileName}\n`}
                    {title !== 'vue' && title !== 'deno' && `npx jest --verbose ${fileName}\n`}
                    {title !== 'vue' && title !== 'deno' && `npx jest --coverage ${fileName}\n`}
                  </code>
                </div>
              </pre>
              <span id={styles.runTestButtons}>
                {title === 'deno' ? 
                <Button id={styles.save} onClick={denoTest}>
                  Deno Test
                </Button> : 
                <div id={styles.runTestButtons}>
                  <Button id={styles.save} onClick={jestTest}>
                    Jest Test
                  </Button> 
                  <Button id={styles.save} onClick={verboseTest}>
                    Verbose Test
                  </Button>
                  <Button id={styles.save} onClick={coverageTest}>
                    Coverage Test
                  </Button>
                </div>
                } 
                <Button id={styles.save} onClick={clearTerminal}>
                  Clear Terminal
                </Button>
              </span>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      </div>
      {/* </Draggable> */}
    </ReactModal>
  );
};

export default Modal;
