import React, { useState } from 'react';
import EditorView from '../components/RightPanel/EditorView';
import BrowserView from '../components/RightPanel/BrowserView';

const RightPanel = () => {
  const [newFileName, setNewFileName] = useState('untitled.test.js');

  const rightPanel ={
    display: "flex",
    justifyContent: "flex-end",
    height: "100vh",
    width: "200px",
  }

  return (
    <> 
    <div style={rightPanel}>
      <BrowserView/>
      <EditorView/>
    </div>
    </>
  )
}
export default RightPanel; 