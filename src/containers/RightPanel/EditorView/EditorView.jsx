import React, { useContext } from 'react';
import styles from './EditorView.module.scss';
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from '../../../context/globalReducer';
import { editor } from 'monaco-editor';

const Editor = () => {
  const [{ displayedFileCode, isBrowserOpen, url }, _] = useContext(GlobalContext);

  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 70,
    autoIndent: true,
    colorDecorators: true,
    wrappingIndent: 'indent',
  };

  const editorDidMount = () => {
    editor.setTheme('light-dark');
  };

  // const saveFile = () => {
  //   // editor.onDidChangeContent = event => {
  //   let value = editor.getValue();
  //   console.log(value);
  //   // };
  // };

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
          editorDidMount={editorDidMount}
          // saveFile={saveFile}
        />
      )}
    </div>
  );
};

export default Editor;
