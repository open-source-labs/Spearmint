import { globalReducer } from '../context/reducers/globalReducer';

describe('Global Reducer works properly', () => {
  let initialState = {};

  beforeEach(() => {
    initialState = {
      url: null,
      projectUrl: null,
      isProjectLoaded: false,
      fileTree: null,
      componentName: '',
      isFileDirectoryOpen: true,
      isRightPanelOpen: true,
      rightPanelDisplay: 'browserView',
      isFolderOpen: {},
      isFileHighlighted: '',
      projectFilePath: '',
      filePathMap: {},
      file: '',
      testCase: '',
      isTestModalOpen: true,
      exportBool: false,
      fileName: '',
      filePath: '',
    };
  });

  it('should return the initial state', () => {
    expect(globalReducer(initialState, {})).toEqual(initialState);
  });

  it('should handle SET_PROJECT_URL', () => {
    const action = { type: 'SET_PROJECT_URL', url: 'www.google.com' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      url: 'www.google.com',
      projectUrl: 'www.google.com',
    });
  });

  // it('should handle LOAD_PROJECT', () => {
  //   const action = { type: 'LOAD_PROJECT', load};
  //   expect(globalReducer(initialState, action)).toEqual({
  //     ...initialState,
  //     isProjectLoaded
  //   })
  // })

  it('should handle CREATE_FILE_TREE', () => {
    const action = {
      type: 'CREATE_FILE_TREE',
      fileTree: [
        {
          filePath: '/Users/seanhaverstock/Codesmith/spearmint/.env',
          fileName: '.env',
          files: Array(0),
        },
        {
          filePath: '/Users/seanhaverstock/Codesmith/spearmint/.eslintignore',
          fileName: '.eslintignore',
          files: Array(0),
        },
      ],
    };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      fileTree: [
        {
          filePath: '/Users/seanhaverstock/Codesmith/spearmint/.env',
          fileName: '.env',
          files: Array(0),
        },
        {
          filePath: '/Users/seanhaverstock/Codesmith/spearmint/.eslintignore',
          fileName: '.eslintignore',
          files: Array(0),
        },
      ],
    });
  });

  it('should handle TOGGLE_FILE_DIRECTORY', () => {
    expect(globalReducer(initialState, {})).toEqual({
      ...initialState,
      isFileDirectoryOpen: true,
    });
    const action = { type: 'TOGGLE_FILE_DIRECTORY' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      isFileDirectoryOpen: !initialState.isFileDirectoryOpen,
    });
  });

  it('should handle CLOSE_RIGHT_PANEL', () => {
    const action = { type: 'CLOSE_RIGHT_PANEL' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      isRightPanelOpen: false,
    });
  });
  it('should handle TOGGLE_RIGHT_PANEL', () => {
    const action = { type: 'TOGGLE_RIGHT_PANEL', display: 'codeEditorView' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      rightPanelDisplay: 'codeEditorView',
    });
    expect(globalReducer(initialState, action)).not.toEqual({
      ...initialState,
      rightPanelDisplay: 'browserView',
    });
  });
  // it('should handle DISPLAY_FILE_CODE', () => {

  // })
  it('should handle TOGGLE_FOLDER_VIEW', () => {
    //const filePath = 'src/__tests__/globalReducer.test.js';
    const action = { type: 'TOGGLE_FOLDER_VIEW', filePath: 'src/__tests__/globalReducer.test.js' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      isFolderOpen: {
        'src/__tests__/globalReducer.test.js': true,
      },
    });
  });

  it('should handle HIGHLIGHT_FILE', () => {
    const fileName = 'globalReducer.test.js';
    const action = { type: 'HIGHLIGHT_FILE', fileName };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      isFileHighlighted: fileName,
      fileName,
    });
  });
});
