import React from 'react';
import ReactModal from 'react-modal';
import { createNewHooksTest } from '../../../context/hooksTestCaseActions';
import styles from '../../NavBar/Modals/ExportFileModal.module.scss';

const HooksTestModal = ({ isHooksModalOpen, closeHooksModal, dispatchToHooksTestCase }) => {
  const handleNewHooksTest = e => {
    dispatchToHooksTestCase(createNewHooksTest());
    closeHooksModal();
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isHooksModalOpen}
      onRequestClose={closeHooksModal}
      contentLabel='Save?'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div id={styles.title}>
        <p>New Hooks / Context Test</p>
      </div>
      <div id={styles.body}>
        <p id={styles.text}>
          Do you want to switch to testing hooks / context? All unsaved changes <br />
          will be lost.
        </p>
        <span id={styles.newTestButtons}>
          <button id={styles.save} onClick={handleNewHooksTest}>
            Continue
          </button>
          <button id={styles.save} onClick={closeHooksModal}>
            Cancel
          </button>
        </span>
      </div>
    </ReactModal>
  );
};

export default HooksTestModal;
