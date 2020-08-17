import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import {
  addAsync,
  addReducer,
  addActionCreator,
  addMiddleware,
  createNewReduxTest,
} from '../../context/actions/reduxTestCaseActions';
import NewTestModal from '../Modals/NewTestModal';

interface ReduxTestMenuProps {
  dispatchToReduxTestCase: (action: object) => void;
}

const ReduxTestMenu = ({ dispatchToReduxTestCase }: ReduxTestMenuProps) => {
  const [_, dispatchToGlobal] = useContext<any>(GlobalContext);
  // Redux testing docs url
  const reduxUrl = 'https://redux.js.org/recipes/writing-tests';

  /* making new state for this componenet, naming it isMOdalOpen, making method for it called setIsModalOpen, setting initial state to false */
  const [isReduxModalOpen, setIsReduxModalOpen] = useState(false);

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

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openReduxModal}>New Test +</button>
          <NewTestModal
            dispatchToMockData={null}
            createNewTest={createNewReduxTest}
            isModalOpen={isReduxModalOpen}
            closeModal={closeReduxModal}
            dispatchToTestCase={dispatchToReduxTestCase}
          />
          {/* Just send user to docs on button click */}
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
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
