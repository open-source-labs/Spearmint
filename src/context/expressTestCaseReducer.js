import { createContext } from 'react';
import { actionTypes } from './expressTestCaseActions'

export const ExpressTestCaseContext = createContext(null);

export const expressTestCaseState = {
    expressTestStatement: '',
    expressStatements: [],
    hasExpress: false
};

let statementId = 0;

/* add helper functions here */


export const expressTestCaseReducer = (state, action) => {
    Object.freeze(state);
    let expressStatements = [...state.expressStatements];

    switch (action.type) {
        case actionTypes.TOGGLE_EXPRESS:
            return {
                ...state,
                hasExpress: !state.hasExpress,
            };

        case actionTypes.CREATE_NEW_EXPRESS_TEST: 
            return {
                expressTestStatement: '',
                expressStatements: [],
            };

        default:
            return state;
    }
} 