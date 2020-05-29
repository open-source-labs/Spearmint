import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewHooksTest } from '../../context/actions/hooksTestCaseActions';
import styles from './ExportFileModal.module.scss';
import { toggleModal } from '../../context/actions/testFileModalActions';
import { TestFileModalContext } from '../../context/reducers/testFileModalReducer';
import { HooksTestModalProps } from '../../utils/hooksTypes';

const HooksTestModal = ({
  isHooksModalOpen,
  closeHooksModal,
  dispatchToHooksTestCase,
}: HooksTestModalProps) => {
  const [, dispatchToTestFileModal] = useContext<any>(TestFileModalContext);
  const handleNewHooksTest = () => {
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
        contentLabel="Save?"
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
            <div>
              <button type="button" id={styles.save} onClick={handleNewHooksTest}>
                Continue
              </button>
            </div>
            <button type="button" id={styles.save} onClick={closeHooksModal}>
              Cancel
            </button>
          </span>
        </div>
      </ReactModal>
    </div>
  );
};

export default HooksTestModal;
