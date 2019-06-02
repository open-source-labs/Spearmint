export const actionTypes = {
  SET_PROJECT_URL: 'SET_PROJECT_URL',
  LOAD_PROJECT: 'LOAD_PROJECT',
  CREATE_FILE_TREE: 'CREATE_FILE_TREE',
  SET_COMPONENT_NAME: 'SET_COMPONENT_NAME',
  SET_FILE_PATH: 'SET_FILE_PATH',
  TOGGLE_BROWSER: 'TOGGLE_BROWSER',
  TOGGLE_CODE_EDITOR: 'TOGGLE_CODE_EDITOR',
  DISPLAY_FILE_CODE: 'DISPLAY_FILE_CODE'
};

export const setProjectUrl = () => ({
  type: actionTypes.SET_PROJECT_URL,
})

export const loadProject = () => ({
  type: actionTypes.LOAD_PROJECT,
})

export const createFileTree = () => ({
  type: actionTypes.CREATE_FILE_TREE,
})

export const setFilePath = () => ({
  type: actionTypes.SET_FILE_PATH
})

export const toggleBrowser = () => ({
  type: actionTypes.toggleBrowser
})

export const toggleCodeEditor = () => ({
  type: actionTypes.TOGGLE_CODE_EDITOR
})

export const displayFileCode = () => ({
  type: actionTypes.DISPLAY_FILE_CODE
})
