import React, { useContext, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { editor } from 'monaco-editor';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { updateFile } from '../../context/actions/globalActions';
import styles from './EditorView.module.scss';

const { ipcRenderer } = require('electron');


const Editor = () => {
  const [{ file, filePath }, dispatchToGlobal] = useContext(GlobalContext);
  const [wasSaved, setWasSaved] = useState('');
  let editedText = '';

  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 90,
    autoIndent: true,
    colorDecorators: true,
    wrappingIndent: 'indent',
    automaticLayout: true,
    codeLens: true,
    // Added specific fontfamily and fontsize to address Windows curson misalignment issue
    fontFamily: 'courier new',
    fontSize: 12,
  };

  const editorDidMount = () => {
    editor.setTheme('light-dark');
  };

  const updatafile = (newValue, e) => {
    editedText = newValue;
    if (wasSaved.length) setWasSaved('');
  };
  const saveFile = async () => {
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

  const fileType = filePath.split('.')[1];
  const extensionChecker = {
    png: 1,
    jpg: 1,
    gif: 1,
  };

  return (
    <div>
      <div onClick={() => setWasSaved('')}>
        <MonacoEditor
          height="80vh"
          language="javascript"
          theme="light-dark"
          value={
            file
              ? extensionChecker[fileType]
                ? '//Please select a valid file type'
                : file
              : '// Open a file or click preview to view your code.'
          }
          options={options}
          editorDidMount={editorDidMount}
          onChange={updatafile}
        />
      </div>
      <div>
        <button type="button" id={styles.save} onClick={saveFile}>
          Save Changes
        </button>
        <span id={styles.span}>{wasSaved}</span>
      </div>
    </div>
  );
};

export default Editor;
