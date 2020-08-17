import React, { useState, useContext } from 'react';
import styles from './TestMenu.module.scss';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
import {
  addAsync,
  addReducer,
  addActionCreator,
  addMiddleware,
} from '../../context/actions/reduxTestCaseActions';
import ReduxTestModal from '../Modals/ReduxTestModal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';

const ReduxTestMenu = () => {
  // Redux testing docs url
  const reduxUrl = 'https://redux.js.org/recipes/writing-tests';

  /* making new state for this componenet, naming it isMOdalOpen, making method for it called setIsModalOpen, setting initial state to false */
  const [isReduxModalOpen, setIsReduxModalOpen] = useState(false);
  const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext<any>(GlobalContext);

  const openReduxModal = () => {
    setIsReduxModalOpen(true);
  };

  const closeReduxModal = () => {
    setIsReduxModalOpen(false);
  };

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

  const generateTest = useGenerateTest('redux', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ reduxStatements, reduxTestStatement })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };

  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest({ reduxStatements, reduxTestStatement })));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openReduxModal}>New Test +</button>
          <button id={styles.preview} onClick={fileHandle}>
            Preview
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          <ReduxTestModal
            isReduxModalOpen={isReduxModalOpen}
            closeReduxModal={closeReduxModal}
            dispatchToReduxTestCase={dispatchToReduxTestCase}
          />
          {/* Just send user to docs on button click */}
        </div>
        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button data-testid='reducerButton' onClick={handleAddReducer}>
            Reducer
          </button>
          <button data-testid='actionCreatorButton' onClick={handleAddActionCreator}>
            Action Creator
          </button>
          <button data-testid='asyncButton' onClick={handleAddAsync}>
            Async Action Creator
          </button>
          <button data-testid='middlewareButton' onClick={handleAddMiddleware}>
            Middleware
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReduxTestMenu;
