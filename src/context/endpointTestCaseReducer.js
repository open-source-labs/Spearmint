import { createContext } from 'react';
import { actionTypes } from './endpointTestCaseActions';

export const EndpointTestCaseContext = createContext(null);

export const endpointTestCaseState = {
  endpointTestStatement: '',
  endpointStatements: [],
  hasEndpoint: 0,
};

let statementId = 0;

/* add helper functions here */

export const endpointTestCaseReducer = (state, action) => {
  Object.freeze(state);
  let endpointStatements = [...state.endpointStatements];

  switch (action.type) {
    case actionTypes.UPDATE_ENDPOINT_TEST_STATEMENT:
      let endpointTestStatement = action.endpointTestStatement;
      return {
        ...state,
        endpointTestStatement,
      };

    case actionTypes.TOGGLE_ENDPOINT:
      return {
        ...state,
        hasEndpoint: state.hasEndpoint + 1,
      };

    case actionTypes.CREATE_NEW_ENDPOINT_TEST:
      return {
        hasEndpoint: 0,
        endpointTestStatement: '',
        endpointStatements: [],
      };

    default:
      return state;
  }
};
