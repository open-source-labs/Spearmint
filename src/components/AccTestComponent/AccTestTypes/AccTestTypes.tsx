import React from 'react';
import styles from './AccTestTypes.module.scss';

//older version
// const AccTestTypes = ({ dispatch, action, currTypes }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(action(e.target.value));
//   }

const AccTestTypes = ({
  dispatchToAccTestCase,
}) => {
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    //need to pass e.target.value to set state (do I need to set state? use redux?)
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
