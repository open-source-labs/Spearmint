export const actionTypes = {
  SET_PROJECT_URL: 'SET_PROJECT_URL',
  LOAD_PROJECT: 'LOAD_PROJECT',
  CREATE_FILE_TREE: 'CREATE_FILE_TREE',
  TOGGLE_FILE_DIRECTORY: 'TOGGLE_FILE_DIRECTORY',
  CLOSE_RIGHT_PANEL: 'CLOSE_RIGHT_PANEL',
  TOGGLE_RIGHT_PANEL: 'TOGGLE_RIGHT_PANEL',
  TOGGLE_FOLDER_VIEW: 'TOGGLE_FOLDER_VIEW',
  HIGHLIGHT_FILE: 'HIGHLIGHT_FILE',
  SET_PROJECT_FILE_PATH: 'SET_PROJECT_FILE_PATH',
  SET_FILE_PATH_MAP: 'SET_FILE_PATH_MAP',

  //added
  SET_TEST_CASE: 'SET_TEST_CASE',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  UPDATE_FILE: 'UPDATE_FILE',
  OPEN_BROWSER_DOCS: 'OPEN_BROWSER_DOCS',
  RESET_TO_PROJECT_URL: 'RESET_TO_PROJECT_URL', // formerly NEW_TEST_CLOSE_BROWSER_DOCS
  TOGGLE_EXPORT_BOOL: 'TOGGLE_EXPORT_BOOL',
  SET_FILE_PATH: 'SET_FILE_PATH',
  SET_VALID_CODE: 'SET_VALID_CODE',
  SET_TAB_INDEX: 'SET_TAB_INDEX',

  UPLOAD_TEST: 'UPLOAD_TEST',

  SET_GUEST: 'SET_GUEST'
};

export const setProjectUrl = (url) => ({
  type: actionTypes.SET_PROJECT_URL,
  url,
});

export const loadProject = (load) => ({
  type: actionTypes.LOAD_PROJECT,
  load,
});

export const createFileTree = (fileTree) => ({
  type: actionTypes.CREATE_FILE_TREE,
  fileTree,
});

export const toggleFileDirectory = () => ({
  type: actionTypes.TOGGLE_FILE_DIRECTORY,
});

export const closeRightPanel = () => ({
  type: actionTypes.CLOSE_RIGHT_PANEL,
});

export const toggleRightPanel = (display) => ({
  type: actionTypes.TOGGLE_RIGHT_PANEL,
  display,
});

export const toggleFolderView = (filePath) => ({
  type: actionTypes.TOGGLE_FOLDER_VIEW,
  filePath,
});

export const highlightFile = (fileName) => ({
  type: actionTypes.HIGHLIGHT_FILE,
  fileName,
});

export const setProjectFilePath = (projectFilePath) => ({
  type: actionTypes.SET_PROJECT_FILE_PATH,
  projectFilePath,
});

export const setFilePathMap = (filePathMap) => ({
  type: actionTypes.SET_FILE_PATH_MAP,
  filePathMap,
});

//added
export const setTestCase = (testCase) => ({
  type: actionTypes.SET_TEST_CASE,
  testCase,
});

export const toggleModal = () => ({
  type: actionTypes.TOGGLE_MODAL,
});

export const updateFile = (testString) => ({
  type: actionTypes.UPDATE_FILE,
  testString,
});

export const openBrowserDocs = (docsUrl) => ({
  type: actionTypes.OPEN_BROWSER_DOCS,
  docsUrl,
});

export const resetToProjectUrl = () => ({
  type: actionTypes.RESET_TO_PROJECT_URL,
});

export const toggleExportBool = () => ({
  type: actionTypes.TOGGLE_EXPORT_BOOL,
});

export const setFilePath = (filePath) => ({
  type: actionTypes.SET_FILE_PATH,
  filePath,
});

export const setValidCode = (validCode) => ({
  type: actionTypes.SET_VALID_CODE,
  validCode,
});

export const setTabIndex = (tabIndex) => ({
  type: actionTypes.SET_TAB_INDEX,
  tabIndex,
});

export const uploadTest = (testState) => ({
  type: actionTypes.UPLOAD_TEST,
  testState,
});

export const setGuest = (guestState) => ({
  type: actionTypes.SET_GUEST,
  guestState,
});