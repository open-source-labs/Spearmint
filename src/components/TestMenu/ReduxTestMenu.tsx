import React, { useContext } from 'react';
import styles from './TestMenu.module.scss';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
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
import { openBrowserDocs } from '../../context/actions/globalActions';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { useToggleModal } from './testMenuHooks';

const ReduxTestMenu = () => {
  const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('redux');
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const generateTest = useGenerateTest('redux', projectFilePath);
  // Redux testing docs url
  const reduxUrl = 'https://redux.js.org/recipes/writing-tests';

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
  };

  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest({ reduxStatements, reduxTestStatement })));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal}>New Test +</button>
          <button id={styles.preview} onClick={fileHandle}>
            Preview
          </button>
          <button id={styles.example} onClick={openScriptModal}>
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          <Modal
            // passing methods down as props to be used when Modal is opened
            title={title}
            dispatchToMockData={null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchTestCase={dispatchToReduxTestCase}
            createTest={createNewReduxTest}
          />
          {/* Just send user to docs on button click */}
        </div>
        <div
          id={styles.right}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
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
