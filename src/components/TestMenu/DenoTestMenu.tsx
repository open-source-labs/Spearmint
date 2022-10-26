import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  toggleRightPanel,
  updateFile,
  setFilePath,
  setValidCode,
  toggleExportBool,
  setTestCase,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import Modal from '../Modals/Modal';
import {
  addEndpoint,
  createNewEndpointTest,
  toggleDB,
  updateDBFilePath,
  resetTests
} from '../../context/actions/denoTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest';
import { DenoTestCaseContext } from '../../context/reducers/denoTestCaseReducer';
import { useToggleModal, validateInputs } from './testMenuHooks';
import TestMenuButtons from './TestMenuButtons';
import ExportFileModal from '../Modals/ExportFileModal';
import { Button } from '@material-ui/core';
const { ipcRenderer } = require('electron')

// imports were declared in previous iterations, but were never used
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

// child component of DenoTest menu. has NewTest and Endpoint buttons
const DenoTestMenu = () => {
  const [denoTestCase, dispatchToDenoTestCase] = useContext<any>(DenoTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName, theme }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const { title, isModalOpen, openModal, openScriptModal, closeModal, setIsModalOpen } = useToggleModal('endpoint');
  const generateTest = useGenerateTest('deno', projectFilePath);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)
  // Deno testing docs url
  const denoUrl = 'https://deno.land/';

  useEffect(() => {
    // validateInputs('endpoint', endpointTestCase)
    //   ? dispatchToGlobal(setValidCode(true))
    dispatchToGlobal(setValidCode(false));
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
    dispatchToGlobal(setValidCode(valid));

    // store the file path of the new saved test file
    const newFilePath = `${projectFilePath}/__tests__/${fileName}`; 

    const updatedData = fileHandle();
    if(!newFilePath.includes('test.js') || !userSavedTest){
      dispatchToGlobal(toggleExportBool)
      setIsExportModalOpen(true)
      setUserSavedTest(true)
    }

    // if user already has a saved test file, rewrite the file with the updated data
    if(newFilePath.includes('test.js') && userSavedTest){
      ipcRenderer.sendSync('ExportFileModal.fileCreate', newFilePath, updatedData)
    }
  }

  const handleClickAddDatabase = () => {
    if (denoTestCase.addDB) {
      dispatchToDenoTestCase(toggleDB(false));
      dispatchToDenoTestCase(updateDBFilePath('', ''));
      dispatchToDenoTestCase(setFilePath(''));
    } else dispatchToDenoTestCase(toggleDB('PostgreSQL'));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  const handleResetTests = () => {
    dispatchToDenoTestCase(resetTests());
  }
  
  if (exportBool) {
    const valid = validateInputs('deno', denoTestCase);
    dispatchToGlobal(setValidCode(valid));
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
          {/* <UploadTest testType="endpoint test" />
          <GetTests testType="endpoint test" /> */}

        <div id={styles[`dbConfig${theme}`]}>
          <Button 
            variant='outlined'
            data-testid='endPointButton' 
            size='medium'
            onClick={handleClickAddDatabase}>
            Configure Database
          </Button>
        </div>
    </>
  );
};

export default DenoTestMenu;
