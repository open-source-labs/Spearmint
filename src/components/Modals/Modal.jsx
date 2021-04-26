/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */

import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styles from './ExportFileModal.module.scss';
import { useCopy, useNewTest, useGenerateScript } from './modalHooks';


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
    ipc.send('terminal.toTerm', `${script.test} ${fileName}\n`);
    closeModal();
  };
  const verboseTest = () => {
    ipc.send('terminal.toTerm', `${script.verbose} ${fileName}\n`);
    closeModal();
  };
  const coverageTest = () => {
    ipc.send('terminal.toTerm', `${script.coverage} ${fileName}\n`);
    closeModal();
  };


  return (
    <ReactModal
      className={styles.modal}
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
        <p>Run Tests in Terminal</p>
      </div>
      {/* Code snippets */}
      <div id={styles.body}>
        {/* Change Directory to root */}
        <div>
          <p id={styles.endpoint}>1. Change directory to root</p>
          <pre>
            <div className="code-wrapper">
              <code>
                {script.cd}
              </code>
            </div>
          </pre>
          <span id={styles.newTestButtons}>
            <button id={styles.save} onClick={changeDirectory}>Change Directory</button>
          </span>
        </div>

        <div>
          <p id={styles.endpoint}>2. Install dependencies and Jest. Note if you are using create react app you can skip installing Jest.</p>
          <pre>
            <div className="code-wrapper">
              <code>
                {script.install}
              </code>
            </div>
          </pre>
          <span id={styles.newTestButtons}>
            <button id={styles.save} onClick={installDependencies}>Install Dependencies</button>
          </span>
        </div>
        {/* Specify file to test */}
        <div>
          <p id={styles.endpoint}>3. Specify filename.</p>
          <input id='inputFileName' placeholder="test.js" />
          <span id={styles.newTestButtons}>
            <button id={styles.save} onClick={submitFileName}>Submit file Name</button>
          </span>
        </div>

        {/* Select test to run */}
        <div>
          <p id={styles.endpoint}>4. Select test to run</p>
          <pre>
            <div className="code-wrapper">
              <code>
                {script.test + ' ' + fileName + '\n'}
                {script.verbose + ' ' + fileName + '\n'}
                {script.coverage + ' ' + fileName + '\n'}
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
          <p id={styles.endpoint}>
            Requires React version 16 or less.
          </p>
          : null
        }
      </div>
    </ReactModal>
  );
};

export default Modal;
