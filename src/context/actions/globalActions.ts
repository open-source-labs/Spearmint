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

  SET_GUEST: 'SET_GUEST',

  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  SET_FILE_DIRECTORY: 'SET_FILE_DIRECTORY',
  SET_FOLDER_VIEW: 'SET_FOLDER_VIEW',
};

export const setProjectUrl = (url: string) => ({
  type: actionTypes.SET_PROJECT_URL,
  url,
});

export const loadProject = (load: string) => ({
  type: actionTypes.LOAD_PROJECT,
  load,
});

export const createFileTree = (fileTree: string) => ({
  type: actionTypes.CREATE_FILE_TREE,
  fileTree,
});

export const toggleFileDirectory = () => ({
  type: actionTypes.TOGGLE_FILE_DIRECTORY,
});

export const closeRightPanel = () => ({
  type: actionTypes.CLOSE_RIGHT_PANEL,
});

export const toggleRightPanel = (display: string) => ({
  type: actionTypes.TOGGLE_RIGHT_PANEL,
  display,
});

export const toggleFolderView = (filePath: string) => ({
  type: actionTypes.TOGGLE_FOLDER_VIEW,
  filePath,
});

export const highlightFile = (fileName: string) => ({
  type: actionTypes.HIGHLIGHT_FILE,
  fileName,
});

export const setProjectFilePath = (projectFilePath: string) => ({
  type: actionTypes.SET_PROJECT_FILE_PATH,
  projectFilePath,
});

export const setFilePathMap = (filePathMap: string) => ({
  type: actionTypes.SET_FILE_PATH_MAP,
  filePathMap,
});

//added
export const setTestCase = (testCase: string) => ({
  type: actionTypes.SET_TEST_CASE,
  testCase,
});

export const toggleModal = () => ({
  type: actionTypes.TOGGLE_MODAL,
});

export const updateFile = (testString: string) => ({
  type: actionTypes.UPDATE_FILE,
  testString,
});

export const openBrowserDocs = (docsUrl: string) => ({
  type: actionTypes.OPEN_BROWSER_DOCS,
  docsUrl,
});

export const resetToProjectUrl = () => ({
  type: actionTypes.RESET_TO_PROJECT_URL,
});

export const toggleExportBool = () => ({
  type: actionTypes.TOGGLE_EXPORT_BOOL,
});

export const setFilePath = (filePath: string) => ({
  type: actionTypes.SET_FILE_PATH,
  filePath,
});

export const setValidCode = (validCode: boolean) => ({ 
  type: actionTypes.SET_VALID_CODE,
  validCode,
});

export const setTabIndex = (tabIndex: number) => ({ 
  type: actionTypes.SET_TAB_INDEX,
  tabIndex,
});

export const uploadTest = (testState: object) => ({
  type: actionTypes.UPLOAD_TEST,
  testState,
});

export const setGuest = (guestState: string) => ({
  type: actionTypes.SET_GUEST,
  guestState,
});

export const toggleTheme = () => ({
  type: actionTypes.TOGGLE_THEME,
});

export const setTheme = (theme: string) => ({
  type: actionTypes.SET_THEME,
  theme,
});

export const setFileDirectory = (fileDirectoryOpen: string) => ({
  type: actionTypes.SET_FILE_DIRECTORY,
  fileDirectoryOpen,
});

export const setFolderView = (filePath: string) => ({
  type: actionTypes.SET_FOLDER_VIEW,
  filePath,
});
