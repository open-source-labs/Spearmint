import React, { useContext } from 'react';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
// import { setProjectUrl } from '../../../context/globalActions';

const TestView = () => {
  const [{ url }, _] = useContext(GlobalContext);
  //   const [newUrl, setNewUrl] = useState('');
  //   const addHttps = url => {
  //     if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
  //       return url;
  //     } else if (url.startsWith('localhost')) {
  //       url = 'http://' + url;
  //       return url;
  //     } else {
  //       url = 'https://' + url;
  //       return url;
  //     }
  //   };

  // const handleChangeUrl = e => {
  //   const testSiteURL = addHttps(e.target.value);
  //   setNewUrl(testSiteURL);
  // };
  // console.log(newUrl);

  // const handleClickUrl = newUrl => {
  //   dispatchToGlobal(setProjectUrl(newUrl));
  // };

  return (
    <>
      {/* <div id={styles.browserAddress}>
        <input type='text' defaultValue={url} id={styles.address} onChange={handleChangeUrl} />
        <button onClick={handleClickUrl}>Go</button>
      </div> */}
      <webview id={styles.browserView} src={url} enableremotemodule='false' />
    </>
  );
};

export default TestView;
