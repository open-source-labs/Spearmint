import { createContext } from 'react';
import { actionTypes } from './globalActions';

export const GlobalContext = createContext(null);

export const globalState = {
  url: '',
  isProjectLoaded: false,
  fileTree: null,
  componentName: '',
  filePath: '',
  isFileDirectoryOpen: true,
  isBrowserOpen: true,
  displayedFileCode: '',
};

export const globalReducer = (state, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actionTypes.SET_PROJECT_URL:
      const url = action.url;
      return {
        ...state,
        url,
      }
    case actionTypes.LOAD_PROJECT:
      const isProjectLoaded = true;
      return {
        ...state,
        isProjectLoaded,
      }
    case actionTypes.CREATE_FILE_TREE:
      const fileTree = action.fileTree;
      return {
        ...state,
        fileTree,
      }
    case actionTypes.SET_COMPONENT_NAME:
      return {
        ...state,
      }
    case actionTypes.SET_FILE_PATH:
      return {
        ...state,
      }
      case actionTypes.TOGGLE_FILE_DIRECTORY:
        const isFileDirectoryOpen = !state.isFileDirectoryOpen;
        return {
          ...state,
          isFileDirectoryOpen,
        }
    case actionTypes.TOGGLE_BROWSER:
      const isBrowserOpen = !state.isBrowserOpen;
      return {
        ...state,
        isBrowserOpen,
      }
    case actionTypes.DISPLAY_FILE_CODE:
      return {
        ...state,
      }
    default:
      return state;
  }
};
