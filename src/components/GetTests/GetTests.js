import React, { useState } from 'react';
import styles from './GetTests.module.scss';
import GetTestsModal from '../Modals/GetTestsModal';

const GetTests = ({ testType }) => {
  const [getTestsModalIsOpen, setGetTestsModalIsOpen] = useState(false);

  const handleOpenGetTestsModal = () => {
    setGetTestsModalIsOpen(true);
  };

  return (
    <span>
      <button className={styles.getTestBtn} onClick={handleOpenGetTestsModal}>
        Get Saved Tests
      </button>
      {getTestsModalIsOpen ? (
        <GetTestsModal
          getTestsModalIsOpen={getTestsModalIsOpen}
          setGetTestsModalIsOpen={setGetTestsModalIsOpen}
          testType={testType}
        />
      ) : null}
    </span>
  );
};

export default GetTests;
