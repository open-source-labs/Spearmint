import { GraphQLStatements, Assertion } from '../../utils/graphQLTypes';

export const actionTypes = {
  UPDATE_GRAPHQL_STATEMENTS_ORDER: 'UPDATE_GRAPHQL_STATEMENTS_ORDER',
  TOGGLE_GRAPHQL: 'TOGGLE_GRAPHQL',
  CREATE_NEW_GRAPHQL_TEST: 'CREATE_NEW_GRAPHQL_TEST',
  UPDATE_SERVER_FILEPATH: 'UPDATE_SERVER_FILEPATH',
  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  ADD_GRAPHQL: 'ADD_GRAPHQL',
  DELETE_GRAPHQL: 'DELETE_GRAPHQL',
  UPDATE_GRAPHQL: 'UPDATE_GRAPHQL',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
  ADD_HEADER: 'ADD_HEADER',
  DELETE_HEADER: 'DELETE_HEADER',
  TOGGLE_POST: 'TOGGLE_POST',
  UPDATE_POST: 'UPDATE_POST',
  ADD_ASSERTION: 'ADD_ASSERTION',
  DELETE_ASSERTION: 'DELETE_ASSERTION',
  UPDATE_ASSERTION: 'UPDATE_ASSERTION',
  TOGGLE_DB: 'TOGGLE_DB',
  UPDATE_DB_FILEPATH: 'UPDATE_DB_FILEPATH',
  REPLACE_TEST: 'REPLACE_TEST',
  RESET_TESTS: 'RESET_TESTS',
};

// Never used
export const updateGraphQLStatementsOrder = (draggableStatements: string) => ({
  type: actionTypes.UPDATE_GRAPHQL_STATEMENTS_ORDER,
  draggableStatements,
});

export const toggleGraphQL = () => ({
  type: actionTypes.TOGGLE_GRAPHQL,
});

export const createNewGraphQLTest = () => ({
  type: actionTypes.CREATE_NEW_GRAPHQL_TEST,
});

export const updateServerFilePath = (serverFileName: string, serverFilePath: string) => ({
  type: actionTypes.UPDATE_SERVER_FILEPATH,
  serverFileName,
  serverFilePath,
});

export const addGraphQL = () => ({
  type: actionTypes.ADD_GRAPHQL,
});

export const deleteGraphQL = (id: number) => ({
  type: actionTypes.DELETE_GRAPHQL,
  id,
});

export const updateGraphQL = (graphQL: object) => ({
  ...graphQL,
  type: actionTypes.UPDATE_GRAPHQL,
});

export const updateStatementsOrder = (draggableStatements: Array<GraphQLStatements>) => {
  return {
    type: actionTypes.UPDATE_STATEMENTS_ORDER,
    draggableStatements,
  };
};

export const openInfoModal = () => {
  return { type: actionTypes.OPEN_INFO_MODAL };
};

export const closeInfoModal = () => {
  return { type: actionTypes.CLOSE_INFO_MODAL };
};

export const addHeader = (index: number) => {
  return {
    type: actionTypes.ADD_HEADER,
    index,
  };
};

export const deleteHeader = (index: number, id: number) => {
  return {
    type: actionTypes.DELETE_HEADER,
    index,
    id,
  };
};

export const togglePost = (index: number) => {
  return {
    type: actionTypes.TOGGLE_POST,
    index,
  };
};

export const updatePost = (text: string, index: number) => {
  return {
    type: actionTypes.UPDATE_POST,
    text,
    index,
  };
};

export const addAssertion = (index: number) => {
  return {
    type: actionTypes.ADD_ASSERTION,
    index,
  };
};

export const deleteAssertion = (index: number, id: number) => {
  return {
    type: actionTypes.DELETE_ASSERTION,
    index,
    id,
  };
};

export const updateAssertion = (index: number, id: number, newAssertion: Assertion) => {
  return {
    type: actionTypes.UPDATE_ASSERTION,
    index,
    id,
    assertion: newAssertion,
  };
};

export const toggleDB = (dbProperty: string | boolean) => {
  return {
    type: actionTypes.TOGGLE_DB,
    db: dbProperty,
  };
};

export const updateDBFilePath = (dbFilePath: string, dbFileName: string) => {
  return {
    type: actionTypes.UPDATE_DB_FILEPATH,
    dbFilePath,
    dbFileName
  };
};

export const graphQLReplaceTest = (testState: object) => ({
  type: actionTypes.REPLACE_TEST,
  testState,
});

export const resetTests = () => ({
  type: actionTypes.RESET_TESTS
})
