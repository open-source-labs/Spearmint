import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  toggleRightPanel,
  setFilePath,
  updateFile,
  setValidCode,
  setTestCase,
  toggleExportBool,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import Modal from '../Modals/Modal';
import {
  addPuppeteerPaintTiming,
  createNewPuppeteerTest,
  deletePuppeteerTest,
} from '../../context/actions/puppeteerTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import UploadTest from '../UploadTest/UploadTest';
import GetTests from '../GetTests/GetTests';
import TestMenuButtons from './TestMenuButtons';
import { useToggleModal, validateInputs } from './testMenuHooks';
import ExportFileModal from '../Modals/ExportFileModal';
const { ipcRenderer } = require('electron')

// imports were declared in previous iterations, but were never used
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const PuppeteerTestMenu = () => {
  const [{ puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(
    PuppeteerTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal(
    'puppeteer'
  );
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const generateTest = useGenerateTest('puppeteer', projectFilePath);
  const [userSavedTest, setUserSavedTest] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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
    const testGeneration = generateTest({ puppeteerStatements });
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };

  // functionality when user clicks Save Test button
  const saveTest = () => {
    const valid = validateInputs('puppeteer', puppeteerStatements);
    dispatchToGlobal(setValidCode(valid));

    
    const newFilePath = `${projectFilePath}/__tests__/${fileName}`; 
    const updatedData = fileHandle();

    // check to see if user has saved test before. If not, then open ExportFileModal
    if(!newFilePath.includes('test.js') || !userSavedTest){
      dispatchToGlobal(toggleExportBool())
      setIsExportModalOpen(true)
      setUserSavedTest(true)
    }


    // if user already has a saved test file, rewrite the file with the updated data
    if(newFilePath.includes('test.js') && userSavedTest){
      ipcRenderer.sendSync('ExportFileModal.fileCreate', newFilePath, updatedData)
    }
  }

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  const handleResetTests = () => {
    //dispatchToPuppeteerTestCase(resetTests());
    dispatchToPuppeteerTestCase(deletePuppeteerTest(0));
    dispatchToPuppeteerTestCase(createNewPuppeteerTest());

  }
  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest({ puppeteerStatements })));

  return (
    <>
      <TestMenuButtons
        resetTests={handleResetTests} 
        openModal={openModal}
        fileHandle={fileHandle}
        openScriptModal={openScriptModal}
        saveTest={saveTest}
        openDocs={openDocs}
      />
      <Modal
        // passing methods down as props to be used when Modal is opened
        title={title}
        dispatchToMockData={null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        dispatchTestCase={dispatchToPuppeteerTestCase}
        createTest={createNewPuppeteerTest}
      />
      {/* marked for deletion */}
      {/* <ExportFileModal
        isExportModalOpen={isExportModalOpen}
        setIsExportModalOpen={setIsExportModalOpen}
      /> */}
    </>
    //       {/* <UploadTest testType="puppeteer" />
    //       <GetTests testType="puppeteer" /> */}
 
    //   </div>
    //   <div id={styles.right}>
    //     <button id={styles.rightBtn} onClick={saveTest}>
    //       Save Test
    //     </button>
    //   </div>
    // </div>
  );
};

export default PuppeteerTestMenu;
