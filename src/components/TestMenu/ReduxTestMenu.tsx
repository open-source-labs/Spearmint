import React, { useEffect, useContext } from 'react';
import styles from './TestMenu.module.scss';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  openBrowserDocs,
  setTestCase,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import {
  addAsync,
  addReducer,
  addActionCreator,
  addMiddleware,
  createNewReduxTest,
} from '../../context/actions/reduxTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import UploadTest from '../UploadTest/UploadTest';
import GetTests from '../GetTests/GetTests';
import TestMenuButtons from './TestMenuButtons';

const ReduxTestMenu = () => {
  const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('redux');
  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);
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
    dispatchToGlobal(updateFile(generateTest({ reduxStatements, reduxTestStatement })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest({ reduxTestStatement, reduxStatements })));

  return (
    <>
      <TestMenuButtons 
        openModal={openModal}
        fileHandle={fileHandle}
        openScriptModal={openScriptModal}
        saveTest={openModal}
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
    </>
    //       {/* <UploadTest testType='redux' />
    //       <GetTests testType='redux' /> */}
         
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
    //     </div>
    //   </div>
    // </div>
  );
};

export default ReduxTestMenu;
