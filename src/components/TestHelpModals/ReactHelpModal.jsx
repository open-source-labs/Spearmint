import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { closeInfoModal } from '../../context/actions/reactTestCaseActions';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import styles from '../../components/TestHelpModals/ReactHelpModal.module.scss';

const closeIcon = require('../../assets/images/close.png');
const describe = require('../../assets/images/describe.png');

const ReactHelpModal = () => {
  const [_, dispatchToGlobal] = useContext(GlobalContext);
  // Hooks testing docs url
  const reactUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';

  const [{ modalOpen }, dispatchToTestCase] = useContext(ReactTestCaseContext);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reactUrl));
    dispatchToTestCase(closeInfoModal());
  };

  const closeModal = () => {
    dispatchToTestCase(closeInfoModal());
  };

  return (
    <ReactModal
      className={styles.modal}
      shouldCloseOnEsc={true}
      isOpen={modalOpen}
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      ariaHideApp={false}
    >
      <img src={closeIcon} onClick={closeModal} />
      <h2>Describe(name, fn)</h2>
      <p>
        Describe creates a block that groups together several related tests. The name argument is
        simply the name of component you're testing. fn argument is the test callback function{' '}
      </p>
      <img src={describe} />
      <a onClick={openDocs}>Need More Help?</a>
    </ReactModal>
  );
};

export default ReactHelpModal;
