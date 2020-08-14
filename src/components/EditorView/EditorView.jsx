import React, { useContext, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { editor } from 'monaco-editor';
import { updateFile } from '../../context/actions/globalActions';

const Editor = () => {
  let editedText = '';
  let [{ displayedFileCode, file }, dispatchToGlobal] = useContext(GlobalContext);
  if (file.length > 0) displayedFileCode = file;
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

  const handleClick = () => {
    dispatchToGlobal(updateFile(editedText));
  };

  return (
    <div>
      <button onClick={handleClick}>Save Changes</button>
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
