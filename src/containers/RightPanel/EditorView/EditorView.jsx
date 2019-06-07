import React, { useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from '../../../context/globalReducer';
import { editor } from 'monaco-editor';

const Editor = () => {
  const [{ displayedFileCode }, _] = useContext(GlobalContext);

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
        height='98vh'
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
