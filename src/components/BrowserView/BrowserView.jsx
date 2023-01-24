import React, { useContext, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styles from './BrowserView.module.scss';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { setProjectUrl } from '../../context/actions/globalActions';

/**
 * This component is the Browser tab of the application, a child component of the RightPanel
 * 
 * The browser allows for multiple accessibility options to help those with disabilites
 * @returns { JSX.Element } BrowserView component
 */
const BrowserView = () => {
  const [{ url, theme }, dispatchToGlobal] = useContext(GlobalContext);
  // Track checked button state

  /**
   * Used for accessibility options
   */
  const [checkedBoxes, setCheckBox] = useState({
    checkedMouse: false,
    muted: false,
    checkedGrayscale: false,
    checkedContrast: false,
    checkedReader: false,
    checkedLowVision: false,
    checkedBrightness: false,
  });

  /**
   * This function has the option to Mute/Unmute webview
   */ 
  const muteAudio = (muted) => {
    const webview = document.querySelector('webview');
    webview.setAudioMuted(muted);
  };

  /**
   * Helper function to automatically add the https or http if the user didn't include it in url
   * @param { string } url - Url of the website
   * @returns { string } Updated Url that adds Https if it did not have it previously
   */ 
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

  /**
   * Event listener that handles when a user inputs a new website into the fully functional browser.
   * @param { event } e - event
   * @returns { void }
   */
  const handleChangeUrl = (e) => {
    if (e.keyCode === 13) {
      const testSiteURL = addHttps(e.target.value);
      dispatchToGlobal(setProjectUrl(testSiteURL));
      e.target.value = '';
    }
  };

  /**
   * Checks to see which box is clicked and updates checkboxes states and browser visuals.
   * @param {event} e - event
   * @returns {object} The new updated state of all the browser view accessibility checkboxes
   */
  const handleChangeCheckBox = (e) => {
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

      // Updates screen reader
      case 'checkedReader':
        setCheckBox({
          ...checkedBoxes,
          checkedReader: !checkedBoxes.checkedReader,
        });

        activateReader(checkedBoxes.checkedReader);
        break;
      // a filter for low Vision, easier on eyes
      case 'checkedLowVision':
        setCheckBox({
          ...checkedBoxes,
          checkedLowVision: !checkedBoxes.checkedLowVision,
        });
        break;
      //brightness test to emulate vision with light sensitivity 
        case 'checkedBrightness' :
          setCheckBox({
            ...checkedBoxes,
            checkedBrightness: !checkedBoxes.checkedBrightness,
          });
          break;
      default:
        break;
    }
  };
  
  return (
    <div id={styles[`browserComponentTopLevelDiv${theme}`]}>
      <div id={styles.accessLensContainer}>
        <div id={styles.accessLensLabel}>
          Accessibility Lens
        </div>
        <div
          id={styles.accessLensCheckBoxes}
        >
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
            id="Brightness Checkbox"
            control={(
              <Checkbox
              value="filter"
              checked={checkedBoxes.checkedBrightness}
              onChange={handleChangeCheckBox}
              name="checkedBrightness"
              size='small'
              />
              )}
            label="Light Sensitivity"
          />
          <FormControlLabel
            id="Low Vision Checkbox"
            control={(
              <Checkbox
                value="filter"
                checked={checkedBoxes.checkedLowVision}
                onChange={handleChangeCheckBox}
                name="checkedLowVision"
                size='small'
              />
            )}
            label="Low Vision "
          />
          <FormControlLabel
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
          <FormControlLabel
            id="Turn on Screen Reader"
            control={(
              <Checkbox
                value="checkedReader"
                checked={checkedBoxes.checkedReader}
                onChange={handleChangeCheckBox}
                name="checkedReader"
                size='small'
              />
            )}
            label="Screen Reader"
          />
        </div>
      </div>
      {/* Search bar */}
      <div id={styles.browserBar} >
        <input
          id={styles.browserAddress}
          placeholder="Enter a new URL (localhost:3000)"
          type="text"
          onKeyDown={handleChangeUrl}
        />
      </div>
      <webview
        id={styles.browserView}
        src={url}
        style={{
          filter: checkedBoxes.checkedGrayscale && checkedBoxes.checkedContrast && checkedBoxes.checkedLowVision && checkedBoxes.checkedBrightness ? 'grayscale(100%) contrast(0.2) invert(100%) brightness(150%)'
            : checkedBoxes.checkedGrayscale && checkedBoxes.checkedContrast ? 'grayscale(100%) contrast(0.2)'
            : checkedBoxes.checkedGrayscale ? 'grayscale(100%)' : checkedBoxes.checkedContrast ? 'contrast(0.2)' : checkedBoxes.checkedLowVision ? 'invert(100%)' : checkedBoxes.checkedBrightness ? 'brightness(150%)' : null,
          pointerEvents: checkedBoxes.checkedMouse ? 'none' : 'auto',
        }}
      />
    </div>
  );
};

export default BrowserView;
