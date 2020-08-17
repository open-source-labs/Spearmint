import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { closeInfoModal } from '../../context/actions/reactTestCaseActions';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import styles from './HooksHelpModal.module.scss';

const closeIcon = require('../../assets/images/close.png');
const describe = require('../../assets/images/describe.png');

const HooksHelpModal = () => {
  const [, dispatchToGlobal] = useContext(GlobalContext);
  // Hooks testing docs url
  const hooksUrl = 'https://react-hooks-testing-library.com/usage/basic-hooks';

  const [{ modalOpen }, dispatchToTestCase] = useContext(HooksTestCaseContext);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(hooksUrl));
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
      <img src={closeIcon} onClick={closeModal} alt='x' />
      <h2>Describe(name, fn)</h2>
      <p>
        Describe creates a block that groups together several related tests. The name argument is
        simply the name of component you're testing. fn argument is the test callback function{' '}
      </p>
      <img src={describe} alt='describe' />
      <a onClick={openDocs}>Need More Help?</a>
    </ReactModal>
  );
};

export default HooksHelpModal;
