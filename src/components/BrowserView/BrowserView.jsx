import React, { useContext, useState } from 'react';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';

const BrowserView = () => {
  const [{ url }, dispatchToGlobal] = useContext(GlobalContext);

  return (
    <>
      <input id={styles.browserAddress} placeholder='  Type a new URL' type='text' />
      <webview id={styles.browserView} src={url} />
    </>
  );
};

export default BrowserView;
