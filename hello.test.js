import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { globalReducer } from './src/context/reducers/globalReducer.js';
//import * as types from '../src/context/actions/globalActions.js';

test('should handle CLOSE_RIGHT_PANEL', () => {
  expect(
    globalReducer(
      {
        isRightPanelOpen: true,
      },
      {
        type: 'CLOSE_RIGHT_PANEL',
      }
    )
  ).toEqual({
    isRightPanelOpen: false,
  });
});
