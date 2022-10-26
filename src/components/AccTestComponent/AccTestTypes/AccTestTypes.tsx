import React, { useReducer } from 'react';
import styles from './AccTestTypes.module.scss';
import {updateTestType} from '../../../context/actions/accTestCaseActions';
import { accTestCaseState, accTestCaseReducer } from '../../../context/reducers/accTestCaseReducer';

const AccTestTypes = ({
  // dispatchToAccTestCase,
  action,
}) => {
  const [accTestCase, dispatchToAccTestCase] = useReducer(
    accTestCaseReducer, 
    accTestCaseState
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatchToAccTestCase(action(e.target.value));
    console.log('after setting state (in AccTestType)', accTestCaseState);
  };

  return (
    <div id={styles.AccTestTypesComponent}>
      <label id={styles.AccTestTypesLabel} htmlFor='accTestTypes'>
        Choose Type of Accessibility Test
      </label>
      <select id='accTestTypes' className={styles.AccTestTypesInput} onChange={handleChange}>
        <option value='select' selected>Please select an option</option>
        <option value='html'>HTML</option>
        <option value='react'>React</option>
        <option value='puppeteer'>Puppeteer</option>
      </select>
    </div>
  );
};

export default AccTestTypes;
