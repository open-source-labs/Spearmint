/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */

import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styles from './ExportFileModal.module.scss';
import { useCopy, useNewTest, useGenerateScript } from './modalHooks';
import Popover from '@material-ui/core/Popover';
// Accordion view
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const ipc = require('electron').ipcRenderer;


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
  const [btnFeedback, setBtnFeedback] = useState({ changedDir: false, installed: false })

  const clearAndClose = () => {
    setBtnFeedback({ ...btnFeedback, changedDir: false, installed: false });
    closeModal();
  }

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  const changeDirectory = () => {
    ipc.send('terminal.toTerm', `${script.cd}\n`);
    setBtnFeedback({ ...btnFeedback, changedDir: true });
  };

  const installDependencies = () => {
    ipc.send('terminal.toTerm', `${script.install}\n`);
    setBtnFeedback({ ...btnFeedback, installed: true });
  };

  const submitFileName = () => {
    const fileName = document.getElementById('inputFileName').value;
    setFileName(fileName);
  }

  const jestTest = () => {
    ipc.send('terminal.toTerm', `jest ${fileName}\n`);
    clearAndClose();
  };
  const verboseTest = () => {
    ipc.send('terminal.toTerm', `jest --verbose ${fileName}\n`);
    clearAndClose();
  };
  const coverageTest = () => {
    ipc.send('terminal.toTerm', `jest --coverage ${fileName}\n`);
    clearAndClose();
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isModalOpen}
      onRequestClose={clearAndClose}
      contentLabel="Save?"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={modalStyles}
    >
      {/* Modal Title */}
      <div id={styles.title}>
        <p>Setup and Run Tests</p>
      </div>
      {/* Code snippets */}
      <div id={styles.body}>
        {/* Change Directory to root */}
        <div>
          <p id={styles.step}>1. Set terminal to root directory</p>
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

        <div>
          <p id={styles.step}>2. Install dependencies and Jest. Note if you are using create react app you can skip installing Jest</p>
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
        {/* Specify file to test */}
        <div>
          <p id={styles.step}>3. (optional) Specify filename to test</p>
          <input id='inputFileName' placeholder="test.js" />
          <span id={styles.newTestButtons}>
            <button id={styles.save} onClick={submitFileName}>Submit file Name</button>
          </span>
        </div>

        {/* Select test to run */}
        <div>
          <p id={styles.step}>4. Select test to run</p>
          {/* To do: make button toggle on/off */}
          <button onClick={(e) => { setAnchorEl(e.currentTarget) }}>Config Help</button>

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
        {title === 'react' ?
          <p id={styles.step}>
            Requires React version 16 or less.
          </p>
          : null
        }
      </div>
      <Popover
        // To do: increase the width of popover

        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <p1>
          {script.endPointGuide.pre + '\n'}
          {script.endPointGuide['1'] + '\n'}
          {script.endPointGuide['2'] + '\n'}
          {script.endPointGuide['3'] + '\n'}
          {script.endPointGuide['4'] + '\n'}
          {script.endPointGuide['4a'] + '\n'}
          {script.endPointGuide['4b'] + '\n'}
          {script.endPointGuide['4c'] + '\n'}
        </p1> */}
      </Popover>
    </ReactModal>
  );
};

export default Modal;
