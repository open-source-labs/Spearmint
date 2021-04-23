import React, { useContext, useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { setProjectUrl } from '../../context/actions/globalActions';
import { isPropertySignature } from 'typescript';

const BrowserView = () => {
  const [{ url }, dispatchToGlobal] = useContext(GlobalContext);
  // Track checked button state

  const [checkedBoxes, setCheckBox] = useState({
    checkedMouse: false,
    muted: false,
  });

  const [webviewReadiness, setWebviewReadiness] = useState(false);

  // // Mute webview
  // useEffect(() => {
    //   const webview = document.querySelector('webview');
    //   webview.addEventListener('dom-ready', () => {
      //     webview.openDevTools();
      //     webview.setAudioMuted(checkedBoxes.muted);
      //   });
      // }, []);
      
      // Mute/Unmute webview
      const muteAudio = (muted) => {
        const webview = document.querySelector('webview');
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

      // useEffect(() => {
      //   const webview = document.querySelector('webview');
      //   // add eventlistener, listens for webviewReadiness
      //   if (webviewReadiness === false) {
      //     webview.addEventListener('dom-ready', () => {
      //       // if webview is dom-ready, setWebviewReadiness(true), and kick it off
      //       setWebviewReadiness(true);
      //       // Update Audio mute
      //       webview.setAudioMuted(checkedBoxes.muted);
      //     });
      //   }
      //   else webview.setAudioMuted(checkedBoxes.muted);
      // }, []);

      // Updates checkboxes states
      const handleChangeCheckBox = (e) => {
        // console.log(e.target.name);
        
        switch (e.target.name) {
          case 'checkedMouse':
            setCheckBox({ ...checkedBoxes, checkedMouse: checkedBoxes.checkedMouse ? false : true });
            break;
            
            case 'muted':
              // MintyBois note: both options work, but a little hacky
              // setCheckBox({ ...checkedBoxes,
              //   muted: checkedBoxes.muted ? false : true });
              //   muteAudio(!checkedBoxes.muted);
                
                setCheckBox((state) => {
                  const updatedState = {
                    ...state,
                    muted: state.muted ? false : true,
                  };
                  muteAudio(updatedState.muted);
                  return updatedState;
                });
        break;

      case 'checkedKeyboard':
        setCheckBox({
          ...checkedBoxes,
          checkedKeyboard: checkedBoxes.checkedKeyboard ? false : true });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <input
        id={styles.browserAddress}
        placeholder="Enter a new URL"
        type='text'
        onKeyDown={handleChangeUrl}
      />
      <div id={styles.FormControlContainer}>
        {/* Disable Mouse Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              value="disable mouse clicks"
              checked={checkedBoxes['checkedMouse']}
              onChange={handleChangeCheckBox}
              name="checkedMouse"
            />
          }
          label="Disable Mouse Clicks"
        />
        {/* Disable Keyboard Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              value="disable keyboard"
              checked={checkedBoxes['checkedKeyboard']}
              onChange={handleChangeCheckBox}
              name="checkedKeyboard"
            />
          }
          label="Disable Keyboard Clicks"
        />
        {/* Mute Audio Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              value="muted"
              checked={checkedBoxes['muted']}
              onChange={handleChangeCheckBox}
              name="muted"
            />
          }
          label="Mute"
        />
      </div>
      <webview
        id={styles.browserView}
        src={url}
        style={{
          pointerEvents: checkedBoxes.checkedMouse ? 'none' : 'auto',
        }}
      />
    </div>
  );
};

export default BrowserView;