import React from 'react';
// import styles used in AccTestTypes for input labels et al.
import styles from '../AccTestTypes/AccTestTypes.module.scss';


/**
 * Renders the AccTestTypes react component
 * 
 * @property { Function } dispatch - description
 * @property { object } action - description
 * @return { JSX.Element } Returns the AccTestTypes react component
 */
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
