import React, { useState, createContext } from 'react';
import LeftPanel from './containers/LeftPanel';
import FilesContainer from './FilesContainer';
import RightPanel from './containers/RightPanel';
export const FileCodeContext = createContext(null);

const App = () => {
  const [fileCode, setFileCode] = useState('');
  
  return (
    <>
      <LeftPanel />
      <FileCodeContext.Provider value={setFileCode}>
        <FilesContainer />        
      </FileCodeContext.Provider>
      <FileCodeContext.Provider value={fileCode}>
        <RightPanel />        
      </FileCodeContext.Provider>
    </>
  )
}

export default App;
