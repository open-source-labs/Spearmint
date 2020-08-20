//import '@testing-library/jest-dom/extend-expect';
import { globalReducer } from '../context/reducers/globalReducer.js';

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
