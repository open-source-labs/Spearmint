import { createContext } from 'react';
import { actionTypes } from '../actions/globalActions';

export const GlobalContext = createContext(null);

export const globalState = {
  url: null,
  projectUrl: null,
  isProjectLoaded: false,
  fileTree: null,
  isFileDirectoryOpen: true,
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
  filePath: '',
};

export const globalReducer = (state, action) => {
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
      return {
        ...state,
        isProjectLoaded: action.load,
      };
    case actionTypes.CREATE_FILE_TREE:
      const fileTree = action.fileTree;
      return {
        ...state,
        fileTree,
      };

    case actionTypes.TOGGLE_FILE_DIRECTORY:
      const isFileDirectoryOpen = !state.isFileDirectoryOpen;
      return {
        ...state,
        isFileDirectoryOpen,
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
      const isFolderOpen = { ...state.isFolderOpen };
      isFolderOpen[action.filePath] = !isFolderOpen[action.filePath];
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

    //added
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
    //
    case actionTypes.UPDATE_FILE_SHOW:
      const updatedFile = action.testString;
      return {
        ...state,
        file: updatedFile,
      };
    case actionTypes.OPEN_BROWSER_DOCS:
      const docsUrl = action.docsUrl;
      return {
        ...state,
        url: docsUrl,
        isRightPanelOpen: true,
        rightPanelDisplay: 'browserView',
      };
    case actionTypes.NEW_TEST_CLOSE_BROWSER_DOCS:
      const urlReset = state.projectUrl;
      return {
        ...state,
        url: urlReset,
        projectUrl: urlReset,
      };
    case actionTypes.EXPORT:
      let exportBool = !state.exportBool;
      return {
        ...state,
        exportBool,
      };
    case actionTypes.SET_FILE_PATH:
      const filePath = action.filePath;
      return {
        ...state,
        filePath,
      };
    default:
      return state;
  }
};
