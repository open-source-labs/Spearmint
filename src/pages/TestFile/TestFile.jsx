import styles from '../../components/Modals/ExportFileModal.module.scss';
import React, { useContext, useReducer } from 'react';
import ReactModal from 'react-modal';

//may be able to delete toggleReact, etc. from their respective action files

// /* testCase imports */
import ReactTestCase from '../../components/TestCase/ReactTestCase';
// import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
// import { toggleReact } from '../../context/actions/reactTestCaseActions';

// /* reduxTestCase imports */
// import { toggleRedux } from '../../context/actions/reduxTestCaseActions';
// import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import ReduxTestCase from '../../components/TestCase/ReduxTestCase';

// /* hooksTestCase imports */
// import { toggleHooks } from '../../context/actions/hooksTestCaseActions';
// import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import HooksTestCase from '../../components/TestCase/HooksTestCase';

// /* endpointTestCase imports */
// import { toggleEndpoint } from '../../context/actions/endpointTestCaseActions';
// import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import EndpointTestCase from '../../components/TestCase/EndpointTestCase';

// /* puppeteerTestCase imports */
// import { togglePuppeteer } from '../../context/actions/puppeteerTestCaseActions';
// import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestCase from '../../components/TestCase/PuppeteerTestCase';

// import { toggleModal } from '../../context/actions/testFileModalActions';
// import { TestFileModalContext } from '../../context/reducers/testFileModalReducer';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { toggleTestCase, toggleModal } from '../../context/actions/globalActions';

import {
  MockDataContext,
  mockDataState,
  mockDataReducer,
} from '../../context/reducers/mockDataReducer';

const TestFile = () => {
  let [{ testCase, isTestModalOpen }, dispatchToGlobal] = useContext(GlobalContext);
  const [mockData, dispatchToMockData] = useReducer(mockDataReducer, mockDataState);

  // const [{ hasRedux }, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);
  // const [{ hasReact }, dispatchToTestCase] = useContext(ReactTestCaseContext);
  // const [{ hasHooks }, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  // const [{ hasEndpoint }, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  // const [{ hasPuppeteer }, dispatchToPuppeteerTestCase] = useContext(PuppeteerTestCaseContext);
  // const [{ isTestModalOpen }, dispatchToTestFileModal] = useContext(TestFileModalContext);

  const closeTestModal = () => {
    dispatchToGlobal(toggleModal());
  };

  // const handleToggleRedux = (e) => {
  //   dispatchToReduxTestCase(toggleRedux());
  //   closeTestModal();
  // };

  // const handleToggleReact = (e) => {
  //   dispatchToTestCase(toggleReact());
  //   closeTestModal();
  // };

  // const handleToggleEndpoint = (e) => {
  //   dispatchToEndpointTestCase(toggleEndpoint());
  //   closeTestModal();
  // };

  // const handleToggleHooks = (e) => {
  //   dispatchToHooksTestCase(toggleHooks());
  //   closeTestModal();
  // };

  // const handleTogglePuppeteer = (e) => {
  //   dispatchToPuppeteerTestCase(togglePuppeteer());
  //   closeTestModal();
  // };

  const handleToggle = (test) => {
    dispatchToGlobal(toggleTestCase(test));
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
            <button id={styles.save} onClick={() => handleToggle('react')}>
              React
            </button>
            <button id={styles.save} onClick={() => handleToggle('redux')}>
              Redux
            </button>
            <button id={styles.save} onClick={() => handleToggle('hooks')}>
              Hooks/Context
            </button>
            <button id={styles.save} onClick={() => handleToggle('endpoint')}>
              Endpoint
            </button>
            <button id={styles.save} onClick={() => handleToggle('puppeteer')}>
              Puppeteer
            </button>
          </span>
        </div>
      </ReactModal>

      {testCase === 'redux' && (
        <section>
          <ReduxTestCase />
        </section>
      )}

      {testCase === 'react' && (
        <section>
          <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
            <ReactTestCase />
          </MockDataContext.Provider>
        </section>
      )}

      {testCase === 'endpoint' && (
        <section>
          <EndpointTestCase />
        </section>
      )}

      {testCase === 'hooks' && (
        <section>
          <HooksTestCase />
        </section>
      )}

      {testCase === 'puppeteer' && (
        <section>
          <PuppeteerTestCase />
        </section>
      )}

      {testCase === '' && (
        <div id={styles.testMenu}>
          <div id={styles.left}>
            <button id={styles.newTestBtn} onClick={closeTestModal}>
              New Test +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestFile;
