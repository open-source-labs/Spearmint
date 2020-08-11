/**
 * modal: pop ups windows on click 
 * browser view modal 
 */

import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import styles from './ExportFileModal.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { setProjectUrl } from '../../context/actions/globalActions';

const BrowserModal = ({ isBrowserModalOpen, closeBrowserModal }) => {
  const [, dispatchToGlobal] = useContext(GlobalContext);
  const addHttps = url => {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      return url;
    } else if (url.startsWith('localhost')) {
      url = 'http://' + url;
      return url;
    } else {
      url = 'https://' + url;
      return url;
    }
  };

  const handleChangeUrl = e => {
    const testSiteURL = addHttps(e.target.value);
    dispatchToGlobal(setProjectUrl(testSiteURL));
  };
  
  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isBrowserModalOpen}
      onRequestClose={closeBrowserModal}
      contentLabel='Open the test site'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={modalStyles}
    >
      <div id={styles.title}>
        <p>Open the test site</p>
        <svg id={styles.close} onClick={closeBrowserModal}>
          <path d='M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z' />
        </svg>
      </div>
      <div id={styles.body}>
        <p>Enter the URL</p>
        <input type='text' id={styles.url} onChange={handleChangeUrl} />
        <button id={styles.save} onClick={closeBrowserModal}>
          Cancel
        </button>
        <button id={styles.save} onClick={closeBrowserModal}>
          Open
        </button>
      </div>
    </ReactModal>
  );
};

export default BrowserModal;
