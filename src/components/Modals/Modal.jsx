/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */

import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import styles from './ExportFileModal.module.scss';
import { useCopy, useNewTest, useGenerateScript } from './modalHooks';
// Accordion view
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cn from 'classnames';
import { GlobalContext } from '../../context/reducers/globalReducer';


const ipc = require('electron').ipcRenderer;
const os = require('os');

// ipc.on('Modal.shellType', (e, shellType) => {
//   //Check os platform to change cmd for terminal execution
//   let execute = '\n';
//   if (shellType === 'win32') {
//     execute = '\r';
//   }
// });

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
  const [btnFeedback, setBtnFeedback] = useState({ changedDir: false, installed: false });
  const [{ isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);

  const clearAndClose = () => {
    setBtnFeedback({ ...btnFeedback, changedDir: false, installed: false });
    closeModal();
  }

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  // Change execute command based on os platform
  let execute = '\n';
  if (os.platform() === 'win32') {
    execute = '\r';
  }

  const changeDirectory = () => {
    ipc.send('terminal.toTerm', `${script.cd}${execute}`);
    setBtnFeedback({ ...btnFeedback, changedDir: true });
  };

  const installDependencies = () => {
    ipc.send('terminal.toTerm', `${script.install}${execute}`);
    setBtnFeedback({ ...btnFeedback, installed: true });
  };

  const submitFileName = () => {
    const fileName = document.getElementById('inputFileName').value;
    setFileName(fileName);
  }

  const jestTest = () => {
    ipc.send('terminal.toTerm', `jest ${fileName}${execute}`);
  };
  const verboseTest = () => {
    ipc.send('terminal.toTerm', `jest --verbose ${fileName}${execute}`);
  };
  const coverageTest = () => {
    ipc.send('terminal.toTerm', `jest --coverage ${fileName}${execute}`);
  };

  return (
    <ReactModal
      className={styles.modal2}
      isOpen={isModalOpen}
      onRequestClose={clearAndClose}
      contentLabel="Save?"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName={styles.modalCustomOverlay}
      ariaHideApp={false}
      style={{
        content: {
          top: '25%',
          left: isFileDirectoryOpen ? '22%' : '11%',

        },
        overlay: {
          minWidth: isFileDirectoryOpen ? '876px' : '650px',
          width: isFileDirectoryOpen ? '59.9%' : '49.9%',
        }
      }}
    >
      {/* Modal Title */}
      <div id={styles.title}>
        <p style={{ fontSize: 20 }}>Run Tests in Terminal</p>
        <i
          tabIndex={0}
          onKeyPress={clearAndClose}
          onClick={clearAndClose}
          id={styles.escapeButton}
          className={cn('far fa-window-close', styles.describeClose)}
        />
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
                      <button id={styles.save} className='changeDirectory' onClick={changeDirectory}>Change Directory</button>
                      <div id={styles.feedback}>
                        {btnFeedback.changedDir === false ? null : <p>Directory has been changed to root directory.</p>}
                      </div>
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
                      <div id={styles.feedback}>
                        {btnFeedback.installed === false ? null : <p>Dependencies installation have been complete</p>}
                      </div>
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
                    {`jest ${fileName}${execute}`}
                    {`jest --verbose ${fileName}${execute}`}
                    {`jest --coverage ${fileName}${execute}`}
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
