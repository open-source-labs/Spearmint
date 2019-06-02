import React, { useState, useReducer, createContext } from 'react';
import styles from './assets/stylesheets/components/App.module.scss';
import NavBar from './containers/NavBar';
import LeftPanel from './containers/LeftPanel';
import ProjectLoader from './containers/ProjectLoader';
import RightPanel from './containers/RightPanel';
import { TestCaseContext, testCaseState, testCaseReducer } from './context/testCaseReducer';
import { MockDataContext, mockDataState, mockDataReducer } from './context/mockDataReducer';

//TODO: create app reducer
export const UrlContext = createContext(null);
export const FileTreeContext = createContext(null);
export const FileCodeContext = createContext(null);
export const LoadedContext = createContext(null);
export const ToggleContext = createContext(null);
export const ComponentNameContext = createContext(null);
export const FilePathContext = createContext(null);
export const FileToggleContext = createContext(null);

// const styles = {
//   fontFamily: "arial",
//   display: "flex"
// };

// const loaderDiv = {
//   display: "flex",
//   justifyContent: "center"
// };

const App = () => {
  const [fileTree, setFileTree] = useState(null);
  const [fileCode, setFileCode] = useState('');
  const [url, setUrl] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [toggleView, setToggleView] = useState(false);
  const [componentName, setComponentName] = useState('');
  const [filePath, setFilePath] = useState(null);
  const [fileToggle, setFileToggle] = useState(false);
  const [testCase, dispatchTestCase] = useReducer(testCaseReducer, testCaseState);
  const [mockData, dispatchMockData] = useReducer(mockDataReducer, mockDataState);

  if (!loaded) {
    return (
      <div>
        <FileTreeContext.Provider value={setFileTree}>
          <LoadedContext.Provider value={setLoaded}>
            <UrlContext.Provider value={setUrl}>
              <ProjectLoader />
            </UrlContext.Provider>
          </LoadedContext.Provider>
        </FileTreeContext.Provider>
      </div>
    );
  } else {
    return (
      <div id={fileToggle ? styles.appGridClose : styles.appGridOpen}>
        <FileCodeContext.Provider value={setFileCode}>
          <FileTreeContext.Provider value={fileTree}>
            <ToggleContext.Provider value={setToggleView}>
              <TestCaseContext.Provider value={testCase}>
                <MockDataContext.Provider value={mockData}>
                  <FilePathContext.Provider value={setFilePath}>
                    <ComponentNameContext.Provider value={componentName}>
                      <FileToggleContext.Provider value={setFileToggle}>
                        <NavBar />
                      </FileToggleContext.Provider>
                    </ComponentNameContext.Provider>
                  </FilePathContext.Provider>
                </MockDataContext.Provider>
              </TestCaseContext.Provider>
            </ToggleContext.Provider>
          </FileTreeContext.Provider>
        </FileCodeContext.Provider>

        <TestCaseContext.Provider value={[testCase, dispatchTestCase]}>
          <MockDataContext.Provider value={[mockData, dispatchMockData]}>
            <ComponentNameContext.Provider value={[componentName, setComponentName]}>
              <FilePathContext.Provider value={[filePath, setFilePath]}>
                <LeftPanel />
              </FilePathContext.Provider>
            </ComponentNameContext.Provider>
          </MockDataContext.Provider>
        </TestCaseContext.Provider>

        <FileCodeContext.Provider value={fileCode}>
          <UrlContext.Provider value={url}>
            <ToggleContext.Provider value={toggleView}>
              <RightPanel />
            </ToggleContext.Provider>
          </UrlContext.Provider>
        </FileCodeContext.Provider>
      </div>
    );
  }
};

export default App;
