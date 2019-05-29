import React, { useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { FileCodeContext, ToggleContext } from '../../App';

const Editor = () => {
  const fileCode = useContext(FileCodeContext);
  const toggleView = useContext(ToggleContext);
  const requireConfig = ({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/',
    paths: {
      'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/vs'
    }
  })
  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    autoIndent: true,
    colorDecorators: true,
    theme:"hc-black",
    // language: "javascript"
  };
  const editor = {
    padding: ".625rem",
    height: "auto",
    width: "2rem",
    border: "grey",
  }

  return (
    <div style={editor}>
      {toggleView ? null :
      <MonacoEditor
        width="500"
        height="100%"
        language="javascript"
        // theme="hc-black"
        value={fileCode}
        options={options}
        requireConfig={requireConfig}
      /> }
    </div>
  );
}

export default Editor;