import React, { useReducer } from 'react';
import styles from './App.module.scss';
import { GlobalContext, globalState, globalReducer } from './context/reducers/globalReducer';
import ProjectLoader from './pages/ProjectLoader/ProjectLoader';
import NavBar from './components/NavBar/NavBar';
import LeftPanel from './pages//LeftPanel/LeftPanel';
import RightPanel from './pages/RightPanel/RightPanel';
import About from './pages/About/About';

const App = () => {
  // useReducer takes a reducer and initial state as
  // args and return the current state paired with a dispatch method
  // distpatchTo method invokes associated reducer function

  const [global, dispatchToGlobal] = useReducer(globalReducer, globalState);

  if (!global.isProjectLoaded) {
    return (
      <div>
        {/* pass global state and dispatch function as prop to context provider for child components */}
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <ProjectLoader />
        </GlobalContext.Provider>
      </div>
    );
  } else if (global.isProjectLoaded === 'about') {
    return (
      <>
        <About dispatch={dispatchToGlobal} />
      </>
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
      <div
        id={
          global.isFileDirectoryOpen
            ? global.isRightPanelOpen
              ? styles.fileDirectoryOpenRightPanelOpen
              : styles.fileDirectoryOpenRightPanelClosed
            : global.isRightPanelOpen
            ? styles.fileDirectoryClosedRightPanelOpen
            : styles.fileDirectoryClosedRightPanelClosed
        }
      >
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <NavBar />
          <LeftPanel />
          {global.isRightPanelOpen ? <RightPanel /> : ''}
        </GlobalContext.Provider>
      </div>
    );
  }
};

export default App;
