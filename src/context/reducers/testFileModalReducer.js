import { createContext } from 'react';
import { actionTypes } from '../actions/testFileModalActions';

export const TestFileModalContext = createContext(null);

export const testFileModalState = {
  isTestModalOpen: true,
};

export const testFileModalReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
      return {
        isTestModalOpen: !state.isTestModalOpen,
      };
    default:
      return state;
  }
};
