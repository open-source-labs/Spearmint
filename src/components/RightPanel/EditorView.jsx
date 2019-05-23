import React, { useState, useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { FileCodeContext } from '../../App';

const Editor = () => {
  const fileCode = useContext(FileCodeContext);

  const editorDidMount = (editor, monaco) => {
    editor.focus();
  }
  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    autoIndent: true,
    colorDecorators: true
  };

  return (
    <MonacoEditor
      width="700"
      height="600"
      language="javascript"
      theme="vs-dark"
      value={fileCode}
      options={options}
      editorDidMount={editorDidMount}
    />
  );
}

export default Editor;