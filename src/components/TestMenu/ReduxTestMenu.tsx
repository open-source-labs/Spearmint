import React, { useState, useEffect, useContext } from 'react';
import styles from './TestMenu.module.scss';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  openBrowserDocs,
  setTestCase,
  toggleModal,
  toggleExportBool,
  setTabIndex,
} from '../../context/actions/globalActions';
import {
  addAsync,
  addReducer,
  addActionCreator,
  addMiddleware,
  createNewReduxTest,
  resetTests
} from '../../context/actions/reduxTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import UploadTest from '../UploadTest/UploadTest';
import GetTests from '../GetTests/GetTests';
import TestMenuButtons from './TestMenuButtons';
import ExportFileModal from '../Modals/ExportFileModal';
const { ipcRenderer } = require('electron')


// imports were declared in previous iterations, but were never used
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const ReduxTestMenu = () => {
  const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('redux');
  const [{ projectFilePath, file, fileName, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [userSavedTest, setUserSavedTest] = useState(false)
  const generateTest = useGenerateTest('redux', projectFilePath);

  // Redux testing docs url
  const reduxUrl = 'https://redux.js.org/recipes/writing-tests';

  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  const handleAddMiddleware = () => {
    dispatchToReduxTestCase(addMiddleware());
  };

  const handleAddActionCreator = () => {
    dispatchToReduxTestCase(addActionCreator());
  };

  const handleAddAsync = () => {
    dispatchToReduxTestCase(addAsync());
  };

  const handleAddReducer = () => {
    dispatchToReduxTestCase(addReducer());
  };

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
        dispatchTestCase={dispatchToReduxTestCase}
        createTest={createNewReduxTest}
      />
      {/* marked for deletion */}
      {/* <ExportFileModal
        isExportModalOpen={isExportModalOpen}
        setIsExportModalOpen={setIsExportModalOpen}
      /> */}
    </>
    //       {/* <UploadTest testType='redux' />
    //       <GetTests testType='redux' /> */}
    // <div id='test'>
    //   <div id={styles.testMenu}>
    //     <div id={styles.left}>
    //       <button onClick={openModal} autoFocus >New Test +</button>
    //       <button id={styles.preview} onClick={fileHandle}>
    //         Preview
    //       </button>
    //       <button id={styles.example} onClick={openScriptModal}>
    //         Run Test
    //       </button>
    //       <button id={styles.example} onClick={openDocs}>
    //         Need Help?
    //       </button>

    //     </div>
    //     <div
    //       id={styles.right}
    //       style={{
    //         display: 'flex',
    //         flexWrap: 'wrap',
    //         justifyContent: 'center',
    //       }}
    //     >
    //       <button data-testid='reducerButton' onClick={handleAddReducer}>
    //         Reducer
    //       </button>
    //       <button data-testid='actionCreatorButton' onClick={handleAddActionCreator}>
    //         Action Creator
    //       </button>
    //       <button data-testid='asyncButton' onClick={handleAddAsync}>
    //         Async Action Creator
    //       </button>
    //       <button data-testid='middlewareButton' onClick={handleAddMiddleware}>
    //         Middleware
    //       </button>
    //       <button id={styles.rightBtn} onClick={saveTest}>
    //         Save Test
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ReduxTestMenu;
