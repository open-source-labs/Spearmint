import { createContext } from 'react';
import { actionTypes } from '../actions/endpointTestCaseActions';
import { EndpointTestCaseState } from '../../utils/endpointTypes';
import { EndpointStatements } from '../../utils/endpointTypes';
import EndpointTestStatements from '../../components/TestCase/EndpointTestStatements';

export const EndpointTestCaseContext: any = createContext(null);

interface Action {
  type: string;
  id?: number;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<EndpointStatements>;
  index?: number;
  text?: string;
}

const newEndpoint = {
  id: 0,
  type: 'endpoint',
  testName: '',
  method: '',
  route: '',
  expectedResponse: '',
  value: '',
  headers: [],
  post: false,
  postData: '',
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
        ...endpointTestCaseState,
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
    case actionTypes.ADD_HEADER:
      let headerStore = endpointStatements[action.index as number].headers;
      const id = headerStore.length ? headerStore[headerStore.length - 1].id + 1 : 0;
      headerStore.push({
        id,
        headerName: '',
        headerValue: '',
      });
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.DELETE_HEADER:
      let headers = endpointStatements[action.index as number].headers;

      headers.splice(action.id, 1);
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.TOGGLE_POST:
      endpointStatements[action.index as number].post = !endpointStatements[action.index as number]
        .post;
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.UPDATE_POST:
      endpointStatements[action.index as number].postData = action.text;
      return {
        ...state,
        endpointStatements,
      };
    default:
      return state;
  }
};
