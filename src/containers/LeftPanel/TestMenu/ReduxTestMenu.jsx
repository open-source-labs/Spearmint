import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import {
  addAsync,
  addReducer,
  addActionCreator,
  addMiddleware,
} from '../../../context/reduxTestCaseActions';
import ReduxTestModal from '../../NavBar/Modals/ReduxTestModal';

const ReduxTestMenu = ({ dispatchToReduxTestCase }) => {
  /* making new state for this componenet, naming it isMOdalOpen, making method for it called setIsModalOpen, setting initial state to false */
  const [isReduxModalOpen, setIsReduxModalOpen] = useState(false);

  const openReduxModal = () => {
    setIsReduxModalOpen(true);
  };

  const closeReduxModal = () => {
    setIsReduxModalOpen(false);
  };

  const handleAddMiddleware = e => {
    dispatchToReduxTestCase(addMiddleware());
  };
  const handleAddActionCreator = e => {
    dispatchToReduxTestCase(addActionCreator());
  };
  const handleAddAsync = e => {
    dispatchToReduxTestCase(addAsync());
  };
  const handleAddReducer = e => {
    dispatchToReduxTestCase(addReducer());
  };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openReduxModal}>New Test +</button>
          <ReduxTestModal
            isReduxModalOpen={isReduxModalOpen}
            closeReduxModal={closeReduxModal}
            dispatchToReduxTestCase={dispatchToReduxTestCase}
          />
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
