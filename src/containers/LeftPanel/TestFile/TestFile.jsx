import styles from '../TestCase/TestCase.module.scss';
import styles2 from '../../NavBar/Modals/ExportFileModal.module.scss';
import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import HooksTestMenu from '../TestMenu/HooksTestMenu';
import HooksTestModal from '../../NavBar/Modals/HooksTestModal';

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

const TestFile = () => {
  const [{ hasRedux }, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);
  const [{ hasReact }, dispatchToTestCase] = useContext(TestCaseContext);
  const [{ hasHooks }, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  const [{ hasEndpoint }, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  const [isTestModalOpen, setIsTestModalOpen] = useState(true);

  const openTestModal = () => {
    setIsTestModalOpen(true);
  };

  const closeTestModal = () => {
    setIsTestModalOpen(false);
  };

  const handleToggleRedux = e => {
    dispatchToReduxTestCase(toggleRedux());
    dispatchToReduxTestCase(hasRedux);
    closeTestModal();
  };

  const handleToggleReact = e => {
    dispatchToTestCase(toggleReact());
    dispatchToTestCase(hasReact);
    closeTestModal();
  };

  const handleToggleEndpoint = e => {
    dispatchToEndpointTestCase(toggleEndpoint());
    dispatchToEndpointTestCase(hasEndpoint);
    closeTestModal();
  };

  const handleToggleHooks = e => {
    dispatchToHooksTestCase(toggleHooks());
    dispatchToHooksTestCase(hasHooks);
    closeTestModal();
  };

  return (
    <div>
      <ReactModal
        className={styles2.modal}
        isOpen={isTestModalOpen}
        onRequestClose={closeTestModal}
        contentLabel='Save?'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <div id={styles2.title}>
          <p>Test</p>
        </div>
        <div id={styles2.body}>
          <p id={styles2.text}>What would you like to test?</p>
          <span id={styles2.newTestButtons}>
            <button id={styles2.save} onClick={handleToggleReact}>
              React
            </button>
            <button id={styles2.save} onClick={handleToggleRedux}>
              Redux
            </button>
            <button id={styles2.save} onClick={handleToggleHooks}>
              Hooks/Context
            </button>
            <button id={styles2.save} onClick={handleToggleEndpoint}>
              Endpoints
            </button>
          </span>
        </div>
      </ReactModal>
      {/* <section>
        <span>
          <input type='checkbox' checked={hasRedux} onChange={handleToggleRedux} />
          <label htmlFor='mock-data-checkbox' id={styles.checkboxLabel}>
            Are You Testing Redux?
          </label>
        </span>
      </section>

      <section>
        <span>
          <input type='checkbox' checked={hasReact} onChange={handleToggleReact} />
          <label htmlFor='mock-data-checkbox' id={styles.checkboxLabel}>
            Are You Testing React?
          </label>
        </span>
      </section>

      <section>
        <span>
          <input 
          type='checkbox'
          checked={hasEndpoint}
          onChange={handleToggleEndpoint}
          />
          <label htmlFor='mock-data-checkbox' id={styles.checkboxLabel}>
            Are You Testing Endpoint?
          </label>
          </span>
      </section>

      <section>
        <span>
          <input type='checkbox' checked={hasHooks} onChange={handleToggleHooks} />
          <label htmlFor='mock-data-checkbox' id={styles.checkboxLabel}>
            Are You Testing Hooks / Context?
          </label>
        </span>
      </section> */}

      {hasRedux && (
        <section>
          <ReduxTestCase />
        </section>
      )}

      {hasReact && (
        <section>
          <TestCase />
        </section>
      )}

      {hasEndpoint && (
        <section>
          <EndpointTestCase />
        </section>
      )}

      {hasHooks && (
        <section>
          <HooksTestCase />
        </section>
      )}
    </div>
  );
};

export default TestFile;
