import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import { AccTestCaseContext } from '../../context/reducers/accTestCaseReducer';
import styles from './Modal.module.scss';

const UploadTestModal = ({ uploadTestModalIsOpen, setUploadTestModalIsOpen, testType }) => {
  const [testName, setTestName] = useState('');
  const [accTestCase, dispatchToAccTestCase] = useContext(AccTestCaseContext);

  const closeUploadModal = () => {
    setUploadTestModalIsOpen(false);
  };

  const handleChangeTestName = (e) => {
    setTestName(e.target.value);
  };

  const handleClickSave = () => {
    fetch('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testName, testType, testState: accTestCase }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    closeUploadModal();
  };

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={uploadTestModalIsOpen}
      onRequestClose={closeUploadModal}
      contentLabel='Save testing file'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={modalStyles}
    >
      <div id={styles.title}>
        <p>Save Test Case</p>
        <svg id={styles.close} onClick={closeUploadModal}>
          <path d='M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z' />
        </svg>
      </div>
      <div id={styles.body}>
        <p>File Name</p>
        <input type='text' value={testName} onChange={handleChangeTestName} />
        <button id={styles.save} onClick={closeUploadModal}>
          Cancel
        </button>
        <button id={styles.save} onClick={handleClickSave}>
          Save
        </button>
      </div>
    </ReactModal>
  );
};

export default UploadTestModal;
