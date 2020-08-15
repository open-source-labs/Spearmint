import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { closeInfoModal } from '../../context/actions/endpointTestCaseActions';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import styles from './TestHelpModal.module.scss';
const closeIcon = require('../../assets/images/close.png');
const describe = require('../../assets/images/describehelp.png');

const EndpointHelpModal = () => {
  const [_, dispatchToGlobal] = useContext(GlobalContext);
  // Hooks testing docs url
  const endpointUrl = 'https://www.npmjs.com/package/supertest';

  const [{ modalOpen }, dispatchToTestCase] = useContext(EndpointTestCaseContext);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(endpointUrl));
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
    >
      <img src={closeIcon} onClick={closeModal} />
      <div id='helpContainer'>
        {/* <h2>Describe(name, fn)</h2>
        <p>
          Describe creates a block that groups together several related tests. The name argument is
          simply the name of component you're testing. fn argument is the test callback function{' '}
        </p> */}
        <img src={describe} />
        <a onClick={openDocs}>Need More Help?</a>
      </div>
    </ReactModal>
  );
};

export default EndpointHelpModal;
