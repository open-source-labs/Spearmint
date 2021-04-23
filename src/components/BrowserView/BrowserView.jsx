import React, { useContext, useState } from 'react';
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
    checkedMouse: false
  });

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

    console.log(e.target.name)

    switch (e.target.name) {
      case 'checkedMouse':
        setCheckBox({ ...checkedBoxes, checkedMouse: checkedBoxes.checkedMouse ? false : true });
        break;
    
      case 'checkedKeyboard':
        setCheckBox({ ...checkedBoxes, checkedKeyboard: checkedBoxes.checkedKeyboard ? false : true });
        break;
  
      default:
        break;
    }



  }

  return (
    <>
      <input
        id={styles.browserAddress}
        placeholder='Enter a new URL'
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
      </div>
      <webview id={styles.browserView} src={url} 
        style={{ 
          pointerEvents: checkedBoxes.checkedMouse ? 'none' : 'auto',
        }} 
      />
        
    </>
  );
};

export default BrowserView;
