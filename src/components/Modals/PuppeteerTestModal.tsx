import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewPuppeteerTest } from '../../context/actions/puppeteerTestCaseActions';
import styles from './ExportFileModal.module.scss';
import { PuppeteerTestModalProps } from '../../utils/puppeteerTypes';

import { toggleModal } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';

const PuppeteerTestModal = ({
  isPuppeteerModalOpen,
  closePuppeteerModal,
  dispatchToPuppeteerTestCase,
}: PuppeteerTestModalProps) => {
  const [, dispatchToGlobal] = useContext<any>(GlobalContext);

  const handleNewPuppeteerTest = () => {
    dispatchToPuppeteerTestCase(createNewPuppeteerTest());
    closePuppeteerModal();
    dispatchToGlobal(toggleModal());
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
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      ariaHideApp={false}
      style={modalStyles}
    >
      <div id={styles.title}>
        <p>New Test</p>
      </div>
      <div id={styles.body}>
        <p id={styles.text}>
          Do you want to start a new test? All unsaved changes
          <br />
          will be lost.
        </p>
        <span id={styles.newTestButtons}>
          <button type='button' id={styles.save} onClick={handleNewPuppeteerTest}>
            Continue
          </button>
          <button type='button' id={styles.save} onClick={closePuppeteerModal}>
            Cancel
          </button>
        </span>
      </div>
    </ReactModal>
  );
};

export default PuppeteerTestModal;
