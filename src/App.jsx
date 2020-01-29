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
  // reducer is invoked in App since it's the common parent of testCase and ExportFileModal components
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
      /** 
       * Wrap the components that we want to share the unique states with (ex: share testCase state with navbar & left panel (the two containers that hold the components that need testCaseRducer)) in the unique providers (ex: TestCaseContext.Provider). 
       * You can only provide one value to a Provider. 
       *  - In order to avoid creating separate Contexts, wrap multiples in an array (ex: testCase and dispatchToTestCase).
       * 
       * 
       * NOTE: This concept is similar to Redux and how it provides the store to your top-level component and all of its children. 
       * We just have to create separate providers for each reducer because we don’t have a global store ala Redux.
       * 
       * 
       * We access the value that we gave to the Provider through useContext
       */
      <div id={global.isFileDirectoryOpen ? styles.appGridOpen : styles.appGridClose}>
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          {/* value wrapped in array since Provider only takes in one value */}
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
