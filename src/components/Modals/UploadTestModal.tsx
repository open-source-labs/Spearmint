import React, { useState, useContext } from 'react';
import ReactModal from '/react-modal';
import { AccTestCaseContext } from '../../context/reducers/accTestCaseReducer';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import styles from './Modal.module.scss';

/**
 * This react component UploadTestModal renders a modal that allows the user to save a test case to the database
 * @returns A modal that allows the user to save a test case.
 */

interface UploadTestModalProps {
  uploadTestModalIsOpen: React.Dispatch<Element>;
  setUploadTestModalIsOpen: React.Dispatch<boolean>;
  testType: string;
}

const UploadTestModal = ({ uploadTestModalIsOpen, setUploadTestModalIsOpen, testType }: UploadTestModalProps) => {
  const [testName, setTestName] = useState('');
  const [accTestCase] = useContext(AccTestCaseContext);
  const [endpointTestCase] = useContext(EndpointTestCaseContext);
  const [hooksTestCase] = useContext(HooksTestCaseContext);
  const [puppeteerTestCase] = useContext(PuppeteerTestCaseContext);
  const [reactTestCase] = useContext(ReactTestCaseContext);
  const [reduxTestCase] = useContext(ReduxTestCaseContext);

/**
 * Closes the upload modal
 */
  const closeUploadModal = () => {
    setUploadTestModalIsOpen(false);
  };

  const handleChangeTestName = (e: React.BaseSyntheticEvent<KeyboardEvent>) => {
    setTestName(e.target.value);
  };

  const handleClickSave = () => {
    let testState;
    switch (testType) {
      case 'acc':
        testState = accTestCase;
        break;
      case 'endpoint test':
        testState = endpointTestCase;
        break;
      case 'hooks':
        testState = hooksTestCase;
        break;
      case 'puppeteer':
        testState = puppeteerTestCase;
        break;
      case 'react':
        testState = reactTestCase;
        break;
      case 'redux':
        testState = reduxTestCase;
        break;
      default:
        testState = [];
        break;
    }

    fetch('http://spearmint.us-west-1.elasticbeanstalk.com/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testName, testType, testState }),
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
        <div id={styles.container}>
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
        </div>
    </ReactModal>
  );
};

export default UploadTestModal;
