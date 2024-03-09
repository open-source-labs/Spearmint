import React, { useState, useEffect, useContext } from 'react';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  openBrowserDocs,
  toggleModal,
  toggleExportBool,
  setTabIndex,
} from '../../context/actions/globalActions';
import {
  createNewReduxTest,
  resetTests
} from '../../context/actions/reduxTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import TestMenuButtons from './TestMenuButtons';
const { ipcRenderer } = require('electron')

const ReduxTestMenu = () => {
  const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal, setIsModalOpen } = useToggleModal('redux');
  const [{ projectFilePath, file, fileName, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)
  const generateTest = useGenerateTest('redux', projectFilePath);

  // Redux testing docs url
  const reduxUrl = 'https://redux.js.org/recipes/writing-tests';

  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reduxUrl));
  };

  const fileHandle = () => {
    const testGeneration = generateTest({ reduxStatements, reduxTestStatement })
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration
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
    dispatchToReduxTestCase(resetTests())
  } 

  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest({ reduxTestStatement, reduxStatements })));

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
        setIsModalOpen={setIsModalOpen}
        dispatchTestCase={dispatchToReduxTestCase}
        createTest={createNewReduxTest}
      />
    </>
  );
};

export default ReduxTestMenu;
