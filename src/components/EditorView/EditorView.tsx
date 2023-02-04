import React, { useContext, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { updateFile } from '../../context/actions/globalActions';
import styles from './EditorView.module.scss';
import { extensionCheckerType } from '../../utils/globalTypes';

const { ipcRenderer } = require('electron');

/**
 * This component uses codemirror to display the code editor 
 * It also saves changes when they are manually typed into the editor
 * @returns { JSX.Element } EditorView component
 */
const Editor = () : JSX.Element => {
  const [{ file, theme, filePath }, dispatchToGlobal] = useContext(GlobalContext);
  console.log('GLOBALCONTEXT', useContext(GlobalContext));
  const [wasSaved, setWasSaved] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Save Changes');
  let editedText = '';

/**
 * This function updates the file in local file, it is invoked when user saves the file
 * @param {string} newValue - New updated text inside of the current code editor
 * @returns { void } Updates wasSaved state, but returns nothing
 */
  const updateAfile = (newValue: string): void => {
    editedText = newValue;
    if (wasSaved.length) setWasSaved('');
  };

/**
 * This function compares the existing local file that you are currently testing,
 * and checks to see if there are any differences between the code editor and your local file
 * If there are any differences it then updates your local file
 * 
 * NOTE: Currently, the functionaliy for this button seems to be broken and doesn't save the local file you are testing.
 * 
 * @returns { void } Returns void, but updates the state of the save button and saves your local file.
 */  
  const saveFile = (): void => {
    if (editedText.length) {
      console.log('UPDATEFILE(EDITEDTEXT)', updateFile(editedText));
      dispatchToGlobal(updateFile(editedText));
      if (!filePath.length) setWasSaved('Preview Saved, be sure to export file');
    } else setWasSaved('No Changes to Save');
    if (filePath.length && editedText.length) {
      // Send main process the filePath and editedText in obj to save
      const reply = ipcRenderer.sendSync('EditorView.saveFile', filePath, editedText);
      // Upon reply from main process, update wasSaved state
      setWasSaved(reply);
    }
    setButtonText('Saved!')
    setTimeout(function (){
      setButtonText('Save Changes')
    }, 1500)
  };
  
// docs --> https://www.npmjs.com/package/@uiw/react-codemirror
  const fileType : string = filePath.split('.')[1];
  const extensionChecker: extensionCheckerType = {
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
            ? extensionChecker[fileType ]
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
      }}>
        {buttonText}
      </button>
      <span id={styles.span}>{wasSaved}</span>
    </div>
    </div>
  );
};

export default Editor;
