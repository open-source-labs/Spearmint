import { createContext } from 'react';
import { actionTypes } from '../actions/denoTestCaseActions';
import {
  DenoTestCaseState,
  Action,
  DenoObj,
  Assertion,
  Header,
} from '../../utils/denoTypes';

export const DenoTestCaseContext: any = createContext([]);

const newAssertion: Assertion = {
  id: 0,
  expectedResponse: '',
  value: '',
  matcher: '',
  not: false,
};

const newEndpoint: DenoObj = {
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

export const denoTestCaseState: DenoTestCaseState = {
  modalOpen: false,
  serverFilePath: '',
  serverFileName: '',
  dbFilePath: '',
  dbFileName: '',
  addDB: false,
  denoStatements: [{ ...newEndpoint, headers: [], assertions: [{ ...newAssertion }] }],
};

const deepCopy = (denoStatements: DenoObj[]) => {
  const fullCopy: DenoObj[] = denoStatements.map((el) => {
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

export const denoTestCaseReducer = (state: DenoTestCaseState, action: Action) => {
  Object.freeze(state);
  let denoStatements: Array<any> = [...state.denoStatements];

  switch (action.type) {
    case actionTypes.RESET_TESTS: {
      return {...denoTestCaseState, 
              denoStatements: [{...newEndpoint, headers:[], assertions: [{...newAssertion}]}]}
    };
    case actionTypes.ADD_ENDPOINT:
      if (denoStatements.length === 0) {
        return {
          ...state,
          id: 0,
          denoStatements: [{ ...newEndpoint, headers: [], assertions: [{ ...newAssertion }] }],
        };
      }
      denoStatements.push({
        ...newEndpoint,
        id: denoStatements[denoStatements.length - 1].id + 1,
        headers: [],
        assertions: [],
      });
      return {
        ...state,
        denoStatements,
        // modalOpen: false,
      };
    case actionTypes.DELETE_ENDPOINT:
      denoStatements = denoStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        denoStatements,
      };
    case actionTypes.UPDATE_ENDPOINT:
      let newStatement = denoStatements.find((statement) => {
        return statement.id === action.id!;
      });
      Object.assign(newStatement, action, {
        type: 'endpoint',
      });
      return {
        ...state,
        denoStatements,
      };
    case actionTypes.UPDATE_SERVER_FILEPATH:
      const { serverFilePath, serverFileName }  = action;
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
        denoStatements: [{ ...newEndpoint, headers: [], assertions: [{ ...newAssertion }] }],
      };
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      denoStatements = [...(action.draggableStatements as DenoObj[])];
      return {
        ...state,
        denoStatements,
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
      let headerStore = denoStatements[action.index as number].headers;
      const id = headerStore.length ? headerStore[headerStore.length - 1].id + 1 : 0;
      headerStore.push({
        id,
        headerName: '',
        headerValue: '',
      });
      return {
        ...state,
        denoStatements: deepCopy(denoStatements),
      };
    case actionTypes.DELETE_HEADER:
      denoStatements[action.index as number].headers.splice(action.id!, 1);
      return {
        ...state,
        denoStatements: deepCopy(denoStatements),
      };
    case actionTypes.TOGGLE_POST:
      denoStatements[action.index as number].post = !denoStatements[action.index as number]
        .post;
      return {
        ...state,
        denoStatements,
      };
    case actionTypes.UPDATE_POST:
      denoStatements[action.index as number].postData = action.text!;
      return {
        ...state,
        denoStatements,
      };
    case actionTypes.ADD_ASSERTION:
      denoStatements[action.index as number].assertions.push({
        id: denoStatements[denoStatements.length - 1].id + 1,
        expectedResponse: '',
        value: '',
        matcher: '',
        not: false,
      });
      return {
        ...state,
        denoStatements: deepCopy(denoStatements),
      };
    case actionTypes.DELETE_ASSERTION:
      denoStatements[action.index as number].assertions.splice(action.id!, 1);
      return {
        ...state,
        denoStatements: deepCopy(denoStatements),
      };
    case actionTypes.UPDATE_ASSERTION:
      denoStatements[action.index as number].assertions[
        action.id as number
      ] = action.assertion!;
      return {
        ...state,
        denoStatements: deepCopy(denoStatements),
      };
    case actionTypes.TOGGLE_DB:
      return {
        ...state,
        addDB: action.db,
      };
    case actionTypes.UPDATE_DB_FILEPATH:
      const { dbFilePath, dbFileName } = action;
      return {
        ...state,
        dbFilePath,
        dbFileName
      };
    case actionTypes.REPLACE_TEST: {
      const { testState } = action;
      return testState;
    }
    default:
      return state;
  }
};
