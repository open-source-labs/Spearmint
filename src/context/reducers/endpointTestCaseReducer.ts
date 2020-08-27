import { createContext } from 'react';
import { actionTypes } from '../actions/endpointTestCaseActions';
import { EndpointTestCaseState } from '../../utils/endpointTypes';

export const EndpointTestCaseContext: any = createContext(null);

const newEndpoint = {
  id: 0,
  type: 'endpoint',
  serverFileName: '',
  serverFilePath: '',
  method: '',
  route: '',
  expectedResponse: '',
  value: '',
};

export const endpointTestCaseState = {
  modalOpen: false,
  endpointTestStatement: '',
  endpointStatements: [
    {
      ...newEndpoint,
    },
  ],
};

export const endpointTestCaseReducer = (state: EndpointTestCaseState, action: any) => {
  Object.freeze(state);
  let endpointStatements = [...state.endpointStatements];

  switch (action.type) {
    case actionTypes.UPDATE_ENDPOINT_TEST_STATEMENT:
      const { endpointTestStatement } = action;
      return {
        ...state,
        endpointTestStatement,
      };
    case actionTypes.ADD_ENDPOINT:
      endpointStatements.push({
        ...newEndpoint,
        id: endpointStatements[endpointStatements.length - 1].id + 1,
      });
      return {
        ...state,
        endpointStatements,
        modalOpen: false,
      };
    case actionTypes.DELETE_ENDPOINT:
      endpointStatements = endpointStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.UPDATE_ENDPOINT:
      endpointStatements[action.id] = Object.assign({}, endpointStatements[action.id], action, {
        type: 'endpoint',
      });
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.UPDATE_SERVER_FILEPATH:
      endpointStatements = endpointStatements.map((statement) => {
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
    case actionTypes.CREATE_NEW_ENDPOINT_TEST:
      return {
        endpointTestStatement: '',
        endpointStatements: [
          {
            id: 0,
            type: 'endpoint',
            serverFileName: '',
            serverFilePath: '',
            method: '',
            route: '',
            expectedResponse: '',
            value: '',
          },
        ],
      };
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      endpointStatements = [...action.draggableStatements];
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.OPEN_INFO_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
    case actionTypes.CLOSE_INFO_MODAL:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};
