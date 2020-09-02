import { createContext } from 'react';
import { actionTypes } from '../actions/endpointTestCaseActions';
import {
  EndpointTestCaseState,
  Action,
  Endpoint,
  Assertion,
  Header,
} from '../../utils/endpointTypes';

export const EndpointTestCaseContext: any = createContext(null);

const newAssertion: Assertion = {
  id: 0,
  expectedResponse: '',
  value: '',
  matcher: '',
  not: false,
};

const newEndpoint: Endpoint = {
  id: 0,
  type: 'endpoint',
  testName: '',
  method: '',
  route: '',
  assertions: [
    {
      ...newAssertion,
    },
  ],
  headers: [],
  post: false,
  postData: '',
};

export const endpointTestCaseState: EndpointTestCaseState = {
  modalOpen: false,
  serverFilePath: '',
  serverFileName: '',
  dbFilePath: '',
  addDB: false,
  endpointStatements: [{ ...newEndpoint, headers: [], assertions: [{ ...newAssertion }] }],
};

const deepCopy = (endpointStatements: Endpoint[]) => {
  const fullCopy: Endpoint[] = endpointStatements.map((el) => {
    return { ...el, assertions: copyAssertions(el.assertions), headers: copyHeaders(el.headers) };
  });

  function copyAssertions(array: Assertion[]) {
    const copy: Assertion[] = array.map((el) => {
      return { ...el };
    });
    return copy;
  }

  function copyHeaders(array: Header[]) {
    const copy: Header[] = array.map((el) => {
      return { ...el };
    });
    return copy;
  }
  return fullCopy;
};

export const endpointTestCaseReducer = (state: EndpointTestCaseState, action: Action) => {
  Object.freeze(state);
  let endpointStatements = [...state.endpointStatements];

  switch (action.type) {
    case actionTypes.ADD_ENDPOINT:
      endpointStatements.push({
        ...newEndpoint,
        id: endpointStatements[endpointStatements.length - 1].id + 1,
        headers: [],
        assertions: [],
      });
      return {
        ...state,
        endpointStatements,
        // modalOpen: false,
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
        modalOpen: false,
        serverFilePath: '',
        serverFileName: '',
        endpointStatements: [{ ...newEndpoint, headers: [], assertions: [{ ...newAssertion }] }],
      };
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      endpointStatements = [...(action.draggableStatements as Endpoint[])];
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
        endpointStatements: deepCopy(endpointStatements),
      };
    case actionTypes.DELETE_HEADER:
      endpointStatements[action.index as number].headers.splice(action.id!, 1);
      return {
        ...state,
        endpointStatements: deepCopy(endpointStatements),
      };
    case actionTypes.TOGGLE_POST:
      endpointStatements[action.index as number].post = !endpointStatements[action.index as number]
        .post;
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.UPDATE_POST:
      endpointStatements[action.index as number].postData = action.text!;
      return {
        ...state,
        endpointStatements,
      };
    case actionTypes.ADD_ASSERTION:
      endpointStatements[action.index as number].assertions.push({
        id: endpointStatements[endpointStatements.length - 1].id + 1,
        expectedResponse: '',
        value: '',
        matcher: '',
        not: false,
      });
      return {
        ...state,
        endpointStatements: deepCopy(endpointStatements),
      };
    case actionTypes.DELETE_ASSERTION:
      endpointStatements[action.index as number].assertions.splice(action.id!, 1);
      return {
        ...state,
        endpointStatements: deepCopy(endpointStatements),
      };
    case actionTypes.UPDATE_ASSERTION:
      endpointStatements[action.index as number].assertions[
        action.id as number
      ] = action.assertion!;
      return {
        ...state,
        endpointStatements: deepCopy(endpointStatements),
      };
    case actionTypes.TOGGLE_DB:
      return {
        ...state,
        addDB: action.db,
      };
    case actionTypes.UPDATE_DB_FILEPATH:
      return {
        ...state,
        dbFilePath: action.dbFilePath,
      };
    default:
      return state;
  }
};
