import React from 'react';
import ReactModal from 'react-modal';
import { createNewReduxTest } from '../../../context/reduxTestCaseActions';
import styles from '../../NavBar/Modals/ExportFileModal.module.scss';

const ReduxTestModal = ({ isReduxModalOpen, closeReduxModal, dispatchToReduxTestCase }) => {
  const handleNewReduxTest = e => {
    dispatchToReduxTestCase(createNewReduxTest());
    closeReduxModal();
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isReduxModalOpen}
      onRequestClose={closeReduxModal}
      contentLabel='Save?' /* whats this? */
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div id={styles.title}>
        <p>New Test</p>
      </div>
      <div id={styles.body}>
        <p id={styles.text}>
          Do you want to start a new test? All unsaved changes <br />
          will be lost.
        </p>
        <span id={styles.newTestButtons}>
          <button id={styles.save} onClick={handleNewReduxTest}>
            Continue
          </button>
          <button id={styles.save} onClick={closeReduxModal}>
            Cancel
          </button>
        </span>
      </div>
    </ReactModal>
  );
};

export default ReduxTestModal;
