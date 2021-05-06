import React, { useContext, useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { setProjectUrl } from '../../context/actions/globalActions';

const BrowserView = () => {
  const [{ url }, dispatchToGlobal] = useContext(GlobalContext);
  // Track checked button state

  const [checkedBoxes, setCheckBox] = useState({
    checkedMouse: false,
    muted: false,
    checkedGrayscale: false,
  });

  // Mute/Unmute webview
  const muteAudio = (muted) => {
    const webview = document.querySelector('webview');
    console.log(webview);
    webview.setAudioMuted(muted);
  };

  // helper function to add the https or http
  const addHttps = (url) => {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      return url;
    }
    if (url.startsWith('localhost')) {
      url = 'http://' + url;
      return url;
    }
    url = 'https://' + url;
    return url;
  };

  const handleChangeUrl = (e) => {
    if (e.keyCode === 13) {
      const testSiteURL = addHttps(e.target.value);
      dispatchToGlobal(setProjectUrl(testSiteURL));
      e.target.value = '';
    }
  };

  // Updates checkboxes states
  const handleChangeCheckBox = (e) => {
    // console.log(e.target.name);
    switch (e.target.name) {
      case 'checkedMouse':
        setCheckBox({ ...checkedBoxes, checkedMouse: !checkedBoxes.checkedMouse });
        break;
      case 'muted':
        // MintyBois note:  Invoke muteAudio in callback within setCheckBox.
        setCheckBox((state) => {
          const updatedState = {
            ...state,
            muted: !state.muted,
          };
          muteAudio(updatedState.muted);
          return updatedState;
        });
        break;

      // checkedGrayscale state does not impact app usability
      case 'checkedGrayscale':
        setCheckBox({
          ...checkedBoxes,
          checkedGrayscale: !checkedBoxes.checkedGrayscale,
        });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      {/* Accessibility Lens */}
      <div id={styles.FormControlContainer}>
        <div id={styles.title} style={{ flex: 1 }}>
          Accessibility Lens
        </div>
        <div style={{ flex: 2, background: 'white' }}>
          {/* Disable Mouse Checkbox */}
          <FormControlLabel
            control={(
              <Checkbox
                value="disable mouse clicks"
                checked={checkedBoxes.checkedMouse}
                onChange={handleChangeCheckBox}
                name="checkedMouse"
              />
            )}
            label="Disable Mouse Clicks"
          />
          {/* Grayscale Checkbox */}
          <FormControlLabel
            control={(
              <Checkbox
                value="grayscale"
                checked={checkedBoxes.checkedGrayscale}
                onChange={handleChangeCheckBox}
                name="checkedGrayscale"
              />
            )}
            label="Grayscale"
          />
          {/* Mute Audio Checkbox */}
          <FormControlLabel
            control={(
              <Checkbox
                value="muted"
                checked={checkedBoxes.muted}
                onChange={handleChangeCheckBox}
                name="muted"
              />
            )}
            label="Mute"
          />
        </div>
      </div>
      {/* Search bar */}
      <input
        id={styles.browserAddress}
        placeholder="Enter a new URL (localhost:3000)"
        type="text"
        onKeyDown={handleChangeUrl}
      />
      <webview
        id={styles.browserView}
        src={url}
        style={{
          filter: checkedBoxes.checkedGrayscale ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: checkedBoxes.checkedMouse ? 'none' : 'auto',
        }}
      />
    </div>
  );
};

export default BrowserView;
