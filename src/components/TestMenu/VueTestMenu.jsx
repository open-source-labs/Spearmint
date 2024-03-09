import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest, resetTests } from '../../context/actions/frontendFrameworkTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  toggleModal,
  toggleExportBool,
  setTabIndex,
} from '../../context/actions/globalActions';
import { VueTestCaseContext } from '../../context/reducers/vueTestCaseReducer';
import TestMenuButtons from './TestMenuButtons';
import { useToggleModal, validateInputs } from './testMenuHooks';
const { ipcRenderer } = require('electron')

const VueTestMenu = () => {
  // Vue testing docs url
  const vueUrl = 'https://next.vue-test-utils.vuejs.org/guide/';

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, isModalOpen, openModal, openScriptModal, closeModal, setIsModalOpen } = useToggleModal('vue');
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [vueTestCase, dispatchToVueTestCase] = useContext(VueTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName }, dispatchToGlobal] =
    useContext(GlobalContext);
  const generateTest = useGenerateTest('vue', projectFilePath);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)


  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  const handleAddDescribeBlock = (e) => {
    dispatchToVueTestCase(addDescribeBlock());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(vueUrl));
  };

  // functionality when user clicks Preview
  const fileHandle = () => {
    const testGeneration = generateTest(vueTestCase, mockData)

    // generates test code using UseGenerateTest.jsx and displays it in the Code Editor View
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };


  // functionality when user clicks Save Test button
  const saveTest = () => {
    const valid = validateInputs('vue', vueTestCase);
    dispatchToGlobal(setValidCode(valid));
    
    const newFilePath = `${projectFilePath}/__tests__/${fileName}`; 
    const updatedData = fileHandle()

    // check to see if user has saved test before. If not, then open ExportFileModal
    if (!newFilePath.includes('test.js') || !userSavedTest) {
      dispatchToGlobal(toggleExportBool())
      setIsExportModalOpen(true)
      setUserSavedTest(true)
    }

    // if user already has a saved test file, rewrite the file with the updated data
    if (newFilePath.includes('test.js') && userSavedTest) {
      ipcRenderer.sendSync('ExportFileModal.fileCreate', newFilePath, updatedData)
    }

  }

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  const handleResetTests = () => {
    dispatchToVueTestCase(resetTests());
  }

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(vueTestCase, mockData)));

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
        dispatchMockData={dispatchToMockData}
        dispatchTestCase={dispatchToVueTestCase}
        createTest={createNewTest}
      />
    </>
  );
};

export default VueTestMenu;
