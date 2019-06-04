import React, { useState } from 'react';
import styles from './FileDirectory.module.scss';

export const FileClick = file => {
  const [isFileBtnClicked, setFileBtn] = useState('');

  return (
    <button
      id={isFileBtnClicked ? styles.dirButtonClicked : styles.dirButton}
      onClick={() => {
        setFileBtn({ isFileBtnClicked: true });
      }}
    />
  );
};
