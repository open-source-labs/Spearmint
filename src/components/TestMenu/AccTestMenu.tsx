import React, { useState, useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs, setTabIndex } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest, resetTests } from '../../context/actions/accTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  setTestCase,
  toggleExportBool,
  toggleModal,
} from '../../context/actions/globalActions';
import { AccTestCaseContext } from '../../context/reducers/accTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import TestMenuButtons from './TestMenuButtons';
import ExportFileModal from '../Modals/ExportFileModal';
const { ipcRenderer } = require('electron')

// imports were declared in previous iterations, but were never used
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const AccTestMenu = () => {
  // link to accessibility testing docs url
  const accUrl = 'https://www.deque.com/axe/core-documentation/api-documentation/';

  // initialize hooks
  const { title, isModalOpen, openModal, openScriptModal, closeModal, setIsModalOpen } = useToggleModal('acc');
  const [accTestCase, dispatchToAccTestCase] = useContext(AccTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)
  const generateTest = useGenerateTest('acc', projectFilePath);

  // setValidCode to true on load.
  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);


  // handle change to open accessibility URL docs on right panel
  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(accUrl));
  };

  // functionality when user clicks Preview
  const fileHandle = () => {
    const testGeneration = generateTest(accTestCase)
    
    // generates test code using UseGenerateTest.jsx and displays it in the Code Editor View
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };

  // functionality when user clicks Save Test button
  const saveTest = () => {
    const updatedData = fileHandle();
    
    // store the file path of the new saved test file
    const newFilePath = `${projectFilePath}/__tests__/${fileName}`; 

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
    dispatchToAccTestCase(resetTests());
  }
  if (!file && exportBool) {dispatchToGlobal(updateFile(generateTest(accTestCase)))};
 
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
        title={title}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        setIsModalOpen={setIsModalOpen}
        dispatchToMockData={null}
        dispatchTestCase={dispatchToAccTestCase}
        createTest={createNewTest}
        testType={accTestCase.testType}
        puppeteerUrl={accTestCase.puppeteerUrl}
      />
      {/* marked for deletion */}
      {/* <ExportFileModal
        isExportModalOpen={isExportModalOpen}
        setIsExportModalOpen={setIsExportModalOpen}
        /> */}
    
           {/* <UploadTest testType="acc" />
         <GetTests testType="acc" /> */}
   
    </>
    );
}

export default AccTestMenu;