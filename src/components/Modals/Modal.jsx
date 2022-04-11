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
import cn from 'classnames';
import { GlobalContext } from '../../context/reducers/globalReducer';
import Draggable from 'react-draggable';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { VscNewFile } from "react-icons/vsc"
import { Button, TextField } from '@material-ui/core';
import InputTextField from '../InputTextField';

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

  const changeDirectory = () => {
    ipc.send('terminal.toTerm', `${script.cd}${execute}`);
    setBtnFeedback({ ...btnFeedback, changedDir: true });
  };

  const installDependencies = () => {
    ipc.send('terminal.toTerm', `${script.install}${execute}`);
    setBtnFeedback({ ...btnFeedback, installed: true });
    dispatchToGlobal(setTabIndex(2));
  };

  const submitFileName = () => {
    const fileName = document.getElementById('inputFileName').value;
    setFileName(fileName);
  };

  const changeFileName = (e) => {
    const fileName = e.currentTarget.value;
    setFileName(fileName);
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

  // EndPointGuide component definition, conditionally rendered
  const EndPointGuide = () => {
    // endpoint guide only exists when user is in endpoint testing
    if (script.endPointGuide) {
      const array = [];
      for (let step in script.endPointGuide) {
        array.push(
          <div id={styles.endPointGuide}>
            {script.endPointGuide[step]}
            {'\n'}
          </div>
        );
      }
      // return accordion element
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            id={styles.accordionSummary}
          >
            Endpoint Testing Configuration Guide
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>{array}</AccordionDetails>
        </Accordion>
      );
    }
    // return anything to not render accordion
    return null;
  };

  // ReactDependencies component definition, conditionally rendered
  const ReactDependencies = () => {
    if (title === 'hooks' || title === 'react') {
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            id={styles.accordionSummary}
          >
            3. Important React Babel Configuration
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>
            <div id={styles.accordionDiv}>
              <div> Ensure that your project contains the following file: </div>
              <pre>
                <div className='code-wrapper'>
                  <code>babel.config.js</code>
                </div>
              </pre>
            </div>
            <div>
              and includes the following code:
              <br />
            </div>
            <pre>
              <div className='code-wrapper'>
                <code>
                  {`module.exports = {presets: ['@babel/preset-env', '@babel/preset-react']}`}
                </code>
              </div>
            </pre>
          </AccordionDetails>
        </Accordion>
      );
    } else if (title === 'svelte') {
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            id={styles.accordionSummary}
          >
            3. Important Svelte Babel Configuration
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>
            <div id={styles.accordionDiv}>
              <div> Ensure that your project contains the following file: </div>
              <pre>
                <div className='code-wrapper'>
                  <code>babel.config.js</code>
                </div>
              </pre>
            </div>
            <div>
              and includes the following code:
              <br />
            </div>
            <pre>
              <div className='code-wrapper'>
                <code>
                  {`module.exports = {presets: [['@babel/preset-env', { targets: { node: "current" } }]]}`}
                </code>
              </div>
            </pre>
          </AccordionDetails>
        </Accordion>
      );
    }
    return null;
  };

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
      <Draggable>
      <div id={styles.containerRun}>
      {/* Modal Title */}
        <div id={styles.title}>
        <p style={{ fontSize: 20 }}>Run Tests in Terminal</p>
        {/* <p
          tabIndex={0}
          onKeyPress={clearAndClose}
          onClick={clearAndClose}
          id={styles.escapeButton}
          className={cn('far fa-window-close', styles.describeClose)}
        >close</p> */}
        <AiOutlineCloseCircle
          id={styles.escapeButton} 
          onKeyPress={clearAndClose}
          onClick={clearAndClose}
        />  
        
      </div>
      
      {/* Accordion View */}
      <div>
        {/* Configuration Guide */}
        <EndPointGuide />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
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
                  aria-controls='panel1a-content'
                  id={styles.accordionSummary}
                >
                  1. Set terminal to root directory.
                </AccordionSummary>
                <AccordionDetails id={styles.accordionDetails}>
                  <div id={styles.accordionDiv}>
                    <pre>
                      <div className='code-wrapper'>
                        <code>{script.cd}</code>
                      </div>
                    </pre>
                    <span id={styles.runTestButtons}>
                      <Button id={styles.save}
                        className='changeDirectory'
                        onClick={changeDirectory}
                        size="small"
                      >
                        Change Directory
                      </Button>

                      {btnFeedback.changedDir === false ? null : (
                        <p>Directory has been changed to root directory.</p>
                      )}

                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Install Dependencies */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id={styles.accordionSummary}
                >
                  2. Install dependencies.
                </AccordionSummary>
                <AccordionDetails id={styles.accordionDetails}>
                  <div id={styles.accordionDiv}>
                    <pre>
                      <div className='code-wrapper' id={styles.codeWrapper}>
                        <code>{script.install}</code>
                      </div>
                    </pre>
                    <span id={styles.runTestButtons}>
                      <Button id={styles.save}
                        onClick={installDependencies}
                        size="small"
                      >
                        Install
                      </Button>
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Create config file only if title is react or hook */}
              <ReactDependencies />
            </div>
          </AccordionDetails>
        </Accordion>
        {/* Specify File to test */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            // id="panel1a-header"
            id={styles.accordionSummary}
          >
            Specify file to test (optional)
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            {/* Select test to run */}
            <div id={styles.accordionDiv}>
              <InputTextField id='inputFileName' placeholder='example.test.js' variant='outlined' onChange={changeFileName}/>
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
      </Draggable>
    </ReactModal>
  
  );
};

export default Modal;
