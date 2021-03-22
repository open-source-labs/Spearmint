import React from 'react';
import cn from 'classnames';
import styles from './CustomInput.module.scss';

const CustomInput = ({ id, label, placeholder, handleChange, value, bold }) => {
  return (
    <div className={styles.customInputContainer}>
      <label className={cn(styles.label, { [styles.bold]: bold })} htmlFor='custom-input'>
        {label}
      </label>
      <input
        className={cn(styles.customInput, { [styles.bold]: bold })}
        name='custom-input'
        type='text'
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={value || ''}
      />
    </div>
  );
};

export default CustomInput;
