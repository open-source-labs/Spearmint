import React, { useState, useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs, setTabIndex } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest } from '../../context/actions/accTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  setTestCase,
  toggleExportBool,
  toggleModal,
} from '../../context/actions/globalActions';
import { AccTestCaseContext } from '../../context/reducers/accTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import ExportFileModal from '../Modals/ExportFileModal';
const { ipcRenderer } = require('electron')

// Was commented out in legacy code
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const AccTestMenu = () => {
  // link to accessibility testing docs url
  const accUrl = 'https://www.deque.com/axe/core-documentation/api-documentation/';

  // initialize hooks
  const { title, isModalOpen, openModal, openScriptModal, closeModal, } = useToggleModal('acc');
  const [accTestCase, dispatchToAccTestCase] = useContext(AccTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen, fileName }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)
  const generateTest = useGenerateTest('acc', projectFilePath);

  // setValidCode to true on load.
  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  // handle change to add a Describe Block
  const handleAddDescribeBlock = () => {
    dispatchToAccTestCase(addDescribeBlock());
  };

  // handle change to open accessibility URL docs on right panel
  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(accUrl));
  };

  // functionality when user clicks Preview
  const fileHandle = () => {
    const testGeneration = generateTest(accTestCase)
    
    // generates test code using UseGenerateTest.jsx and displays it in the Code Editor View
    dispatchToGlobal(updateFile(testGeneration));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
    return testGeneration;
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

  if (!file && exportBool) {dispatchToGlobal(updateFile(generateTest(accTestCase)))};
 
  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button id={styles.newTestBtn} autoFocus onClick={openModal}>New Test +</button>
          <button onClick={fileHandle}>Preview</button>
          <button id={styles.example} onClick={openScriptModal} >
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          {/* <UploadTest testType="acc" />
          <GetTests testType="acc" /> */}
          <Modal
            title={title}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchToMockData={null}
            dispatchTestCase={dispatchToAccTestCase}
            createTest={createNewTest}
            testType={accTestCase.testType}
            puppeteerUrl={accTestCase.puppeteerUrl}
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
    </div >
  );
}

export default AccTestMenu;