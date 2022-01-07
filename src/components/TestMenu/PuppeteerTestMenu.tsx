import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  toggleRightPanel,
  setFilePath,
  updateFile,
  setValidCode,
  setTestCase,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import Modal from '../Modals/Modal';
import {
  addPuppeteerPaintTiming,
  createNewPuppeteerTest,
} from '../../context/actions/puppeteerTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import UploadTest from '../UploadTest/UploadTest';
import GetTests from '../GetTests/GetTests';

const PuppeteerTestMenu = () => {
  const [{ puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(
    PuppeteerTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal(
    'puppeteer'
  );
  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const generateTest = useGenerateTest('puppeteer', projectFilePath);

  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  // puppeteer testing docs url
  const puppeteerUrl = 'https://devdocs.io/puppeteer/';

  const handleAddPuppeteerPaintTiming = () => {
    dispatchToPuppeteerTestCase(addPuppeteerPaintTiming());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(puppeteerUrl));
  };

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ puppeteerStatements })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0))
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest({ puppeteerStatements })));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type='button' autoFocus data-testid='puppeteerNewTestButton' onClick={openModal}>
            New Test +
          </button>
          <button onClick={fileHandle}>Preview</button>

          <button id={styles.example} onClick={openScriptModal}>
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          {/* <UploadTest testType="puppeteer" />
          <GetTests testType="puppeteer" /> */}
          <Modal
            // passing methods down as props to be used when Modal is opened
            title={title}
            dispatchToMockData={null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchTestCase={dispatchToPuppeteerTestCase}
            createTest={createNewPuppeteerTest}
          />
        </div>
        <div id={styles.right}>
          <button
            type='button'
            data-testid='puppeteerPaintTimingButton'
            onClick={handleAddPuppeteerPaintTiming}
          >
            Paint Timing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuppeteerTestMenu;
