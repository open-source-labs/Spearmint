import React, { useState, createContext } from 'react';
import NavBar from './containers/NavBar';
import LeftPanel from './containers/LeftPanel';
import ProjectLoader from './containers/ProjectLoader';
import RightPanel from './containers/RightPanel';
import FileTree from './FileTree';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTimes,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

export const UrlContext = createContext(null)
export const FileTreeContext = createContext(null);
export const FileCodeContext = createContext(null);
export const LoadedContext = createContext(null);
export const ToggleContext =  createContext(null);

library.add(faPlus, faMinus, faTimes, faQuestionCircle);

const styles = {
  fontFamily: "arial",
  display: "flex",
};

const loaderDiv = {
  display:"flex",
  justifyContent: "center"
}

const App = () => {
  const [url, setUrl] = useState('');
  const [fileCode, setFileCode] = useState('');
  const [fileTree, setFileTree] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [toggleView, setToggleView] = useState(false);
  

    if(!loaded) {
      return (
        <div style={loaderDiv}>
          <FileTreeContext.Provider value={setFileTree}>
            <LoadedContext.Provider value={setLoaded}>
              <UrlContext.Provider value={setUrl}> 
                <ProjectLoader />
              </UrlContext.Provider>
            </LoadedContext.Provider>
          </FileTreeContext.Provider>
        </div>
      )} 
    else {
      return (
        <div style={styles}>
          <FileCodeContext.Provider value={setFileCode}>
            <FileTreeContext.Provider value={fileTree}>
              <ToggleContext.Provider value={setToggleView}>
                <NavBar />
              </ToggleContext.Provider>
            </FileTreeContext.Provider>
          </FileCodeContext.Provider>
          <LeftPanel />
          <FileCodeContext.Provider value={fileCode}>
            <UrlContext.Provider value={url}>
              <ToggleContext.Provider value={toggleView}>
                <RightPanel />        
              </ToggleContext.Provider>
            </UrlContext.Provider>
          </FileCodeContext.Provider>
        </div>
    )
  }
}

export default App;
