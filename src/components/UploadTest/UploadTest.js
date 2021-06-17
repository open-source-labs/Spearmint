/**
 * functionality to save a test into the database
 */

import React, { useState } from 'react';
import styles from './UploadTest.module.scss';
import UploadTestModal from '../Modals/UploadTestModal';

const UploadTest = () => {
  const [uploadTestModalIsOpen, setUploadTestModalIsOpen] = useState(false);

  const handleOpenUploadTestModal = () => {
    setUploadTestModalIsOpen(true);
  };

  return (
    <>
      <button className={styles.saveTestBtn} onClick={handleOpenUploadTestModal}>
        Save Test
      </button>
      {uploadTestModalIsOpen ? (
        <UploadTestModal
          uploadTestModalIsOpen={uploadTestModalIsOpen}
          setUploadTestModalIsOpen={setUploadTestModalIsOpen}
        />
      ) : null}
    </>
  );
};

export default UploadTest;
