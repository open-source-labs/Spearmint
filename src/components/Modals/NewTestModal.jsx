/**
 * modal: pop ups windows on click
 * create new test modal
 */

import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewTest } from '../../context/actions/reactTestCaseActions';
import { clearMockData } from '../../context/actions/mockDataActions';
import styles from './ExportFileModal.module.scss';
import { toggleModal } from '../../context/actions/testFileModalActions';
import { TestFileModalContext } from '../../context/reducers/testFileModalReducer';

/* destructuring or declaring these?  */
const NewTestModal = ({ isModalOpen, closeModal, dispatchToMockData, dispatchToTestCase }) => {
  const [, dispatchToTestFileModal] = useContext(TestFileModalContext);

  const handleNewTest = e => {
    dispatchToMockData(clearMockData());
    dispatchToTestCase(createNewTest());
    closeModal();
    dispatchToTestFileModal(toggleModal());
  };
  
  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };
  
  return (
    <ReactModal
      className={styles.modal}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='Save?'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={modalStyles}
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
          <button id={styles.save} onClick={handleNewTest}>
            Continue
          </button>
          <button id={styles.save} onClick={closeModal}>
            Cancel
          </button>
        </span>
      </div>
    </ReactModal>
  );
};

export default NewTestModal;
