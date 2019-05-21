import React, { useState } from 'react';
import LeftTabs from '../components/LeftPanel/LeftTabs';
import TestMenu from '../components/LeftPanel/TestMenu';
import TestFile from '../components/LeftPanel/TestFile';

const LeftPanel = () => {
  const [newFileName, setNewFileName] = useState('untitled.test.js');

  return (
    <> 
      <LeftTabs />
      <TestMenu />
      <TestFile fileName={newFileName} />
    </>
  )
}

export default LeftPanel; 