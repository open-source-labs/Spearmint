import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import styles from './ExportFileModal.module.scss';
import { toggleModal, setTestCase, updateFile } from '../../context/actions/globalActions';
import { clearMockData } from '../../context/actions/mockDataActions';
import { GlobalContext } from '../../context/reducers/globalReducer';

const Modal = ({ isModalOpen, closeModal, dispatchTestCase, createTest }, ...props) => {
  const [, dispatchToGlobal] = useContext(GlobalContext);

  const handleTest = (e) => {
    if (props.dispatchToMockData) props.dispatchToMockData(clearMockData);
    dispatchTestCase(createTest());
    closeModal();
    dispatchToGlobal(setTestCase(''));
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
          <button id={styles.save} onClick={handleTest}>
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

export default Modal;
