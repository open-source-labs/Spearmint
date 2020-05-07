import React from 'react';
import styles from './CustomInput.module.scss'

const CustomInput = ({ label, placeholder, handleChange, value }) => (
  <div className={styles.customInputContainer}>
    <label htmlFor='custom-input'>{value && label}</label>
    <input className={styles.customInput} name='custom-input' type='text' placeholder={placeholder} onChange={handleChange} value={value || ''} />
  </div>
);

export default CustomInput;
