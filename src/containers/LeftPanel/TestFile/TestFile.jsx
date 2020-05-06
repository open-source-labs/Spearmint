import styles from '../../NavBar/Modals/ExportFileModal.module.scss';
import React, { useContext, useState, useEffect } from 'react';
import ReactModal from 'react-modal';

/* testCase imports */
import TestCase from '../TestCase/TestCase';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { toggleReact } from '../../../context/testCaseActions';

/* reduxTestCase imports */
import { toggleRedux } from '../../../context/reduxTestCaseActions';
import { ReduxTestCaseContext } from '../../../context/reduxTestCaseReducer';
import ReduxTestCase from '../TestCase/ReduxTestCase';

/* hooksTestCase imports */
import { toggleHooks } from '../../../context/hooksTestCaseActions';
import { HooksTestCaseContext } from '../../../context/hooksTestCaseReducer';
import HooksTestCase from '../TestCase/HooksTestCase';

/* endpointTestCase imports */
import { toggleEndpoint } from '../../../context/endpointTestCaseActions';
import { EndpointTestCaseContext } from '../../../context/endpointTestCaseReducer';
import EndpointTestCase from '../TestCase/EndpointTestCase';

import { toggleModal } from '../../../context/testFileModalActions';
import { TestFileModalContext } from '../../../context/testFileModalReducer';

const TestFile = () => {
  const [{ hasRedux }, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);
  const [{ hasReact }, dispatchToTestCase] = useContext(TestCaseContext);
  const [{ hasHooks }, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  const [{ hasEndpoint }, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  const [{ isTestModalOpen }, dispatchToTestFileModal] = useContext(TestFileModalContext);

  const closeTestModal = () => {
    dispatchToTestFileModal(toggleModal());
  };

  const handleToggleRedux = e => {
    dispatchToReduxTestCase(toggleRedux());
    closeTestModal();
  };

  const handleToggleReact = e => {
    dispatchToTestCase(toggleReact());
    closeTestModal();
  };

  const handleToggleEndpoint = e => {
    dispatchToEndpointTestCase(toggleEndpoint());
    closeTestModal();
  };

  const handleToggleHooks = e => {
    dispatchToHooksTestCase(toggleHooks());
    closeTestModal();
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
        isOpen={isTestModalOpen}
        onRequestClose={closeTestModal}
        contentLabel='Save?'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        style={modalStyles}
      >
        <div id={styles.title}>
          <p>Test</p>
        </div>
        <div id={styles.body}>
          <p id={styles.text}>What would you like to test?</p>
          <span id={styles.newTestButtons}>
            <button id={styles.save} onClick={handleToggleReact}>
              React
            </button>
            <button id={styles.save} onClick={handleToggleRedux}>
              Redux
            </button>
            <button id={styles.save} onClick={handleToggleHooks}>
              Hooks/Context
            </button>
            <button id={styles.save} onClick={handleToggleEndpoint}>
              Endpoint
            </button>
          </span>
        </div>
      </ReactModal>

      {hasRedux > 0 && (
        <section>
          <ReduxTestCase />
        </section>
      )}

      {hasReact > 0 && (
        <section>
          <TestCase />
        </section>
      )}

      {hasEndpoint > 0 && (
        <section>
          <EndpointTestCase />
        </section>
      )}

      {hasHooks > 0 && (
        <section>
          <HooksTestCase />
        </section>
      )}
    </div>
  );
};

export default TestFile;
