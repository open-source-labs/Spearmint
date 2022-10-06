/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */


import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.module.scss';
import { useNewTest, useGenerateScript } from './modalHooks';
import { setTabIndex } from '../../context/actions/globalActions';
// Accordion view
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GlobalContext } from '../../context/reducers/globalReducer';
import Draggable from 'react-draggable';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { VscNewFile } from "react-icons/vsc"
import { Button } from '@material-ui/core';


const ipc = require('electron').ipcRenderer;
const os = require('os');

const Modal = ({
  title,
  isModalOpen,
  closeModal,
  dispatchToMockData,
  dispatchTestCase,
  createTest,
  testType = null,
  puppeteerUrl = 'sample.io',
}) => {
  const { handleNewTest } = useNewTest(
    dispatchToMockData,
    dispatchTestCase,
    createTest,
    closeModal
  );
  const [fileName, setFileName] = useState('');
  const script = useGenerateScript(title, testType, puppeteerUrl);
  const [btnFeedback, setBtnFeedback] = useState({ changedDir: false, installed: false });
  const [{ isFileDirectoryOpen, theme }, dispatchToGlobal] = useContext(GlobalContext);


  const clearAndClose = () => {
    setBtnFeedback({ ...btnFeedback, changedDir: false, installed: false });
    closeModal();
  };

  // Change execute command based on os platform
  let execute = '\n';
  if (os.platform() === 'win32') {
    execute = '\r';
  }

  const jestTest = () => {
    if (title === 'vue'){
      ipc.send('terminal.toTerm', `npx vue-cli-service test:unit ${fileName}${execute}`);
    }
    else{
      ipc.send('terminal.toTerm', `npx jest ${fileName}${execute}`);
    }
    dispatchToGlobal(setTabIndex(2));
  };
  const verboseTest = () => {
    if (title === 'vue'){
      ipc.send('terminal.toTerm', `npx vue-cli-service test:unit ${fileName}${execute} --verbose`);
    }
    else{
      ipc.send('terminal.toTerm', `npx jest --verbose ${fileName}${execute}`);
    }
    dispatchToGlobal(setTabIndex(2));
  };
  const coverageTest = () => {
    if (title === 'vue'){
      ipc.send('terminal.toTerm', `npx vue-cli-service test:unit ${fileName}${execute} --coverage`);      
    }
    else{
      ipc.send('terminal.toTerm', `npx jest --coverage ${fileName}${execute}`);
    }
    dispatchToGlobal(setTabIndex(2));
  };

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
        />  
        
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
              <p>Please make sure you export your test file prior to running your tests. You can find the export button on the main page in the top left corner.</p>
              <br />
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
                    {title !== 'vue' && `npx jest ${fileName}\n`}
                    {title !== 'vue' && `npx jest --verbose ${fileName}\n`}
                    {title !== 'vue' && `npx jest --coverage ${fileName}\n`}
                  </code>
                </div>
              </pre>
              <span id={styles.runTestButtons}>
                <Button id={styles.save} onClick={jestTest}>
                  Jest Test
                </Button>
                <Button id={styles.save} onClick={verboseTest}>
                  Verbose Test
                </Button>
                <Button id={styles.save} onClick={coverageTest}>
                  Coverage Test
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
