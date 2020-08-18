import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  toggleRightPanel,
  setFilePath,
  updateFile,
} from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import Modal from '../Modals/Modal';
import {
  addPuppeteerPaintTiming,
  createNewPuppeteerTest,
} from '../../context/actions/puppeteerTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';

const PuppeteerTestMenu = () => {
  const [{ puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(
    PuppeteerTestCaseContext
  );
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext<any>(GlobalContext);
  // puppeteer testing docs url
  const puppeteerUrl = 'https://devdocs.io/puppeteer/';

  const [isPuppeteerModalOpen, setIsPuppeteerModalOpen] = useState(false);

  const openPuppeteerModal = () => {
    setIsPuppeteerModalOpen(true);
  };

  const closePuppeteerModal = () => {
    setIsPuppeteerModalOpen(false);
  };

  const handleAddPuppeteerPaintTiming = () => {
    dispatchToPuppeteerTestCase(addPuppeteerPaintTiming());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(puppeteerUrl));
  };

  const generateTest = useGenerateTest('puppeteer', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ puppeteerStatements })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };
  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest({ puppeteerStatements })));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type='button' data-testid='puppeteerNewTestButton' onClick={openPuppeteerModal}>
            New Test +
          </button>
          <button onClick={fileHandle}>Preview</button>
          <Modal
            // passing methods down as props to be used when Modal is opened
            dispatchToMockData={null}
            isModalOpen={isPuppeteerModalOpen}
            closeModal={closePuppeteerModal}
            dispatchTestCase={dispatchToPuppeteerTestCase}
            createTest={createNewPuppeteerTest}
          />
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
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
