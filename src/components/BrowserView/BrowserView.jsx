import React, { useContext } from 'react';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';

const BrowserView = () => {
  const [{ url }] = useContext(GlobalContext);

  return (
    <>
      <webview id={styles.browserView} src={url} />
    </>
  );
};

export default BrowserView;
