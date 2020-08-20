import '@testing-library/jest-dom/extend-expect';
import { globalReducer } from '../context/reducers/globalReducer.js';
import { actionTypes } from '../context/actions/globalActions.js';

test('should handle TOGGLE_MODAL action', () => {
  expect(
    globalReducer(
      {
        isTestModalOpen: false,
      },
      {
        type: actionTypes.TOGGLE_MODAL,
      }
    )
  ).toEqual({
    isTestModalOpen: true,
  });
});
