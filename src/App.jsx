import React, { useReducer } from 'react';
import styles from './App.module.scss';
import { GlobalContext, globalState, globalReducer } from './context/reducers/globalReducer';
import { toggleTheme } from './context/actions/globalActions';
import ProjectLoader from './pages/ProjectLoader/ProjectLoader.jsx';
import NavBar from './components/NavBar/NavBar';
import LeftPanel from './pages/LeftPanel/LeftPanel';
import RightPanel from './pages/RightPanel/RightPanel';
import FileDirectory from './components/FileDirectory/FileDirectory';
import { CSSTransition } from 'react-transition-group';
import { Switch } from '@material-ui/core';
// import About from './pages/About/About';

const App = () => {
  const [global, dispatchToGlobal] = useReducer(globalReducer, globalState);

  const changeTheme = () => {
    localStorage.setItem("theme", global.theme === 'light' ? 'dark' : 'light');
    dispatchToGlobal(toggleTheme());
  };

  if (!global.isProjectLoaded) {
    return (
      <div>
        {/* pass global state and dispatch function as prop to context provider for child components */}
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <div id={styles.toggle}>
            <Switch checked={global.theme === 'light' ? true : false} onChange={changeTheme}/>
          </div>
          <ProjectLoader/>
        </GlobalContext.Provider>
      </div>
    );
  }
  return (
  /**
       * Wrap the components that we want to share the unique states with.
       * You can only provide one value to a Provider.
       *  - In order to avoid creating separate Contexts, wrap multiples in an array (ex: testCase and dispatchToTestCase).
       *
       *
       * NOTE: This concept is similar to Redux and how it provides the store to your top-level component and all of its children.
       * We just have to create separate providers for each reducer because we don’t have a global store ala Redux.
       *
       *
       * We access the value that we gave to the Provider through useContext
       * 
       * 01/29 There does not seem to be 'about' page functionality visible
       */
    <div
      // id={
      //     global.isProjectLoaded === 'about'
      //       ? ''
      //       : global.isFileDirectoryOpen
      //         ? global.isRightPanelOpen
      //           ? styles.fileDirectoryOpenRightPanelOpen
      //           : styles.fileDirectoryOpenRightPanelClosed
      //         : global.isRightPanelOpen
      //           ? styles.fileDirectoryClosedRightPanelOpen
      //           : styles.fileDirectoryClosedRightPanelClosed
      //   }
      id={styles.app}
    >
      <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <NavBar inAboutPage={false} />
          <div id={styles[`content${global.theme}`]}>
            <CSSTransition in={global.isFileDirectoryOpen} timeout={200} classNames="my-node" unmountOnExit appear>
              <FileDirectory fileTree={global.fileTree} />
            </CSSTransition>
            <LeftPanel />
            <RightPanel />
          </div>
      </GlobalContext.Provider>
    </div>
  );
};

export default App;
