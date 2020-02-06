import styles from '../TestCase/TestCase.module.scss';
import React, { useContext } from 'react';

/* testCase imports */
import TestCase from '../TestCase/TestCase';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { toggleReact } from '../../../context/testCaseActions';

/* reduxTestCase imports */
import { toggleRedux } from '../../../context/reduxTestCaseActions';
import { ReduxTestCaseContext } from '../../../context/reduxTestCaseReducer';
import ReduxTestCase from '../TestCase/ReduxTestCase'

/* expressTestCase imports */
import { toggleExpress } from '../../../context/expressTestCaseActions';
import { ExpressTestCaseContext } from '../../../context/expressTestCaseReducer';
import ExpressTestCase from '../TestCase/ExpressTestCase';



const TestFile = () => {
  const [{ hasRedux }, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext); 
  const [{ hasReact }, dispatchToTestCase] = useContext(TestCaseContext); 
  const [{ hasExpress }, dispatchToExpressTestCase] = useContext(ExpressTestCaseContext); 


  const handleToggleRedux = e => {
    dispatchToReduxTestCase(toggleRedux(e.currentTarget.checked));
  };

  const handleToggleReact = e => {
    dispatchToTestCase(toggleReact(e.currentTarget.checked));
  };

  const handleToggleExpress = e => {
    dispatchToExpressTestCase(toggleExpress(e.currentTarget.checked));
  };

  return (
    <div>
      <section>
        <span>
          <input 
          type='checkbox'
          checked={hasRedux}
          onChange={handleToggleRedux}
          />
          <label htmlFor='mock-data-checkbox' id={styles.checkboxLabel}>
            Are You Testing Redux?
          </label>
        </span>
      </section>

      <section>
        <span>
          <input 
          type='checkbox'
          checked={hasReact}
          onChange={handleToggleReact}
          />
          <label htmlFor='mock-data-checkbox' id={styles.checkboxLabel}>
            Are You Testing React?
          </label>
        </span>
      </section>

      <section>
        <span>
          <input 
          type='checkbox'
          checked={hasExpress}
          onChange={handleToggleExpress}
          />
          <label htmlFor='mock-data-checkbox' id={styles.checkboxLabel}>
            Are You Testing Express?
          </label>
        </span>
      </section>

      {hasRedux && ( 
        <section >
          <ReduxTestCase/>
        </section>
      )}
      
      {hasReact && ( 
        <section >
          <TestCase/>
        </section>
      )}
 
      {hasExpress && ( 
        <section >
          <ExpressTestCase/>
        </section>
      )}
    </div>
  )
}

export default TestFile;

