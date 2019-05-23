import React, { useState, useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { FileCodeContext } from '../../App';

const Editor = () => {
  const fileCode = useContext(FileCodeContext);

  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    autoIndent: true,
    colorDecorators: true,
    theme:"hc-black"
  };

  const editor = {
    padding: ".625rem",
    height: "auto",
    width: "2rem",
    border: "grey",
  }
  return (
    <div style={editor}>
      <MonacoEditor
        width="500"
        height="100%"
        language="javascript"
        // theme="vs-dark"
        value={fileCode}
        options={options}
      />
    </div>
  );
}

export default Editor;