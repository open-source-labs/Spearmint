import React, { useContext } from 'react';
import { closeInfoModal } from '../../context/actions/reduxTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import ReactModal from 'react-modal';
import styles from './TestHelpModal.module.scss';
const closeIcon = require('../../assets/images/close.png');
const reduxAction = require('../../assets/images/redux-action.png');
const reduxMiddleware = require('../../assets/images/redux-middleware.png');
const reduxAsync = require('../../assets/images/redux-async.png');

const ReduxHelpModal = () => {
  const [_, dispatchToGlobal] = useContext(GlobalContext);
  // Redux testing docs url
  const reduxUrl = 'https://redux.js.org/recipes/writing-tests';

  const [{ modalOpen }, dispatchToTestCase] = useContext(ReduxTestCaseContext);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reduxUrl));
    dispatchToTestCase(closeInfoModal());
  };

  const closeModal = () => {
    dispatchToTestCase(closeInfoModal());
  };

  return (
    <ReactModal
      className={styles.modal}
      shouldCloseOnEsc={true}
      isOpen={modalOpen}
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      ariaHideApp={false}
    >
      <img src={closeIcon} onClick={closeModal} />

      <h2>Redux Action </h2>
      <img src={reduxAction} />
      <h2>Redux Async </h2>
      <img src={reduxAsync} />
      <h2>Redux Middleware </h2>
      <img src={reduxMiddleware} />
      <button onClick={openDocs}>Need More Help?</button>
    </ReactModal>
  );
};

export default ReduxHelpModal;
