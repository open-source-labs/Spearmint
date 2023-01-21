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
import styles from './TestMenu.module.scss';
import Modal from '../Modals/Modal';
import {
  createNewEndpointTest,
  toggleDB,
  updateDBFilePath,
  resetTests
} from '../../context/actions/endpointTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import { useToggleModal, validateInputs } from './testMenuHooks';
import TestMenuButtons from './TestMenuButtons';

import { Button } from '@mui/material';
const { ipcRenderer } = require('electron')

// child component of EndPointTest menu. has NewTest and Endpoint buttons
const EndpointTestMenu = () => {
  const [endpointTestCase, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName, theme }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const { title, isModalOpen, openModal, openScriptModal, closeModal, setIsModalOpen } = useToggleModal('endpoint');
  const generateTest = useGenerateTest('endpoint', projectFilePath);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)

  // Endpoint testing docs url
  const endpointUrl = 'https://www.npmjs.com/package/supertest';

  useEffect(() => {
    // validateInputs('endpoint', endpointTestCase)
    dispatchToGlobal(setValidCode(true));
  }, []);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(endpointUrl));
  };

  // functionality when user clicks Preview
  const fileHandle = () => {
    const testGeneration = generateTest(endpointTestCase);

    // generates test code using UseGenerateTest.jsx and displays it in the Code Editor View
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };

  // functionality when user clicks Save Test button
  const saveTest = () => {
    const valid = validateInputs('endpoint', endpointTestCase);
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
    if (endpointTestCase.addDB) {
      dispatchToEndpointTestCase(toggleDB(false));
      dispatchToEndpointTestCase(updateDBFilePath('', ''));
      dispatchToEndpointTestCase(setFilePath(''));
    } else dispatchToEndpointTestCase(toggleDB('PostgreSQL'));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  const handleResetTests = () => {
    dispatchToEndpointTestCase(resetTests());
  }
  
  if (exportBool) {
    const valid = validateInputs('endpoint', endpointTestCase);
    dispatchToGlobal(setValidCode(valid));
    dispatchToGlobal(toggleExportBool());
    if (valid && !file) dispatchToGlobal(updateFile(generateTest(endpointTestCase)));
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
        dispatchTestCase={title === 'New Test' ? dispatchToEndpointTestCase : null}
        createTest={title === 'New Test' ? createNewEndpointTest : null}
      />

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

export default EndpointTestMenu;
