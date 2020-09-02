import styles from '../../components/Modals/ExportFileModal.module.scss';
import React, { useContext, useReducer, Fragment } from 'react';
import ReactModal from 'react-modal';

//may be able to delete toggleReact, etc. from their respective action files

import ReactTestCase from '../../components/TestCase/ReactTestCase';

import {
  ReduxTestCaseContext,
  reduxTestCaseState,
  reduxTestCaseReducer,
} from '../../context/reducers/reduxTestCaseReducer';
import ReduxTestCase from '../../components/TestCase/ReduxTestCase';

import {
  HooksTestCaseContext,
  hooksTestCaseState,
  hooksTestCaseReducer,
} from '../../context/reducers/hooksTestCaseReducer';
import HooksTestCase from '../../components/TestCase/HooksTestCase';

import {
  EndpointTestCaseContext,
  endpointTestCaseState,
  endpointTestCaseReducer,
} from '../../context/reducers/endpointTestCaseReducer';
import EndpointTestCase from '../../components/TestCase/EndpointTestCase';

import {
  puppeteerTestCaseState,
  puppeteerTestCaseReducer,
  PuppeteerTestCaseContext,
} from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestCase from '../../components/TestCase/PuppeteerTestCase';

import {
  MockDataContext,
  mockDataState,
  mockDataReducer,
} from '../../context/reducers/mockDataReducer';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { setTestCase, toggleModal } from '../../context/actions/globalActions';

const TestFile = () => {
  let [{ testCase, isTestModalOpen }, dispatchToGlobal] = useContext(GlobalContext);
  const [mockData, dispatchToMockData] = useReducer(mockDataReducer, mockDataState);

  const [endpointTestCase, dispatchToEndpointTestCase] = useReducer(
    endpointTestCaseReducer,
    endpointTestCaseState
  );

  const [reduxTestCase, dispatchToReduxTestCase] = useReducer(
    reduxTestCaseReducer,
    reduxTestCaseState
  );
  const [hooksTestCase, dispatchToHooksTestCase] = useReducer(
    hooksTestCaseReducer,
    hooksTestCaseState
  );
  const [puppeteerTestCase, dispatchToPuppeteerTestCase] = useReducer(
    puppeteerTestCaseReducer,
    puppeteerTestCaseState
  );

  const closeTestModal = () => {
    dispatchToGlobal(toggleModal());
  };

  const handleToggle = (test) => {
    dispatchToGlobal(setTestCase(test));
    closeTestModal();
  };

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  return (
    // landing modal which displays button choices
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
          <ReduxTestCaseContext.Provider value={[reduxTestCase, dispatchToReduxTestCase]}>
            <ReduxTestCase />
          </ReduxTestCaseContext.Provider>
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
          <EndpointTestCaseContext.Provider value={[endpointTestCase, dispatchToEndpointTestCase]}>
            <EndpointTestCase />
          </EndpointTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'hooks' && (
        <section>
          <HooksTestCaseContext.Provider value={[hooksTestCase, dispatchToHooksTestCase]}>
            <HooksTestCase />
          </HooksTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'puppeteer' && (
        <section>
          <PuppeteerTestCaseContext.Provider
            value={[puppeteerTestCase, dispatchToPuppeteerTestCase]}
          >
            <PuppeteerTestCase />
          </PuppeteerTestCaseContext.Provider>
        </section>
      )}

      {testCase === '' && (
        <Fragment>
          <div id={styles.left}>
            <br></br>
            <br></br>
            <h2>Click on New Test below to get started!</h2>
            <br></br>
          </div>
          <div id={styles.testMenu}>
            <div id={styles.left}>
              <button id={styles.newTestBtn} onClick={closeTestModal}>
                New Test +
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default TestFile;
