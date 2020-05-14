import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewEndpointTest } from '../../../context/endpointTestCaseActions';
import styles from '../../NavBar/Modals/ExportFileModal.module.scss';
import { toggleModal } from '../../../context/testFileModalActions';
import { TestFileModalContext } from '../../../context/testFileModalReducer';

const EndpointTestModal = ({
  isEndpointModalOpen,
  closeEndpointModal,
  dispatchToEndpointTestCase,
}) => {
  const [, dispatchToTestFileModal] = useContext(TestFileModalContext);

  const handleNewEndpointTest = e => {
    dispatchToEndpointTestCase(createNewEndpointTest());
    closeEndpointModal();
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
      isOpen={isEndpointModalOpen}
      onRequestClose={closeEndpointModal}
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
          <button id={styles.save} onClick={handleNewEndpointTest}>
            Continue
          </button>
          <button id={styles.save} onClick={closeEndpointModal}>
            Cancel
          </button>
        </span>
      </div>
    </ReactModal>
  );
};

export default EndpointTestModal;
