import React, { useReducer } from 'react';
import styles from './App.module.scss';
import { GlobalContext, globalState, globalReducer } from './context/globalReducer';
import { TestCaseContext, testCaseState, testCaseReducer } from './context/testCaseReducer';
import { MockDataContext, mockDataState, mockDataReducer } from './context/mockDataReducer';
import ProjectLoader from './containers/ProjectLoader/ProjectLoader';
import NavBar from './containers/NavBar/NavBar';
import LeftPanel from './containers//LeftPanel/LeftPanel';
import RightPanel from './containers/RightPanel/RightPanel';

const App = () => {
  const [global, dispatchToGlobal] = useReducer(globalReducer, globalState);
  const [testCase, dispatchToTestCase] = useReducer(testCaseReducer, testCaseState);
  const [mockData, dispatchToMockData] = useReducer(mockDataReducer, mockDataState);

  if (!global.isProjectLoaded) {
    return (
      <div>
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <ProjectLoader />
        </GlobalContext.Provider>
      </div>
    );
  } else {
    return (
      <div id={global.isFileDirectoryOpen ? styles.appGridOpen : styles.appGridClose}>
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <TestCaseContext.Provider value={[testCase, dispatchToTestCase]}>
            <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
              <NavBar /> 
              <LeftPanel />
            </MockDataContext.Provider>
          </TestCaseContext.Provider>
          <RightPanel />
        </GlobalContext.Provider>
      </div>
    );
  }
};

export default App;
