import React, { useContext, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
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
    checkedContrast: false,
  });

  // Mute/Unmute webview
  const muteAudio = (muted) => {
    const webview = document.querySelector('webview');
    // console.log(webview);
    webview.setAudioMuted(muted);
  };

  // helper function to add the https or http
  const addHttps = (url) => {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      return url;
    }
    if (url.startsWith('localhost')) {
      url = `http://${url}`;
      return url;
    }
    url = `https://${url}`;
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

      // Updates contrast
      case 'checkedContrast':
        setCheckBox({
          ...checkedBoxes,
          checkedContrast: !checkedBoxes.checkedContrast,
        });
        break;

      default:
        break;
    }
  };

  // const useStyles = makeStyles(() => ({
  //   FormControlLabel: {
  //     // fontSize doesn't work, but color does work...
  //     fontSize: '1px',
  //     color: 'red',
  //     // ,
  //   },
  // }));

  // const classes = useStyles();

  return (
    <div id={styles.browswerComponentTopLevelDiv}>
      <div id={styles.accessLensContainer}>
        <div id={styles.accessLensLabel}>
          Accessibility Lens
        </div>
        {/* trying to put some sort of flex style or centered style here to center the 3 check boxes...but no avail */}
        <div
          id={styles.accessLensCheckBoxes}
        >
          <FormControlLabel
              // style={{fontSize:2}}
              id="Disable Mouse Checkbox"
              control={(
                <Checkbox
                value="disable mouse clicks"
                checked={checkedBoxes.checkedMouse}
                onChange={handleChangeCheckBox}
                name="checkedMouse"
                size='small'
              />
            )}
            label="Disable Mouse Clicks"
          />
          <FormControlLabel
            id="Grayscale Checkbox"
            control={(
              <Checkbox
                value="grayscale"
                checked={checkedBoxes.checkedGrayscale}
                onChange={handleChangeCheckBox}
                name="checkedGrayscale"
                size='small'
              />
            )}
            label="Grayscale"
          />
          <FormControlLabel
            id="contrastCheckbox"
            control={(
              <Checkbox
                value="contrast"
                checked={checkedBoxes.checkedContrast}
                onChange={handleChangeCheckBox}
                name="checkedContrast"
                size='small'
              />
            )}
            label="Low Contrast"
          />
          <FormControlLabel
            id="Mute Audio Checkbox"
            control={(
              <Checkbox
                value="muted"
                checked={checkedBoxes.muted}
                onChange={handleChangeCheckBox}
                name="muted"
                size='small'
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
          // filter: checkedBoxes.checkedGrayscale ? 'grayscale(100%)' : 'grayscale(0%)',
          filter: checkedBoxes.checkedGrayscale && checkedBoxes.checkedContrast ? 'grayscale(100%) contrast(0.2)'
           : checkedBoxes.checkedGrayscale? 'grayscale(100%)': checkedBoxes.checkedContrast?'contrast(0.2)': null,
          pointerEvents: checkedBoxes.checkedMouse ? 'none' : 'auto',
        }}
      />
    </div>
  );
};

export default BrowserView;
