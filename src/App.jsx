import React, { useReducer } from 'react';
import styles from './App.module.scss';
import { GlobalContext, globalState, globalReducer } from './context/globalReducer';
import { ReactTestCaseContext, reactTestCaseState, reactTestCaseReducer } from './context/reactTestCaseReducer';
import {
  PuppeteerTestCaseContext,
  puppeteerTestCaseState,
  puppeteerTestCaseReducer,
} from './context/puppeteerTestCaseReducer';
import {
  EndpointTestCaseContext,
  endpointTestCaseState,
  endpointTestCaseReducer,
} from './context/endpointTestCaseReducer';
import {
  ReduxTestCaseContext,
  reduxTestCaseState,
  reduxTestCaseReducer,
} from './context/reduxTestCaseReducer';
import {
  HooksTestCaseContext,
  hooksTestCaseState,
  hooksTestCaseReducer,
} from './context/hooksTestCaseReducer';
import {
  TestFileModalContext,
  testFileModalState,
  testFileModalReducer,
} from './context/testFileModalReducer';

import { MockDataContext, mockDataState, mockDataReducer } from './context/mockDataReducer';
import ProjectLoader from './containers/ProjectLoader/ProjectLoader';
import NavBar from './containers/NavBar/NavBar';
import LeftPanel from './containers//LeftPanel/LeftPanel';
import RightPanel from './containers/RightPanel/RightPanel';

const App = () => {
  const [global, dispatchToGlobal] = useReducer(globalReducer, globalState);
  const [reactTestCase, dispatchToReactTestCase] = useReducer(reactTestCaseReducer, reactTestCaseState);
  const [mockData, dispatchToMockData] = useReducer(mockDataReducer, mockDataState);
  const [endpointTestCase, dispatchToEndpointTestCase] = useReducer(
    endpointTestCaseReducer,
    endpointTestCaseState
  );

  const [reduxTestCase, dispatchToReduxTestCase] = useReducer(
    reduxTestCaseReducer,
    reduxTestCaseState
  );
  const [hooksTestCase, dispatchToHooksTestCase] = useReducer(
    hooksTestCaseReducer,
    hooksTestCaseState
  );
  const [puppeteerTestCase, dispatchToPuppeteerTestCase] = useReducer(
    puppeteerTestCaseReducer,
    puppeteerTestCaseState
  );
  const [testFileModal, dispatchToTestFileModal] = useReducer(
    testFileModalReducer,
    testFileModalState
  );


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
      <div id={global.isFileDirectoryOpen ? 
        (global.isRightPanelOpen? styles.fileDirectoryOpenRightPanelOpen : styles.fileDirectoryOpenRightPanelClosed) :
        (global.isRightPanelOpen? styles.fileDirectoryClosedRightPanelOpen : styles.fileDirectoryClosedRightPanelClosed) 
      }>
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <ReduxTestCaseContext.Provider value={[reduxTestCase, dispatchToReduxTestCase]}>
            <ReactTestCaseContext.Provider value={[reactTestCase, dispatchToReactTestCase]}>
                <EndpointTestCaseContext.Provider value={[endpointTestCase, dispatchToEndpointTestCase]}>
                  <HooksTestCaseContext.Provider value={[hooksTestCase, dispatchToHooksTestCase]}>
                    <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
                      <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
                        <PuppeteerTestCaseContext.Provider value={[puppeteerTestCase, dispatchToPuppeteerTestCase]}>
                          <NavBar />
                          <LeftPanel />
                        </PuppeteerTestCaseContext.Provider>
                      </MockDataContext.Provider>
                    </TestFileModalContext.Provider>
                  </HooksTestCaseContext.Provider>
                </EndpointTestCaseContext.Provider>
            </ReactTestCaseContext.Provider>
          </ReduxTestCaseContext.Provider>
          {global.isRightPanelOpen ?  <RightPanel /> : ''}
        </GlobalContext.Provider>
      </div>
    );
  }
};

export default App;
