import { createContext } from 'react';
import { SecTestCaseState, Action } from '../../utils/secTypes';
import { actionTypes } from '../actions/secTestCaseActions';

export const SecTestCaseContext: any = createContext([]);

/* ------------------------- Security Test Case State ------------------------ */

export const secTestCaseState: SecTestCaseState = {
  modalOpen: true
}

/* ------------------------- Security Test Case Reducer ------------------------ */

export const secTestCaseReducer = (state: SecTestCaseState, action: Action) => {
  switch (action.type) {
    case actionTypes.OPEN_INFO_MODAL: {
      return {
        ...state,
        modalOpen: true
      }
    }
    case actionTypes.OPEN_INFO_MODAL: {
      return {
        ...state,
        modalOpen: true
      }
    }      
  }
}