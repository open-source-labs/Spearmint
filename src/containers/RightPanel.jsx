import React, { useState } from 'react';
import EditorView from '../components/RightPanel/EditorView';
const RightPanel = () => {
  const [newFileName, setNewFileName] = useState('untitled.test.js');
  return (
    <> 
      <EditorView/>
    </>
  )
}
export default RightPanel; 