import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  toggleExportBool,
  setTestCase,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import { addHookUpdates, createNewHooksTest } from '../../context/actions/hooksTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { useToggleModal, validateInputs } from './testMenuHooks';
import ExportFileModal from '../Modals/ExportFileModal';
const { ipcRenderer } = require('electron')
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const HooksTestMenu = () => {
  // Hooks testing docs url
  const hooksUrl = 'https://react-hooks-testing-library.com/usage/basic-hooks';
  const [{ hooksTestStatement, hooksStatements }, dispatchToHooksTestCase] = useContext(
    HooksTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('hooks');
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const generateTest = useGenerateTest('hooks', projectFilePath);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false);

  useEffect(() => {
    dispatchToGlobal(setValidCode(false));
  }, []);

  const handleAddHookUpdates = () => {
    dispatchToHooksTestCase(addHookUpdates());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(hooksUrl));
  };

  // functionality when user clicks Preview
  const fileHandle = () => {
    const testGeneration = generateTest({ hooksTestStatement, hooksStatements });
    
    // generates test code using UseGenerateTest.jsx and displays it in the Code Editor View
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };

  const saveTest = () => {
    const valid = validateInputs('hooks', hooksStatements);
    dispatchToGlobal(setValidCode(valid));

    const updatedData = fileHandle();
    if(!userSavedTest){
      dispatchToGlobal(toggleExportBool)
      setIsExportModalOpen(true)
    }

    // store the file path of the new saved test file
    const newFilePath = `${projectFilePath}/__tests__/${fileName}`; 

    // if user has already clicked Save Test, rewrite the file with the updated data
    if(userSavedTest){
      ipcRenderer.sendSync('ExportFileModal.fileCreate', newFilePath, updatedData)
    }

    // set userSavedTest state to true once user has clicked Save Test button
    setUserSavedTest(true);
  }

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (exportBool) {
    const valid = validateInputs('hooks', hooksStatements);
    dispatchToGlobal(setValidCode(valid));
    dispatchToGlobal(toggleExportBool());
    if (valid && !file) dispatchToGlobal(updateFile(generateTest(hooksStatements)));
  }

  if (!file && exportBool) {
    const valid = validateInputs('hooks', hooksStatements);
    dispatchToGlobal(setValidCode(valid));
    dispatchToGlobal(updateFile(generateTest({ hooksTestStatement, hooksStatements })));
  }
  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type='button' autoFocus onClick={openModal}>
            New Test +
          </button>
          <button id={styles.example} onClick={fileHandle}>
            Preview
          </button>
          <button id={styles.example} onClick={openScriptModal}>
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          {/* <UploadTest testType="hooks" />
          <GetTests testType="hooks" /> */}
          <Modal
            // passing methods down as props to be used when Modal is opened
            title={title}
            dispatchToMockData={null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchTestCase={title === 'New Test' ? dispatchToHooksTestCase : null}
            createTest={title === 'New Test' ? createNewHooksTest : null}
          />
        </div>
        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button className='hookUpdatesButton' type='button' onClick={handleAddHookUpdates}>
            Hooks
          </button>
          <button id={styles.rightBtn} onClick={saveTest}>
            Save Test
          </button>
        </div>
        <ExportFileModal
          isExportModalOpen={isExportModalOpen}
          setIsExportModalOpen={setIsExportModalOpen}
        />
      </div>
    </div>
  );
};

export default HooksTestMenu;
