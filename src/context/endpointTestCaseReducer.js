import { createContext } from 'react';
import { actionTypes } from './endpointTestCaseActions'

export const EndpointTestCaseContext = createContext(null);

export const endpointTestCaseState = {
    endpointTestStatement: '',
    endpointStatements: [],
    hasEndpoint: false
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
                hasEndpoint: !state.hasEndpoint,
            };

        case actionTypes.CREATE_NEW_ENDPOINT_TEST: 
            return {
                endpointTestStatement: '',
                endpointStatements: [],
            };

        default:
            return state;
    }
} 