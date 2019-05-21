import React, { useState } from 'react';
import LeftTabs from '../components/LeftPanel/LeftTabs';
import TestFile from '../components/LeftPanel/TestFile';

const LeftPanel = () => {
  const [newFileName, setNewFileName] = useState('untitled.test.js');

  return (
    <> 
      <LeftTabs />
      <TestFile fileName={newFileName} />
    </>
  )
}

export default LeftPanel; 