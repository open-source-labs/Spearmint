import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { globalReducer, globalState } from '../context/reducers/globalReducer.js';
import { actionTypes } from '../context/actions/globalActions.js';
describe('globalReducer works properly', () => {
  let state = globalState;

  beforeEach(() => {
    state = globalState;
  });

  test('', () => {
    expect(
      globalReducer(state, {
        type: actionTypes.TOGGLE_RIGHT_PANEL,
        display: 'codeEditorView',
      })
    ).toEqual({
      ...state,
      rightPanelDisplay: 'codeEditorView',
    });
  });
});
