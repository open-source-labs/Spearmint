import React, { useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from '../../../context/globalReducer';

const Editor = () => {
  const [{ displayedFileCode, isBrowserOpen }, _] = useContext(GlobalContext);
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
    theme: 'hc-black',
  };

  return (
    <div>
      {isBrowserOpen ? null : (
        <MonacoEditor
          width='50vw'
          height='100vh'
          language='javascript'
          value={displayedFileCode}
          options={options}
          requireConfig={requireConfig}
        />
      )}
    </div>
  );
};

export default Editor;
