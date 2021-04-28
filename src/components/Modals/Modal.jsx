/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */

import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styles from './ExportFileModal.module.scss';
import { useCopy, useNewTest, useGenerateScript } from './modalHooks';
import Popover from '@material-ui/core/Popover';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const ipc = require('electron').ipcRenderer;

// Colors
const mint = '#038181';
const mint2 = '#02c3c33f';
const mint3 = '#4ef2f258'
const lightGray4 = '#bceeeed7';
const darkGray = '#808080';


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
  const { copySuccess, codeRef, handleCopy } = useCopy();
  const { handleNewTest } = useNewTest(
    dispatchToMockData,
    dispatchTestCase,
    createTest,
    closeModal,
  );
  const [fileName, setFileName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const script = useGenerateScript(title, testType, puppeteerUrl);

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  const changeDirectory = () => {
    ipc.send('terminal.toTerm', `${script.cd}\n`);
  };

  const installDependencies = () => {
    ipc.send('terminal.toTerm', `${script.install}\n`);
  };

  const submitFileName = () => {
    const fileName = document.getElementById('inputFileName').value;
    setFileName(fileName);
  }

  const jestTest = () => {
    ipc.send('terminal.toTerm', `jest ${fileName}\n`);
    closeModal();
  };
  const verboseTest = () => {
    ipc.send('terminal.toTerm', `jest --verbose ${fileName}\n`);
    closeModal();
  };
  const coverageTest = () => {
    ipc.send('terminal.toTerm', `jest --coverage ${fileName}\n`);
    closeModal();
  };

  return (
    <ReactModal
      className={styles.modal2}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Save?"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={modalStyles}
    >
      {/* Modal Title */}
      <div id={styles.title}>
        <p style={{fontSize: 20}}>Run Tests in Terminal</p>
      </div>
      {/* Accordian View */}
      <div>
        {/* Configuration Guide */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            id={styles.accordionSummary}
          >
            Configuration Guide
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            <div style={{ width: '100%' }}>
            {/* Change Directory */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={styles.accordionSummary}
                >
                  1. Set terminal to root directory.
                </AccordionSummary>
                <AccordionDetails id={styles.accordionDetails}>
                  <div id={styles.accordionDiv}>
                    <pre>
                      <div className="code-wrapper">
                        <code>
                          {script.cd}
                        </code>
                      </div>
                    </pre>
                    <span id={styles.newTestButtons}>
                      <button id={styles.save} onClick={changeDirectory}>Change Directory</button>
                      <div className='feedback'  >Directory has been changed to root</div>
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
            {/* Install Dependencies */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content" 
                  id={styles.accordionSummary}>
                  2. Install dependencies and Jest.
                </AccordionSummary>
                <AccordionDetails id={styles.accordionDetails}>
                  <div>
                    <pre>
                      <div className="code-wrapper">
                        <code>
                          {script.install}
                        </code>
                      </div>
                    </pre>
                    <span id={styles.newTestButtons}>
                      <button id={styles.save} onClick={installDependencies}>Install</button>
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </AccordionDetails>
        </Accordion>
        {/* Specify File to test */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            // id="panel1a-header"
            id={styles.accordionSummary}
          >
            Specify file to test (optional)
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            {/* Select test to run */}
            <div id={styles.accordionDiv}>
              <input id='inputFileName' placeholder="example.js" />
              <span id={styles.newTestButtons}>
                <button id={styles.save} onClick={submitFileName}>Submit</button>
              </span>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Testing */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            // id="panel1a-header"
            id={styles.accordionSummary}
          >
            Select and Run Tests
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            {/* Select test to run */}
            <div id={styles.accordionDiv}>
              {/* To do: make button toggle on/off */}
              <pre>
                <div className="code-wrapper">
                  <code>
                    {'jest ' + fileName + '\n'}
                    {'jest --verbose ' + fileName + '\n'}
                    {'jest --coverage ' + fileName + '\n'}
                  </code>
                </div>
              </pre>
              <span id={styles.newTestButtons}>
                <button id={styles.save} onClick={jestTest}>
                  Jest Test
                </button>
                <button id={styles.save} onClick={verboseTest}>
                  Verbose Test
                </button>
                <button id={styles.save} onClick={coverageTest}>
                  Coverage Test
                </button>
              </span>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

    </ReactModal>
  );
};

export default Modal;

