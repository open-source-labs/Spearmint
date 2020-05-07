import React from 'react';
import styles from './CustomInput.module.scss';
import cn from 'classnames';

const CustomInput = ({ label, placeholder, handleChange, value, bold }) => {

  return (
    <div className={styles.customInputContainer}>
      <label className={cn(styles.label, {[styles.bold]: bold})} htmlFor='custom-input'>
        {label}
      </label>
      <input
        className={cn(styles.customInput, {[styles.bold]: bold})}
        name='custom-input'
        type='text'
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={value || ''}
      />
    </div>
  );
};

export default CustomInput;
