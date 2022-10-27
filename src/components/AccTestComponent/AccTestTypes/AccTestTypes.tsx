import React from 'react';
import styles from './AccTestTypes.module.scss';

const AccTestTypes = ({handleAccChange}) => {

  return (
    <div id={styles.AccTestTypesComponent}>
      <label id={styles.AccTestTypesLabel} htmlFor='accTestTypes'>
        Choose Type of Accessibility Test
      </label>
      <select 
        id='accTestTypes' 
        className={styles.AccTestTypesInput} 
        onChange={handleAccChange}
        defaultValue='select'
      >
        <option value='select'>Please select an option</option>
        <option value='html'>HTML</option>
        <option value='react'>React</option>
        <option value='puppeteer'>Puppeteer</option>
      </select>
    </div>
  );
};

export default AccTestTypes;
