import React, { useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { editor } from 'monaco-editor';

const Editor = () => {
  let [{ displayedFileCode, testFileCode }] = useContext(GlobalContext);
  if (testFileCode.length > 0) displayedFileCode = testFileCode;

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

  return (
    <div>
      <MonacoEditor
        height='95vh'
        language='javascript'
        theme='light-dark'
        value={displayedFileCode ? displayedFileCode : '// Open a file to view your code.'}
        options={options}
        editorDidMount={editorDidMount}
      />
    </div>
  );
};

export default Editor;
