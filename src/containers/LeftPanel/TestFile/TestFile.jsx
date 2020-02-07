import styles from '../TestCase/TestCase.module.scss';
import React, { useContext } from 'react';

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

  const handleToggleRedux = e => {
    dispatchToReduxTestCase(toggleRedux(e.currentTarget.checked));
  };

  const handleToggleReact = e => {
    dispatchToTestCase(toggleReact(e.currentTarget.checked));
  };

  const handleToggleEndpoint = e => {
    dispatchToEndpointTestCase(toggleEndpoint(e.currentTarget.checked))
  };

  const handleToggleHooks = e => {
    dispatchToHooksTestCase(toggleHooks(e.currentTarget.checked));
  };

  return (
    <div>
      <section>
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
      </section>

      {hasRedux && ( 
        <section >
          <ReduxTestCase/>
        </section>
      )}

      {hasReact && (
        <section>
          <TestCase />
        </section>
      )}

      {hasEndpoint && ( 
        <section >
          <EndpointTestCase/>
        </section >
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
