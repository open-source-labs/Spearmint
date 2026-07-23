import React, { useReducer } from 'react';
import styles from './App.module.scss';
import {
  GlobalContext,
  globalState,
  globalReducer,
} from './context/reducers/globalReducer';
import ProjectLoader from './pages/ProjectLoader/ProjectLoader.jsx';
import NavBar from './components/NavBar/NavBar';
import ModeSwitch from './components/ModeSwitch/ModeSwitch';
import LeftPanel from './pages/LeftPanel/LeftPanel';
import RightPanel from './pages/RightPanel/RightPanel';
import FileDirectory from './components/FileDirectory/FileDirectory';
import { CSSTransition } from 'react-transition-group';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  const [global, dispatchToGlobal] = useReducer(globalReducer, globalState);

  // render project loader page that enables user to pick a project
  if (!global.isProjectLoaded) {
    return (
      <div>
        {/* pass global state and dispatch function as prop to context provider for child components */}
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <ThemeProvider theme={theme} >
            <StyledEngineProvider injectFirst>
                <div id={styles.toggle}>
                  <ModeSwitch/>
                </div>
                <ProjectLoader />
            </StyledEngineProvider>
          </ThemeProvider>
        </GlobalContext.Provider>
      </div>
    );
  }
  // after user picks project, load page that tells user to choose a test
  if (global.testCase === '') {
    return (
      <div>
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          <ThemeProvider theme={theme} >
            <StyledEngineProvider injectFirst>
              <NavBar inAboutPage={false} />
              <div id={styles[`content${global.theme}`]}>
                <CSSTransition
                  in={global.isFileDirectoryOpen}
                  timeout={200}
                  classNames="my-node"
                  unmountOnExit
                  appear
                >
                  <FileDirectory fileTree={global.fileTree} />
                </CSSTransition>
                <LeftPanel />
              </div>
            </StyledEngineProvider>
          </ThemeProvider>
        </GlobalContext.Provider>
      </div>
    )
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
     */
    <div id={styles.app}>
      <GlobalContext.Provider value={[global, dispatchToGlobal]}>
        <ThemeProvider theme={theme} >
          <StyledEngineProvider injectFirst>
            <NavBar inAboutPage={false} />
            <div id={styles[`content${global.theme}`]}>
              <CSSTransition
                in={global.isFileDirectoryOpen}
                timeout={200}
                classNames="my-node"
                unmountOnExit
                appear
              >
                <FileDirectory fileTree={global.fileTree} />
              </CSSTransition>
              <LeftPanel/>
              <RightPanel/>
            </div>
          </StyledEngineProvider>
        </ThemeProvider>
      </GlobalContext.Provider>
    </div>
  );
};

export default App;
