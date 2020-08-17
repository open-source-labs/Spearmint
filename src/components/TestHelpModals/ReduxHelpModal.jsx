import React, { useContext } from 'react';
import { closeInfoModal } from '../../context/actions/reduxTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import ReactModal from 'react-modal';
import styles from '../../components/TestHelpModals/ReduxHelpModal.module.scss';
const closeIcon = require('../../assets/images/close.png');
const describe = require('../../assets/images/describe.png');

const ReduxHelpModal = () => {
  const [_, dispatchToGlobal] = useContext(GlobalContext);
  // Redux testing docs url
  const reduxUrl = 'https://redux.js.org/recipes/writing-tests';

  const [{ modalOpen }, dispatchToTestCase] = useContext(ReduxTestCaseContext);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reduxUrl));
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

export default ReduxHelpModal;
