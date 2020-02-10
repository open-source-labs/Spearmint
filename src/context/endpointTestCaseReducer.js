import { createContext } from 'react';
import { actionTypes } from './endpointTestCaseActions'

export const EndpointTestCaseContext = createContext(null);

export const endpointTestCaseState = {
    endpointTestStatement: '',
    endpointStatements: [],
    hasEndpoint: false,
};

let statementId = 0;

const createEndpoint = () => ({
    id: statementId++,
    type: 'endpoint',
    serverFileName: '',
    serverFilePath: '',
    method: '',
    route: '',
    serverResponse: '',
    expectedResponse: '',
    value: '',
});



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

        case actionTypes.ADD_ENDPOINT:
            endpointStatements.push(createEndpoint());
            return {
                ...state,
                endpointStatements,
            };
        case actionTypes.DELETE_ENDPOINT:
            endpointStatements = endpointStatements.filter(statement => statement.id !== action.id);
            return {
                ...state,
                endpointStatements,
            };
        case actionTypes.UPDATE_ENDPOINT:
            endpointStatements = endpointStatements.map(statement => {
                if (statement.id === action.id) {
                    statement.serverFileName = action.serverFileName;
                    statement.serverFilePath = action.serverFilePath;
                    statement.method = action.method;
                    statement.route = action.route;
                    statement.serverResponse = action.serverResponse;
                    statement.expectedResponse = action.expectedResponse;
                    statement.value = action.value;
                }
                return statement;
            });
            return {
                ...state,
                endpointStatements,
            };
        case actionTypes.UPDATE_SERVER_FILEPATH:
            endpointStatements = endpointStatements.map(statement => {
                if (statement.type === 'endpoint') {
                    statement.serverFileName = action.serverFileName;
                    statement.serverFilePath = action.serverFilePath;
                }
                return statement;
            });
            return {
                ...state,
                endpointStatements,
            };
        default:
            return state;
    }
} 