import React from 'react';
import ReactModal from 'react-modal';
//import { createNewTest } from '../../../context/testCaseActions';
import { createNewReduxTest } from '../../../context/reduxTestCaseActions'
//import { clearMockData } from '../../../context/mockDataActions';
import styles from '../../NavBar/Modals/ExportFileModal.module.scss';


const ReduxTestModal = ({ isReduxModalOpen, closeReduxModal, dispatchToReduxTestCase }) => {
    const handleNewReduxTest = e => {
      //dispatchToMockData(clearMockData());
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
            <p>New Redux Test</p>
          </div>
          <div id={styles.body}>
            <p id={styles.text}>
              Do you want to switch to testing redux? All unsaved changes <br />
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
}

export default ReduxTestModal;