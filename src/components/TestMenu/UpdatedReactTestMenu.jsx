import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import {
  createNewTest,
  resetTests,
} from '../../context/actions/updatedFrontendFrameworkTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/updatedUseGenerateTest.jsx';
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
import TestMenuButtons from './TestMenuButtons';
import { useToggleModal, validateInputs } from './testMenuHooks';
import { clearMockData } from '../../context/actions/mockDataActions';
import { RTFsContexts } from '../../context/RTFsContextsProvider';

const { ipcRenderer } = require('electron');

const UpdatedReactTestMenu = () => {
  // React testing docs url
  const reactUrl =
    'https://testing-library.com/docs/react-testing-library/example-intro';
  const { reactTestFileState, rTFDispatch, handleAddBlock } =
    useContext(RTFsContexts);
  const {
    title,
    isModalOpen,
    openModal,
    openScriptModal,
    closeModal,
    setIsModalOpen,
  } = useToggleModal('react');
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [
    { projectFilePath, file, exportBool, isTestModalOpen, fileName },
    dispatchToGlobal,
  ] = useContext(GlobalContext);
  const generateTest = useGenerateTest('updatedReact', projectFilePath);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false);

  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reactUrl));
  };

  const fileHandle = () => {
    const testGeneration = generateTest(reactTestFileState, mockData);
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
  };

  // functionality when user clicks Save Test button
  const saveTest = () => {
    const valid = validateInputs('react', reactTestFileState);
    dispatchToGlobal(setValidCode(valid));

    const newFilePath = `${projectFilePath}/__tests__/${fileName}`;
    const updatedData = fileHandle();
    // check to see if user has saved test before. If not, then open ExportFileModal
    if (!newFilePath.includes('test.js') || !userSavedTest) {
      dispatchToGlobal(toggleExportBool());
      setIsExportModalOpen(true);
      setUserSavedTest(true);
    }

    // if user already has a saved test file, rewrite the file with the updated data
    if (newFilePath.includes('test.js') && userSavedTest) {
      ipcRenderer.sendSync(
        'ExportFileModal.fileCreate',
        newFilePath,
        updatedData
      );
    }
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  const handleResetTests = () => {
    rTFDispatch(resetTests());
    dispatchToMockData(clearMockData());
  };
  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest(reactTestFileState, mockData)));

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
        ariaHideApp={false}
        title={title}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeModal={closeModal}
        dispatchMockData={dispatchToMockData}
        dispatchTestCase={rTFDispatch}
        createTest={createNewTest}
      />
    </>
  );
};

export default UpdatedReactTestMenu;
