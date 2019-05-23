import React, { useState, createContext } from 'react';
import NavBar from './containers/NavBar';
import LeftPanel from './containers/LeftPanel';
import ProjectLoader from './containers/ProjectLoader';
import RightPanel from './containers/RightPanel';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import FileTree from './FileTree';


export const FileTreeContext = createContext(null);
export const FileCodeContext = createContext(null);
export const LoadedContext = createContext(false);

library.add(faPlus, faMinus, faTimes);

const styles = {
  fontFamily: "arial",
  display: "flex",
};

const loaderDiv = {
  display:"flex",
  justifyContent: "center"
}

const App = () => {
  const [fileCode, setFileCode] = useState('');
  const [fileTree, setFileTree] = useState(null);
  const [loaded, setLoaded] = useState(false);

    if(!loaded) {
    return (
      <div style={loaderDiv}>
      <>
        <FileTreeContext.Provider value={setFileTree}>
          <LoadedContext.Provider value={setLoaded}>
            <ProjectLoader />
          </LoadedContext.Provider>
        </FileTreeContext.Provider>
      </>
      </div>
    )} 
    else {
      return (
    <div style={styles}>
      <>
        <FileCodeContext.Provider value={setFileCode}>
          <FileTreeContext.Provider value={fileTree}>
            <NavBar />
          </FileTreeContext.Provider>
        </FileCodeContext.Provider>
        <LeftPanel />
        <FileCodeContext.Provider value={fileCode}>
          <RightPanel />        
        </FileCodeContext.Provider>
      </>
    </div>
    )
  }
}

export default App;
