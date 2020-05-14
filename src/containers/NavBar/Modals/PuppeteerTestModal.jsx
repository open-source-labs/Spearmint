import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewPuppeteerTest } from '../../../context/puppeteerTestCaseActions';
import styles from '../../NavBar/Modals/ExportFileModal.module.scss';
import { toggleModal } from '../../../context/testFileModalActions';
import { TestFileModalContext } from '../../../context/testFileModalReducer';

const PuppeteerTestModal = ({
    isPuppeteerModalOpen,
    closePuppeteerModal,
    dispatchToPuppeteerTestCase,
  }) => {
    const [, dispatchToTestFileModal] = useContext(TestFileModalContext);

    const handleNewPuppeteerTest = e => {
      dispatchToPuppeteerTestCase(createNewPuppeteerTest());
      closePuppeteerModal();
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
        isOpen={isPuppeteerModalOpen}
        onRequestClose={closePuppeteerModal}
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
            <button id={styles.save} onClick={handleNewPuppeteerTest}>
              Continue
            </button>
            <button id={styles.save} onClick={closePuppeteerModal}>
              Cancel
            </button>
          </span>
        </div>
      </ReactModal>
    );
};

export default PuppeteerTestModal;
