import React, { useEffect, useContext, useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest } from '../../context/actions/vueTestCaseActions';
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
import { VueTestCaseContext } from '../../context/reducers/vueTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import ExportFileModal from '../Modals/ExportFileModal';
const { ipcRenderer } = require('electron')

// Was commented out in legacy code
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const VueTestMenu = () => {
  // Vue testing docs url
  const vueUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('vue');
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [vueTestCase, dispatchToVueTestCase] = useContext(VueTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName }, dispatchToGlobal] =
    useContext(GlobalContext);
  const generateTest = useGenerateTest('vue', projectFilePath);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false);


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
    const updatedData = fileHandle()

    // check to see if user has saved test before. If not, then open ExportFileModal
    if (!userSavedTest) {
      dispatchToGlobal(toggleExportBool())
      setIsExportModalOpen(true)
    }
    
    // store the file path of the new saved test file
    const newFilePath = `${projectFilePath}/__tests__/${fileName}`;

    // if user has already clicked Save Test, rewrite the file with the updated data
    if (userSavedTest) {
      ipcRenderer.sendSync('ExportFileModal.fileCreate', newFilePath, updatedData)
    }

    // set userSavedTest state to true once user has clicked Save Test button
    setUserSavedTest(true);
  }

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(vueTestCase, mockData)));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal} autoFocus>
            New Test +
          </button>
          <button onClick={fileHandle}>Preview</button>
          <button id={styles.example} onClick={openScriptModal}>
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          <Modal
            title={title}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchMockData={dispatchToMockData}
            dispatchTestCase={dispatchToVueTestCase}
            createTest={createNewTest}
          />
          {/* Just send user to docs on button click */}
        </div>

        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button data-testid='addDescribeButton' onClick={handleAddDescribeBlock}>
            +Describe Block
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

export default VueTestMenu;
