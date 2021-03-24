import React from 'react';
// import styles used in AccTestTypes for input labels et al.
import styles from '../AccTestTypes/AccTestTypes.module.scss';

const AccTestTypes = ({ dispatch, action }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(action(e.target.value));
  };

  return (
    <div id={styles.AccTestTypesComponent}>
      <label id={styles.AccTestTypesLabel}>URL to be Tested:</label>
      <input onChange = { handleChange } placeholder='https://sample.io'>
      </input>
    </div>
  );
};

export default AccTestTypes;
