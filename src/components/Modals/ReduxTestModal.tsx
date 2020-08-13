import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createNewReduxTest } from '../../context/actions/reduxTestCaseActions';
import styles from './ExportFileModal.module.scss';
// import { TestFileModalContext } from '../../context/reducers/testFileModalReducer';

import { toggleModal } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';

interface ReduxTestModalProps {
  isReduxModalOpen: boolean;
  closeReduxModal: () => boolean | void;
  dispatchToReduxTestCase: (action: object) => void;
}

const ReduxTestModal = ({
  isReduxModalOpen,
  closeReduxModal,
  dispatchToReduxTestCase,
}: ReduxTestModalProps) => {
  const [, dispatchToGlobal] = useContext<any>(GlobalContext);

  const handleNewReduxTest = () => {
    dispatchToReduxTestCase(createNewReduxTest());
    closeReduxModal();
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
      isOpen={isReduxModalOpen}
      onRequestClose={closeReduxModal}
      contentLabel='Save?' /* whats this? */
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
          <button id={styles.save} onClick={handleNewReduxTest}>
            Continue
          </button>
          <button id={styles.save} onClick={closeReduxModal}>
            Cancel
          </button>
        </span>
      </div>
    </ReactModal>
  );
};

export default ReduxTestModal;
