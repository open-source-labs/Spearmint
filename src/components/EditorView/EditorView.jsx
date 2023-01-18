import React, { useContext, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { updateFile } from '../../context/actions/globalActions';
import styles from './EditorView.module.scss';

const { ipcRenderer } = require('electron');

// this file is using codemirror to display the code editor
// also saves changes when they are manually typed into the editor

const Editor = () => {
  const [{ file, filePath, theme }, dispatchToGlobal] = useContext(GlobalContext);
  const [wasSaved, setWasSaved] = useState('');
  const [buttonText, setButtonText] = useState('Save Changes');
  let editedText = '';


  // to change then reset the text of a button after a click
  function handleClick(){
    setButtonText('Saved!')
    setTimeout(function (){
      setButtonText('Save Changes')
    }, 1500)
  }

  const updateAfile = (newValue, e) => {
    editedText = newValue;
    if (wasSaved.length) setWasSaved('');
  };
  const saveFile = () => {
    if (editedText.length) {
      dispatchToGlobal(updateFile(editedText));
      if (!filePath.length) setWasSaved('Preview Saved, be sure to export file');
    } else setWasSaved('No Changes to Save');
    if (filePath.length && editedText.length) {
      // Send main process the filePath and editedText in obj to save
      const reply = ipcRenderer.sendSync('EditorView.saveFile', filePath, editedText);
      // Upon reply from main process, update wasSaved state
      setWasSaved(reply);
    }
  };

// docs --> https://www.npmjs.com/package/@uiw/react-codemirror
  const fileType = filePath.split('.')[1];
  const extensionChecker = {
    png: 1,
    jpg: 1,
    gif: 1,
  };


  return (
    <div>
    <div id={styles.codeEditor} onClick={() => setWasSaved('')}>
      <CodeMirror
        value={
          file
            ? extensionChecker[fileType]
              ? '//Please select a valid file type'
              : file
            : '// Open a file or click preview to view your code.'
        }
        height="95%"        
        extensions={[javascript({ jsx: true })]}
        onChange={updateAfile}
        theme={theme}
      />
    </div>
      <div>
      <button type="button" id={styles.btn} onClick={() => {
          saveFile();
          handleClick();
          }}>
        {buttonText}
      </button>
      <span id={styles.span}>{wasSaved}</span>
    </div>
    </div>
  );
};

export default Editor;
