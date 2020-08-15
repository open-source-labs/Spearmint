import React, { useContext, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { editor } from 'monaco-editor';
import { updateFile } from '../../context/actions/globalActions';

const remote = window.require('electron').remote;
const fs = remote.require('fs');

const Editor = () => {
  let editedText = '';
  const [ifFileExists, setIfFileExists] = useState(false);

  // console.log('rendered');
  let [{ displayedFileCode, file, filePath }, dispatchToGlobal] = useContext(GlobalContext);
  if (file.length > 0) {
    displayedFileCode = file;
    editedText = file;
  }
  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 70,
    autoIndent: true,
    colorDecorators: true,
    wrappingIndent: 'indent',
    automaticLayout: true,
  };

  const editorDidMount = () => {
    editor.setTheme('light-dark');
  };

  const updatafile = (newValue, e) => {
    editedText = newValue;
  };

  const saveFile = async () => {
    // let filePath = filePathMap[fileName.split('.')[0]];
    // console.log(filePathMap, '-----', filePath);
    dispatchToGlobal(updateFile(editedText));
    if (filePath.length) {
      if (editedText.length) {
        setIfFileExists(false);
        await fs.writeFile(filePath, editedText, (err) => {
          if (err) throw err;
        });
      }
    } else setIfFileExists(true);
  };

  return (
    <div>
      <button onClick={saveFile}>Save Changes</button>
      {ifFileExists && <p>File does not exist! Use the Export Button to create your test file.</p>}
      <hr></hr>
      <MonacoEditor
        height='95vh'
        language='javascript'
        theme='light-dark'
        value={displayedFileCode ? displayedFileCode : '// Open a file to view your code.'}
        options={options}
        editorDidMount={editorDidMount}
        onChange={updatafile}
      />
    </div>
  );
};

export default Editor;
