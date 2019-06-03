import React, { useContext, useEffect } from 'react';
import styles from './BrowserView.module.scss';
import { UrlContext, ToggleContext } from '../../../App';

const TestView = () => {
  const url = useContext(UrlContext);
  const toggleView = useContext(ToggleContext);
  useEffect(() => {
    if (!toggleView) {
      const webview = document.getElementById('BrowserView_browserView__HyRyN');
      webview.setZoomFactor(0.5);
    }
  });

  return <div>{url && !toggleView && <webview id={styles.browserView} src={url} />}</div>;
};

export default TestView;
