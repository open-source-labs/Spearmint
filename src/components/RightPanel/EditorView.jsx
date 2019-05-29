import React, { useState, useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { FileCodeContext } from '../../App';
// import { monaco } from 'react-monaco-editor'

const Editor = () => {
  const fileCode = useContext(FileCodeContext);

  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    autoIndent: true,
    colorDecorators: true,
    theme:"vs-dark"
  };

  const styleEditor = {
    padding: ".625rem",
    height: "auto",
    width: "2rem",
    border: "grey",
  }

  const requireconfig = ({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/',
    paths: {
      'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/vs'
    }
  })

  // monaco.editor.defineTheme('customTheme', {
  //   base: 'vs',
  //   inherit: false,
  //   rules: [
  //     {token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline' },
  //   ]
  // })

  // monaco.editor.setTheme('customTheme')



  return (
    <div style={styleEditor}>
      <MonacoEditor
        width="500"
        height="100%"
        language="javascript"
        // theme="vs-dark"
        value={fileCode}
        options={options}
        requireConfig={requireconfig}
      />
    </div>
  );
}

export default Editor;