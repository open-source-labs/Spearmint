import { globalReducer, globalState } from '../context/reducers/globalReducer';

describe('Global Reducer works properly', () => {
  let initialState = globalState;

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

  test('demo2', () => {
    expect(
      globalReducer(initialState, {
        type: 'CLOSE_RIGHT_PANEL',
      })
    ).toEqual({
      ...initialState,
      isRightPanelOpen: false,
    });
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
    const fileTree = [
      {
        filePath: '/Users/anon/Codesmith/spearmint/.env',
        fileName: '.env',
        files: Array(0),
      },
      {
        filePath: '/Users/anon/Codesmith/spearmint/.eslintignore',
        fileName: '.eslintignore',
        files: Array(0),
      },
    ];
    const action = {
      type: 'CREATE_FILE_TREE',
      fileTree,
    };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      fileTree,
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

  it('should handle SET_PROJECT_FILE_PATH', () => {
    const action = {
      type: 'SET_PROJECT_FILE_PATH',
      projectFilePath: '/Users/anon/Codesmith/spearmint',
    };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      projectFilePath: '/Users/anon/Codesmith/spearmint',
    });
  });

  it('should handle SET_FILE_PATH_MAP', () => {
    const filePathObject = {
      electron: '/Users/anon/Codesmith/spearmint/public/electron.js',
      AutoComplete: '/Users/anon/Codesmith/spearmint/src/components/AutoComplete/AutoComplete.jsx',
    };
    const action = { type: 'SET_FILE_PATH_MAP', filePathMap: filePathObject };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      filePathMap: filePathObject,
    });
  });

  it('should handle SET_TEST_CASE', () => {
    const action = { type: 'SET_TEST_CASE', testCase: 'react' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      testCase: 'react',
    });
    expect(globalReducer(initialState, action)).not.toEqual({
      ...initialState,
      testCase: 'puppeteeer',
    });
  });

  it('should handle TOGGLE_MODAL', () => {
    const action = { type: 'TOGGLE_MODAL' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      isTestModalOpen: !initialState.isTestModalOpen,
    });
  });

  it('should handle UPDATE_FILE_SHOW', () => {
    let action = { type: 'UPDATE_FILE_SHOW', testString: '' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      file: '',
    });
    action = {
      type: 'UPDATE_FILE_SHOW',
      testString: `import React from "react";
      import { render, fireEvent } from '@testing-library/react';
      import '@testing-library/jest-dom/extend-expect`,
    };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      file: `import React from "react";
      import { render, fireEvent } from '@testing-library/react';
      import '@testing-library/jest-dom/extend-expect`,
    });
  });

  it('should handle OPEN_BROWSER_DOCS', () => {
    const reactUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';
    const action = { type: 'OPEN_BROWSER_DOCS', docsUrl: reactUrl };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      url: reactUrl,
      isRightPanelOpen: true,
      rightPanelDisplay: 'browserView',
    });
  });

  it('should handle EXPORT', () => {
    const action = { type: 'EXPORT' };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      exportBool: true,
    });
  });

  it('should handle SET_FILE_PATH', () => {
    const action = {
      type: 'SET_FILE_PATH',
      filePath: '/Users/anon/Codesmith/spearmint/public/electron.js',
    };
    expect(globalReducer(initialState, action)).toEqual({
      ...initialState,
      filePath: '/Users/anon/Codesmith/spearmint/public/electron.js',
    });
  });
});
