import React from 'react';
import ReactModal from 'react-modal';
import { createNewExpressTest } from '../../../context/expressTestCaseActions'
import styles from '../../NavBar/Modals/ExportFileModal.module.scss';


const ExpressTestModal = ({ isExpressModalOpen, closeExpressModal, dispatchToExpressTestCase }) => {
    const handleNewExpressTest = e => {
      dispatchToExpressTestCase(createNewExpressTest());
      closeExpressModal();
    };

    return (
        <ReactModal
          className={styles.modal}
          isOpen={isExpressModalOpen}
          onRequestClose={closeExpressModal}
          contentLabel='Save?'
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div id={styles.title}>
            <p>New Express Test</p>
          </div>
          <div id={styles.body}>
            <p id={styles.text}>
              Do you want to switch to testing express? All unsaved changes <br />
              will be lost.
            </p>
            <span id={styles.newTestButtons}>
              <button id={styles.save} onClick={handleNewExpressTest}>
                Continue
              </button>
              <button id={styles.save} onClick={closeExpressModal}>
                Cancel
              </button>
            </span>
          </div>
        </ReactModal>
      );
}

export default ExpressTestModal;