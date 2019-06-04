import React, { useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from '../../../context/globalReducer';
import { editor } from 'monaco-editor';

const Editor = () => {
  const [{ displayedFileCode, isBrowserOpen, url }, _] = useContext(GlobalContext);

  const requireConfig = {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/',
    paths: {
      vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/vs',
    },
  };
  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    autoIndent: true,
    colorDecorators: true,
  };

  const editorDidMount = () => {
    editor.setTheme('light-dark');
  };
  console.log(editor);
  return (
    <div>
      {isBrowserOpen && url ? null : (
        <MonacoEditor
          width='50vw'
          height='100vh'
          language='javascript'
          theme='light-dark'
          value={displayedFileCode ? displayedFileCode : '// Open a file to view your code.'}
          options={options}
          requireConfig={requireConfig}
          editorDidMount={editorDidMount}
        />
      )}
    </div>
  );
};

export default Editor;
