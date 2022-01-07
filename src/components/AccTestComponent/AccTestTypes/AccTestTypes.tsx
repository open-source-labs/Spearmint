import React from 'react';
import styles from './AccTestTypes.module.scss';

const AccTestTypes = ({ dispatch, action, currTypes }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(action(e.target.value));
  };

  return (
    <div id={styles.AccTestTypesComponent}>
      <label id={styles.AccTestTypesLabel} htmlFor='accTestTypes'>
        Choose Type of Accessibility Test
      </label>
      <select value={currTypes} id='accTestTypes' className={styles.AccTestTypesInput} onChange={handleChange}>
        <option value='html'>HTML</option>
        <option value='react'>React</option>
        <option value='puppeteer'>Puppeteer</option>
      </select>
    </div>
  );
};

export default AccTestTypes;
