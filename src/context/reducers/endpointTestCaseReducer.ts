import { createContext } from 'react';
import { actionTypes } from '../actions/endpointTestCaseActions';
import { EndpointTestCaseState } from '../../utils/endpointTypes';
import { EndpointStatements } from '../../utils/endpointTypes';

export const EndpointTestCaseContext: any = createContext(null);

interface Action {
  type: string;
  id?: number;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<EndpointStatements>;
}

const newEndpoint = {
  id: 0,
  type: 'endpoint',
  testName: '',
  method: '',
  route: '',
  expectedResponse: '',
  value: '',
  headers: {},
  headerValues: {},
};

export const endpointTestCaseState = {
  modalOpen: false,
  serverFilePath: '',
  serverFileName: '',
  endpointStatements: [
    {
      ...newEndpoint,
    },
  ],
};

export const endpointTestCaseReducer = (state: EndpointTestCaseState, action: Action) => {
  Object.freeze(state);
  let endpointStatements = [...state.endpointStatements];

  switch (action.type) {
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
      let newStatement = endpointStatements.find((statement) => {
        return statement.id === action.id!;
      });
      Object.assign(newStatement, action, {
        type: 'endpoint',
      });
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.UPDATE_SERVER_FILEPATH:
      const { serverFilePath, serverFileName } = action;
      return {
        ...state,
        serverFilePath,
        serverFileName,
      };
    case actionTypes.CREATE_NEW_ENDPOINT_TEST:
      return {
        endpointTestStatement: '',
        endpointStatements: [{ ...newEndpoint }],
      };
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      endpointStatements = [...action.draggableStatements!];
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
