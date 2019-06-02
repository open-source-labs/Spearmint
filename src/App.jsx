import React, { useReducer, createContext } from 'react';
import styles from './App.module.scss';
import { GlobalContext, globalState, globalReducer } from './context/globalReducer';
import { TestCaseContext, testCaseState, testCaseReducer } from './context/testCaseReducer';
import { MockDataContext, mockDataState, mockDataReducer } from './context/mockDataReducer';
import ProjectLoader from './containers/ProjectLoader/ProjectLoader';
import NavBar from './containers/NavBar/NavBar';
import LeftPanel from './containers//LeftPanel/LeftPanel';
import RightPanel from './containers/RightPanel/RightPanel';

//TODO: create app reducer
export const UrlContext = createContext(null);
export const FileTreeContext = createContext(null);
export const DisplayedFileCodeContext = createContext(null);
export const IsProjectLoadedContext = createContext(null);
export const ToggleContext = createContext(null);
export const ComponentNameContext = createContext(null);
export const FilePathContext = createContext(null);
export const ToggleCodeEditorContext = createContext(null);

// const styles = {
//   fontFamily: "arial",
//   display: "flex"
// };

// const loaderDiv = {
//   display: "flex",
//   justifyContent: "center"
// };

const App = () => {
  // const [fileTree, setFileTree] = useState(null);
  // const [displayedFileCode, setDisplayedFileCode] = useState('');
  // const [url, setUrl] = useState('');
  // const [isProjectLoaded, setIsProjectLoaded] = useState(false);
  // const [toggleBrowser, setToggleBrowser] = useState(false);
  // const [componentName, setComponentName] = useState('');
  // const [filePath, setFilePath] = useState(null);
  // const [toggleCodeEditor, setToggleCodeEditor] = useState(false);
  const [global, dispatchToGlobal] = useReducer(globalReducer, globalState);
  const [testCase, dispatchToTestCase] = useReducer(testCaseReducer, testCaseState);
  const [mockData, dispatchToMockData] = useReducer(mockDataReducer, mockDataState);

  if (!global.isProjectLoaded) {
    return (
      <div>
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <ProjectLoader />
        </GlobalContext.Provider>
        {/* <FileTreeContext.Provider value={setFileTree}>
          <IsProjectLoadedContext.Provider value={setIsProjectLoaded}>
            <UrlContext.Provider value={setUrl}>
              <ProjectLoader />
            </UrlContext.Provider>
          </IsProjectLoadedContext.Provider>
        </FileTreeContext.Provider> */}
      </div>
    );
  } else {
    return (
      <div id={global.isFileDirectoryOpen ? styles.appGridClose : styles.appGridOpen}>
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <TestCaseContext.Provider value={[testCase, dispatchToTestCase]}>
            <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
              <NavBar />
              <LeftPanel />
            </MockDataContext.Provider>
          </TestCaseContext.Provider>
          <RightPanel />
        </GlobalContext.Provider>
        {/* <DisplayedFileCodeContext.Provider value={setDisplayedFileCode}>
          <FileTreeContext.Provider value={fileTree}>
            <ToggleContext.Provider value={setToggleBrowser}>
              <TestCaseContext.Provider value={testCase}>
                <MockDataContext.Provider value={mockData}>
                  <FilePathContext.Provider value={setFilePath}>
                    <ComponentNameContext.Provider value={componentName}>
                      <ToggleCodeEditorContext.Provider value={setToggleCodeEditor}>
                        <NavBar />
                      </ToggleCodeEditorContext.Provider>
                    </ComponentNameContext.Provider>
                  </FilePathContext.Provider>
                </MockDataContext.Provider>
              </TestCaseContext.Provider>
            </ToggleContext.Provider>
          </FileTreeContext.Provider>
        </DisplayedFileCodeContext.Provider>

        <TestCaseContext.Provider value={[testCase, dispatchToTestCase]}>
          <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
            <ComponentNameContext.Provider value={[componentName, setComponentName]}>
              <FilePathContext.Provider value={[filePath, setFilePath]}>
                <LeftPanel />
              </FilePathContext.Provider>
            </ComponentNameContext.Provider>
          </MockDataContext.Provider>
        </TestCaseContext.Provider>

        <DisplayedFileCodeContext.Provider value={displayedFileCode}>
          <UrlContext.Provider value={url}>
            <ToggleContext.Provider value={toggleBrowser}>
              <RightPanel />
            </ToggleContext.Provider>
          </UrlContext.Provider>
        </DisplayedFileCodeContext.Provider> */}
      </div>
    );
  }
};

export default App;
