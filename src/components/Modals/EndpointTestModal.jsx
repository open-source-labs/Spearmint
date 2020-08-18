import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewEndpointTest } from '../../context/actions/endpointTestCaseActions';
import styles from './ExportFileModal.module.scss';
import { toggleModal, updateFile } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';

const EndpointTestModal = ({ isEndpointModalOpen, closeEndpointModal }) => {
  const [, dispatchToGlobal] = useContext(GlobalContext);
  const [, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);

  const handleNewEndpointTest = (e) => {
    dispatchToEndpointTestCase(createNewEndpointTest());
    closeEndpointModal();
    dispatchToGlobal(toggleModal());
    dispatchToGlobal(updateFile(''));
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
