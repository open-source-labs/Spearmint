import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewHooksTest } from '../../../context/hooksTestCaseActions';
import styles from '../../NavBar/Modals/ExportFileModal.module.scss';
import { toggleModal } from '../../../context/testFileModalActions';
import { TestFileModalContext } from '../../../context/testFileModalReducer';

const HooksTestModal = ({ isHooksModalOpen, closeHooksModal, dispatchToHooksTestCase }) => {
  const [{ isTestModalOpen }, dispatchToTestFileModal] = useContext(TestFileModalContext);

  const handleNewHooksTest = e => {
    dispatchToHooksTestCase(createNewHooksTest());
    closeHooksModal();
    dispatchToTestFileModal(toggleModal());
  };
  
  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  return (
    <div>
      <ReactModal
        className={styles.modal}
        isOpen={isHooksModalOpen}
        onRequestClose={closeHooksModal}
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
            <div>
              <button id={styles.save} onClick={handleNewHooksTest}>
                Continue
              </button>
            </div>
            <button id={styles.save} onClick={closeHooksModal}>
              Cancel
            </button>
          </span>
        </div>
      </ReactModal>
    </div>
  );
};

export default HooksTestModal;
