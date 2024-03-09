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
  createNewGraphQLTest,
  toggleDB,
  updateDBFilePath,
  resetTests,
} from '../../context/actions/graphQLTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest';
import { GraphQLTestCaseContext } from '../../context/reducers/graphQLTestCaseReducer';
import { useToggleModal, validateInputs } from './testMenuHooks';
import TestMenuButtons from './TestMenuButtons';

import { Button } from '@mui/material';
const { ipcRenderer } = require('electron')

// child component of EndPointTest menu. has NewTest and Endpoint buttons
const GraphQLTestMenu = () => {
  const [graphQLTestCase, dispatchToGraphQLTestCase] = useContext(GraphQLTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName, theme }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const { title, isModalOpen, openModal, openScriptModal, closeModal, setIsModalOpen } = useToggleModal('graphQL');
  const generateTest = useGenerateTest('graphQL', projectFilePath);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)

  // Endpoint testing docs url
  const endpointUrl = 'https://www.npmjs.com/package/supertest';

  useEffect(() => {
    // validateInputs('endpoint', endpointTestCase)
    //   ? dispatchToGlobal(setValidCode(true))
    dispatchToGlobal(setValidCode(false));
  }, []);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(endpointUrl));
  };

  // functionality when user clicks Preview
  const fileHandle = () => {
    const testGeneration = generateTest(graphQLTestCase);

    // generates test code using UseGenerateTest.jsx and displays it in the Code Editor View
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };

  // functionality when user clicks Save Test button
  const saveTest = () => {
    const valid = validateInputs('graphQL', graphQLTestCase);
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
    if (graphQLTestCase.addDB) {
      dispatchToGraphQLTestCase(toggleDB(false));
      dispatchToGraphQLTestCase(updateDBFilePath('', ''));
      dispatchToGraphQLTestCase(setFilePath(''));
    } else dispatchToGraphQLTestCase(toggleDB('PostgreSQL'));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  const handleResetTests = () => {
    dispatchToGraphQLTestCase(resetTests());
  }
  if (exportBool) {
    const valid = validateInputs('graphQL', graphQLTestCase);
    dispatchToGlobal(setValidCode(valid));
    dispatchToGlobal(toggleExportBool());
    if (valid && !file) dispatchToGlobal(updateFile(generateTest(graphQLTestCase)));
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
        closeModal={closeModal}
        setIsModalOpen={setIsModalOpen}
        dispatchTestCase={title === 'New Test' ? dispatchToGraphQLTestCase : null}
        createTest={title === 'New Test' ? createNewGraphQLTest : null}
      />
        <div id={styles[`dbConfig${theme}`]}>
          <Button 
            variant='outlined'
            data-testid='graphQLButton' 
            size='medium'
            onClick={handleClickAddDatabase}>
            Configure Database
          </Button>
        </div>
    </>
  );
};

export default GraphQLTestMenu;
