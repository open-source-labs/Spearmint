import { createContext } from 'react';
import { actionTypes } from '../actions/graphQLTestCaseActions';
import {
  GraphQLTestCaseState,
  Action,
  GraphQLObj,
  Assertion,
  Header,
} from '../../utils/graphQLTypes';

const newAssertion: Assertion = {
  id: 0,
  expectedResponse: '',
  value: '',
  matcher: '',
  not: false,
};

const newGraphQL: GraphQLObj = {
  id: 0,
  type: 'graphQL',
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

export const graphQLTestCaseState: GraphQLTestCaseState = {
  modalOpen: false,
  serverFilePath: '',
  serverFileName: '',
  dbFilePath: '',
  dbFileName: '',
  addDB: false,
  graphQLStatements: [{ ...newGraphQL, headers: [], assertions: [{ ...newAssertion }] }],
};

const deepCopy = (graphQLStatements: GraphQLObj[]) => {
  const fullCopy: GraphQLObj[] = graphQLStatements.map((el) => {
    return { ...el, assertions: copyAssertions(el.assertions), headers: copyHeaders(el.headers) }
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

export const graphQLTestCaseReducer = (state: GraphQLTestCaseState, action: Action) => {
  Object.freeze(state);
  let graphQLStatements: Array<any> = [...state.graphQLStatements];

  switch (action.type) {
    case actionTypes.RESET_TESTS: {
      return {
        ...graphQLTestCaseState, 
        graphQLStatements: [{ ...newGraphQL, headers: [], assertions: [{ ...newAssertion }] }]}
      };
    case actionTypes.ADD_GRAPHQL:
      if (graphQLStatements.length === 0) {
        return {
          ...state,
          id: 0,
          graphQLStatements: [{ ...newGraphQL, headers: [], assertions: [{ ...newAssertion }] }],
        };
      }
      graphQLStatements.push({
        ...newGraphQL,
        id: graphQLStatements[graphQLStatements.length - 1].id + 1,
        headers: [],
        assertions: [],
      });
      return {
        ...state,
        graphQLStatements,
        // modalOpen: false,
      };
    case actionTypes.DELETE_GRAPHQL:
      graphQLStatements = graphQLStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        graphQLStatements,
      };
    case actionTypes.UPDATE_GRAPHQL:
      let newStatement = graphQLStatements.find((statement) => {
        return statement.id === action.id!;
      });
      Object.assign(newStatement, action, {
        type: 'graphQL',
      });
      return {
        ...state,
        graphQLStatements,
      };
    case actionTypes.UPDATE_SERVER_FILEPATH:
      const { serverFilePath, serverFileName }  = action;
      return {
        ...state,
        serverFilePath,
        serverFileName,
      };
    case actionTypes.CREATE_NEW_GRAPHQL_TEST:
      return {
        modalOpen: false,
        serverFilePath: '',
        serverFileName: '',
        graphQLStatements: [{ ...newGraphQL, headers: [], assertions: [{ ...newAssertion }] }],
      };
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      graphQLStatements = [...(action.draggableStatements as GraphQLObj[])];
      return {
        ...state,
        graphQLStatements,
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
      let headerStore = graphQLStatements[action.index as number].headers;
      const id = headerStore.length ? headerStore[headerStore.length - 1].id + 1 : 0;
      headerStore.push({
        id,
        headerName: '',
        headerValue: '',
      });
      return {
        ...state,
        graphQLStatements: deepCopy(graphQLStatements),
      };
    case actionTypes.DELETE_HEADER:
      graphQLStatements[action.index as number].headers.splice(action.id!, 1);
      return {
        ...state,
        graphQLStatements: deepCopy(graphQLStatements),
      };
    case actionTypes.TOGGLE_POST:
      graphQLStatements[action.index as number].post = !graphQLStatements[action.index as number]
        .post;
      return {
        ...state,
        graphQLStatements,
      };
    case actionTypes.UPDATE_POST:
      graphQLStatements[action.index as number].postData = action.text!;
      return {
        ...state,
        graphQLStatements,
      };
    case actionTypes.ADD_ASSERTION:
      graphQLStatements[action.index as number].assertions.push({
        id: graphQLStatements[graphQLStatements.length - 1].id + 1,
        expectedResponse: '',
        value: '',
        matcher: '',
        not: false,
      });
      return {
        ...state,
        graphQLStatements: deepCopy(graphQLStatements),
      };
    case actionTypes.DELETE_ASSERTION:
      graphQLStatements[action.index as number].assertions.splice(action.id!, 1);
      return {
        ...state,
        graphQLStatements: deepCopy(graphQLStatements),
      };
    case actionTypes.UPDATE_ASSERTION:
      graphQLStatements[action.index as number].assertions[
        action.id as number
      ] = action.assertion!;
      return {
        ...state,
        graphQLStatements: deepCopy(graphQLStatements),
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

const dispatchToGraphQLTestCase = () => null;
const graphQLTestCaseArr: [GraphQLTestCaseState, (action: Action) => void] = [graphQLTestCaseState, dispatchToGraphQLTestCase]
export const GraphQLTestCaseContext = createContext(graphQLTestCaseArr);