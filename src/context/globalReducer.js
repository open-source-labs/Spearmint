import { createContext } from 'react';
import { actionTypes } from './globalActions';

export const globalContext = createContext(null);

export const globalState = {
  url: '',
  isProjectLoaded: false,
  fileTree: null,
  componentName: '',
  filePath: '',
  toggleBrowser: false,
  toggleCodeEditor: false,
  displayedFileCode: '',
};

export const globalReducer = (state, action) => {
  Object.freeze(state);

  switch (action.type) {
    default:
      return state;
  }
};
