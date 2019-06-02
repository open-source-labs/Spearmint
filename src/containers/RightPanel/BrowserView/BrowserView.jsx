import React, { useContext } from 'react';
import styles from './BrowserView.module.scss';
import { UrlContext, ToggleContext } from '../../../App';

const TestView = () => {
  const url = useContext(UrlContext);
  const toggleBrowser = useContext(ToggleContext);

  return <div>{url && toggleBrowser && <webview id={styles.browserView} src={url} />}</div>;
};

export default TestView;
