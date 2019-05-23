import React, { useState } from 'react';
import EditorView from '../components/RightPanel/EditorView';
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
      <EditorView/>
    </div>
    </>
  )
}
export default RightPanel; 