import React, { useContext } from 'react';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../../context/globalReducer';

const TestView = () => {
  const [{ url, isBrowserOpen }, _] = useContext(GlobalContext);

  return <div>{url && isBrowserOpen && <webview id={styles.browserView} src={url} />}</div>;
};

export default TestView;
