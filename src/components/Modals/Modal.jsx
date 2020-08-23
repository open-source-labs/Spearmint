import React from 'react';
import ReactModal from 'react-modal';
// import { clearMockData } from '../../context/actions/mockDataActions';
import styles from './ExportFileModal.module.scss';
// import { toggleModal, setTestCase, updateFile } from '../../context/actions/globalActions';
// import { GlobalContext } from '../../context/reducers/globalReducer';
import { useCopy, useNewTest, useGenerateScript } from './modalHooks';

// interface drilledProps {
//   isModalOpen?: boolean;
//   closeModal?: any;
//   dispatchToMockData?: any;
//   dispatchTestCase?: any;
//   createTest?: any;
// }

/* destructuring or declaring these?  */
const Modal = ({
  title,
  isModalOpen,
  closeModal,
  dispatchToMockData,
  dispatchTestCase,
  createTest,
}) => {
  // const [{ projectFilePath }, dispatchToGlobal] = useContext(GlobalContext);
  const { copySuccess, codeRef, handleCopy } = useCopy();
  const { handleNewTest } = useNewTest(
    dispatchToMockData,
    dispatchTestCase,
    createTest,
    closeModal
  );
  const script = useGenerateScript(title);

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
        <p>{title === 'New Test' ? title : 'Copy to terminal'}</p>
      </div>
      <div id={styles.body}>
        {title === 'New Test' ? (
          <p id={styles.text}>
            Do you want to start a new test? All unsaved changes <br /> will be lost.{' '}
          </p>
        ) : (
          <pre>
            <div className='code-wrapper'>
              <code ref={codeRef}>{script}</code>
            </div>
          </pre>
        )}
        <span id={styles.newTestButtons}>
          {title === 'New Test' ? (
            <button id={styles.save} onClick={handleNewTest}>
              {title}
            </button>
          ) : (
            <button id={styles.save} onClick={handleCopy}>
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          )}
          <button id={styles.save} onClick={closeModal}>
            Cancel
          </button>
        </span>
      </div>
    </ReactModal>
  );
};

export default Modal;
