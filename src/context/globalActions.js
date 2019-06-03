export const actionTypes = {
  SET_PROJECT_URL: 'SET_PROJECT_URL',
  LOAD_PROJECT: 'LOAD_PROJECT',
  CREATE_FILE_TREE: 'CREATE_FILE_TREE',
  SET_COMPONENT_NAME: 'SET_COMPONENT_NAME',
  SET_FILE_PATH: 'SET_FILE_PATH',
  TOGGLE_FILE_DIRECTORY: 'TOGGLE_FILE_DIRECTORY',
  TOGGLE_BROWSER: 'TOGGLE_BROWSER',
  DISPLAY_FILE_CODE: 'DISPLAY_FILE_CODE'
};

export const setProjectUrl = (url) => ({
  type: actionTypes.SET_PROJECT_URL,
  url,
});

export const loadProject = () => ({
  type: actionTypes.LOAD_PROJECT,
});

export const createFileTree = (fileTree) => ({
  type: actionTypes.CREATE_FILE_TREE,
  fileTree,
});

export const setComponentName = (componentName) => ({
  type: actionTypes.SET_COMPONENT_NAME,
  componentName,
});

export const setFilePath = () => ({
  type: actionTypes.SET_FILE_PATH
});

export const toggleFileDirectory = () => ({
  type: actionTypes.TOGGLE_FILE_DIRECTORY,
});

export const toggleBrowser = () => ({
  type: actionTypes.TOGGLE_BROWSER,
});


export const displayFileCode = (displayedFileCode) => ({
  type: actionTypes.DISPLAY_FILE_CODE,
  displayedFileCode,
});
