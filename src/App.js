import React, { useState, useReducer, createContext } from 'react';
import NavBar from './containers/NavBar';
import LeftPanel from './containers/LeftPanel';
import ProjectLoader from './containers/ProjectLoader';
import RightPanel from './containers/RightPanel';
import { testCaseState, testCaseReducer } from "./context/testCaseReducer";
import {
  mockDataState,
  mockDataReducer
} from "./context/mockDataReducer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTimes,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

export const FileTreeContext = createContext(null);
export const FileCodeContext = createContext(null);
export const LoadedContext = createContext(null);

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
  const [fileCode, setFileCode] = useState('');
  const [fileTree, setFileTree] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [testCase, dispatchTestCase] = useReducer(
    testCaseReducer,
    testCaseState
  );
    console.log(testCase);
  const [mockData, dispatchMockData] = useReducer(
    mockDataReducer,
    mockDataState
  );

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
            <TestCaseContext.Provider value={testCase}>
              <MockDataContext.Provider value={mockData}>
                <NavBar />
              </MockDataContext.Provider>
            </TestCaseContext.Provider>
          </FileTreeContext.Provider>
        </FileCodeContext.Provider>

        <TestCaseContext.Provider value={[testCase, dispatchTestCase]}>
          <MockDataContext.Provider value={[mockData, dispatchMockData]}>
            <LeftPanel />   
          </MockDataContext.Provider>
        </TestCaseContext.Provider>
        
        <FileCodeContext.Provider value={fileCode}>
          <RightPanel />        
        </FileCodeContext.Provider>
      </>
    </div>
    )
  }
}

export default App;
