import React, { useContext } from 'react';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../../context/globalReducer';

const TestView = () => {
  const [{ url }, _] = useContext(GlobalContext);

  return <webview id={styles.browserView} src={url} />;
};

export default TestView;
