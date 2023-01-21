import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  toggleRightPanel,
  updateFile,
  setFilePath,
  setValidCode,
  toggleExportBool,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import Modal from '../Modals/Modal';
import {
  createNewEndpointTest,
  resetTests
} from '../../context/actions/denoTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest';
import { DenoTestCaseContext } from '../../context/reducers/denoTestCaseReducer';
import { useToggleModal, validateInputs } from './testMenuHooks';
import TestMenuButtons from './TestMenuButtons';
import ExportFileModal from '../Modals/ExportFileModal';
const { ipcRenderer } = require('electron')

// child component of DenoTest menu. has NewTest and Endpoint buttons
const DenoTestMenu = () => {
  const [denoTestCase, dispatchToDenoTestCase] = useContext<any>(DenoTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName, theme }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const { title, isModalOpen, openModal, openScriptModal, closeModal, setIsModalOpen } = useToggleModal('deno');
  const generateTest = useGenerateTest('deno', projectFilePath);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)
  // Deno testing docs url
  const denoUrl = 'https://cmorten.github.io/superoak/';
  
  useEffect(() => {
    // this is commented due to a bug where the user cannot export a test
    validateInputs('endpoint', denoTestCase)
      dispatchToGlobal(setValidCode(true));
  }, []);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(denoUrl));
  };

  // functionality when user clicks Preview
  const fileHandle = () => {
    const testGeneration = generateTest(denoTestCase);

    // generates test code using UseGenerateTest.jsx and displays it in the Code Editor View
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };

  // functionality when user clicks Save Test button
  const saveTest = () => {
    const valid = validateInputs('endpoint', denoTestCase);
    console.log('I am inside saveTest button??!?!!?', valid)
    dispatchToGlobal(setValidCode(valid));

    // store the file path of the new saved test file
    const newFilePath = `${projectFilePath}/__tests__/${fileName}`; 

    const updatedData = fileHandle();
    if(!newFilePath.includes('test.js') || !userSavedTest){
      dispatchToGlobal(toggleExportBool())//Im assuming that this is supposed to be invoked? bc accTestMenu has it invoked line 68
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
    dispatchToDenoTestCase(resetTests());
  }
  
  if (exportBool) {
    const valid = validateInputs('deno', denoTestCase);
    dispatchToGlobal(setValidCode(valid));
    console.log(valid)
    dispatchToGlobal(toggleExportBool());
    if (valid && !file) dispatchToGlobal(updateFile(generateTest(denoTestCase)));
  }


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
        // passing methods down as props to be used when TestModal is opened
        title={title}
        dispatchToMockData={null}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeModal={closeModal}
        dispatchTestCase={title === 'New Test' ? dispatchToDenoTestCase : null}
        createTest={title === 'New Test' ? createNewEndpointTest : null}
      />
      <ExportFileModal
        isExportModalOpen={isExportModalOpen}
        setIsExportModalOpen={setIsExportModalOpen}
      />
    </>
  );
};

export default DenoTestMenu;
