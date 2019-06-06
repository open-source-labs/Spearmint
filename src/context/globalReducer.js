import { createContext } from 'react';
import { actionTypes } from './globalActions';
// import { object } from '../../../../Library/Caches/typescript/3.4.5/node_modules/@types/prop-types';

export const GlobalContext = createContext(null);

export const globalState = {
  url: '',
  isProjectLoaded: false,
  fileTree: null,
  componentName: '',
  isFileDirectoryOpen: true,
  isBrowserOpen: true,
  displayedFileCode: '',
  isFolderOpen: {},
  isFileHighlighted: '',
  projectFilePath: '',
  filePathMap: {},
};

export const globalReducer = (state, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actionTypes.SET_PROJECT_URL:
      const url = action.url;
      return {
        ...state,
        url,
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
    case actionTypes.SET_COMPONENT_NAME:
      const componentName = action.componentName;
      return {
        ...state,
        componentName,
      };
    case actionTypes.TOGGLE_FILE_DIRECTORY:
      const isFileDirectoryOpen = !state.isFileDirectoryOpen;
      return {
        ...state,
        isFileDirectoryOpen,
      };
    case actionTypes.TOGGLE_BROWSER:
      const isBrowserOpen = !state.isBrowserOpen;
      return {
        ...state,
        isBrowserOpen,
      };
    case actionTypes.DISPLAY_FILE_CODE:
      const displayedFileCode = action.displayedFileCode;
      return {
        ...state,
        displayedFileCode,
      };
    case actionTypes.TOGGLE_FOLDER_VIEW:
      const isFolderOpen = { ...state.isFolderOpen };
      isFolderOpen[action.filePath] = !isFolderOpen[action.filePath];
      console.log(isFolderOpen)
      return {
        ...state,
        isFolderOpen,
      };
    case actionTypes.HIGHLIGHT_FILE:
      const isFileHighlighted = action.fileName;
      console.log(isFileHighlighted);
      return {
        ...state,
        isFileHighlighted,
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

    default:
      return state;
  }
};
