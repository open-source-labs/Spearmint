import React, { useContext } from 'react';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../../context/globalReducer';

const BrowserView = () => {
  const [{ url }, _] = useContext(GlobalContext);

  return (
    <>
      <webview id={styles.browserView} src={url} />
    </>
  );
};

export default BrowserView;
