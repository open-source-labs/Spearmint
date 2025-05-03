import { createContext } from 'react';
import { actionTypes } from '../actions/globalActions';
import {  GlobalStateTypes, GlobalActionTypes } from '../../utils/globalTypes';

// This is your global state, holds status of things like file directory, different panels,
// basically all global items
export const globalState: GlobalStateTypes = {
  url: 'http://www.google.com/',
  projectUrl: null,
  isProjectLoaded: false,
  fileTree: null,
  isFileDirectoryOpen: false,
  isRightPanelOpen: true,
  rightPanelDisplay: 'browserView',
  isFolderOpen: {},
  isFileHighlighted: '',
  projectFilePath: '',
  filePathMap: {},
  file: '',
  testCase: '',
  docsOpen: false,
  isTestModalOpen: true,
  exportBool: false,
  fileName: '',
  filePath: 'TEST INITIAL FILE PATH',
  validCode: true,
  tabIndex: 0,
  isGuest: false,
  theme: window.localStorage.theme ?? 'light',
  testFramework: 'jest', //! added new global testframework
};


const dispatchToGlobal = () => null;

const contextArr: [GlobalStateTypes, Function] = [globalState, dispatchToGlobal]

// use useContext to create that global state to be used in other files
//used in most files to pass in the global state and dispatchToGlobal
export const GlobalContext = createContext<[GlobalStateTypes, Function]>(contextArr); // originally createContext(null)


// TODO: action type is any due to the fact that each action in glovalActions.ts is an object with different properties which does not lead itself to a unified Action interface via Typescript
// All of the actions must be modified to nest the necessary data inside of a payload property and/or all of the cases in the reducer below must be modified

// These are your global actions, again like above these pertain to things globally like the files,
// navbar actions, themes, etc.
export const globalReducer = (state: GlobalStateTypes, action: GlobalActionTypes) => {
  Object.freeze(state);

  
  switch (action.type) {
    case actionTypes.SET_PROJECT_URL:
      const url = action.url;
      return {
        ...state,
        url,
        projectUrl: url,
      };

      

    case actionTypes.LOAD_PROJECT:
      const isProjectLoaded = action.load;
      return {
        ...state,
        isProjectLoaded,
      };

    case actionTypes.CREATE_FILE_TREE:
      const fileTree = action.fileTree;
      return {
        ...state,
        fileTree,
      };

    case actionTypes.TOGGLE_FILE_DIRECTORY:
      return {
        ...state,
        isFileDirectoryOpen: !state.isFileDirectoryOpen,
      };

    case actionTypes.SET_FILE_DIRECTORY:
      const fileDirectoryOpen = action.fileDirectoryOpen;
      return {
        ...state,
        isFileDirectoryOpen: fileDirectoryOpen,
      };

    case actionTypes.CLOSE_RIGHT_PANEL:
      const projUrl = state.projectUrl;
      return {
        ...state,
        isRightPanelOpen: false,
        url: projUrl,
      };

    case actionTypes.TOGGLE_RIGHT_PANEL:
      const rightPanelDisplay = action.display;
      return {
        ...state,
        rightPanelDisplay,
        isRightPanelOpen: true,
      };

    case actionTypes.TOGGLE_FOLDER_VIEW:
      let isFolderOpen = { ...state.isFolderOpen };
      isFolderOpen[action.filePath!] = !isFolderOpen[action.filePath!] ?? true;
      return {
        ...state,
        isFolderOpen,
      };

    case actionTypes.SET_FOLDER_VIEW:
      isFolderOpen = { ...state.isFolderOpen };
      isFolderOpen[action.filePath!] = true;
      return {
        ...state,
        isFolderOpen,
      };

    case actionTypes.HIGHLIGHT_FILE:
      const isFileHighlighted = action.fileName;
      const fileName = action.fileName;
      return {
        ...state,
        isFileHighlighted,
        fileName,
      };

    case actionTypes.SET_PROJECT_FILE_PATH:
      const projectFilePath = action.projectFilePath;
      return {
        ...state,
        projectFilePath,
      };

    case actionTypes.SET_FILE_PATH_MAP:
      const filePathMap = action.filePathMap;
      return {
        ...state,
        filePathMap,
      };

    case actionTypes.SET_TEST_CASE:
      const testCase = action.testCase;
      return {
        ...state,
        testCase,
      };

    case actionTypes.TOGGLE_MODAL:
      return {
        ...state,
        isTestModalOpen: !state.isTestModalOpen,
      };

    case actionTypes.UPDATE_FILE:
      const file = action.testString;
      return {
        ...state,
        file,
      };

    case actionTypes.OPEN_BROWSER_DOCS:
      const docsUrl = action.docsUrl;
      return {
        ...state,
        url: docsUrl,
        isRightPanelOpen: true,
        tabIndex: 1,
      };

    case actionTypes.RESET_TO_PROJECT_URL:
      // formerly NEW_TEST_CLOSE_BROWSER_DOCS
      const urlReset = state.projectUrl;
      return {
        ...state,
        url: urlReset,
        projectUrl: urlReset,
      };

    case actionTypes.TOGGLE_EXPORT_BOOL:
      return {
        ...state,
        exportBool: !state.exportBool,
      };

    case actionTypes.SET_FILE_PATH:
      const filePath = action.filePath;
      return {
        ...state,
        filePath,
      };

    case actionTypes.SET_VALID_CODE:
      const validCode = action.validCode;
      return {
        ...state,
        validCode,
      };

    case actionTypes.SET_TAB_INDEX:
      const tabIndex = action.tabIndex;
      return {
        ...state,
        tabIndex,
      };

    case actionTypes.UPLOAD_TEST:
      const testState = action.testState;
      return {
        ...state,
      };

    case actionTypes.SET_GUEST:
      const guest = action.guestState;

      return {
        ...state,
        isGuest: guest,
      };

    case actionTypes.TOGGLE_THEME:
      let newTheme = state.theme === 'light' ? 'dark' : 'light';

      return {
        ...state,
        theme: newTheme,
      };

    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
//! added hereeeeeeeee
      case actionTypes.SET_TEST_FRAMEWORK: 
      return {
        ...state,
        testFramework: action.testFramework,
      };
      

    default:
      return state;
  }
}; 

