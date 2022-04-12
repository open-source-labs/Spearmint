import React, { useState, useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest } from '../../context/actions/svelteTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  setTestCase,
  toggleModal,
  toggleExportBool,
  setTabIndex,
} from '../../context/actions/globalActions';
import { SvelteTestCaseContext } from '../../context/reducers/svelteTestCaseReducer';
import TestMenuButtons from './TestMenuButtons';
import { useToggleModal, validateInputs } from './testMenuHooks';
import ExportFileModal from '../Modals/ExportFileModal';
const { ipcRenderer } = require('electron');

// imports were declared in previous iterations, but were never used
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const SvelteTestMenu = () => {
  // svelte testing docs url
  const svelteUrl = 'https://testing-library.com/docs/svelte-testing-library/intro/';

  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('svelte');
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [SvelteTestCase, dispatchToSvelteTestCase] = useContext(SvelteTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName }, dispatchToGlobal] =
    useContext(GlobalContext);
  const generateTest = useGenerateTest('svelte', projectFilePath);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)

  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  const handleAddDescribeBlock = (e) => {
    dispatchToSvelteTestCase(addDescribeBlock());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(svelteUrl));
  };

  const fileHandle = () => {
    const testGeneration = generateTest(SvelteTestCase, mockData);
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };

  // functionality when user clicks Save Test button
  const saveTest = () => {
    const valid = validateInputs('svelte', SvelteTestCase);
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

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(SvelteTestCase, mockData)));

  return (
    <>
      <TestMenuButtons 
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
        dispatchMockData={dispatchToMockData}
        dispatchTestCase={dispatchToSvelteTestCase}
        createTest={createNewTest}
      />
      <ExportFileModal
        isExportModalOpen={isExportModalOpen}
        setIsExportModalOpen={setIsExportModalOpen}
      />
    </>
      

    //     <div
    //       id={styles.right}
    //       style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    //     >
    //       <button data-testid='addDescribeButton' onClick={handleAddDescribeBlock}>
    //         +Describe Block
    //       </button>
    //       <button id={styles.rightBtn} onClick={saveTest}>
    //         Save Test
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SvelteTestMenu;
