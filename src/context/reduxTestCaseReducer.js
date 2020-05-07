import { createContext } from 'react';
import { actionTypes } from './reduxTestCaseActions';
export const ReduxTestCaseContext = createContext(
  null
); /* here we create context for the redux test case. Dont provide it a default value (only used when you dont hve a provider for it), use null instead */
/* initial state for testCase */
export const reduxTestCaseState = {
  reduxTestStatement: '' /* the test description */,
  reduxStatements: [] /* both of the cards on the page at open. Each card gets an id */,
  hasRedux: 0,
};
let statementId = 0;
const createMiddleware = () => ({
  id: statementId++,
  type: 'middleware',
  middlewaresFileName: '',
  middlewaresFilePath: '',
  queryType: '',
  eventValue: null,
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  queryFunction: '',
});
const createActionCreator = () => ({
  id: statementId++,
  actionsFileName: '',
  filePath: '',
  typesFileName: '',
  typesFilePath: '',
  type: 'action-creator',
  actionCreatorFunc: '',
  actionType: '',
  payloadKey: null,
  payloadType: null,
});
const createAsync = () => ({
  id: statementId++,
  type: 'async',
  actionsFileName: '',
  filePath: '',
  typesFileName: '',
  typesFilePath: '',
  asyncFunction: '',
  method: '',
  route: '',
  requestBody: '',
  store: '',
  matcher: '',
  expectedResponse: '',
});
const createReducer = () => ({
  id: statementId++,
  type: 'reducer',
  typesFileName: '',
  typesFilePath: '',
  reducersFileName: '',
  reducersFilePath: '',
  reducerAction: '',
  initialState: '',
  reducerName: '',
  expectedState: '',
});
export const reduxTestCaseReducer = (state, action) => {
  let reduxStatements = [...state.reduxStatements];
  switch (action.type) {
    case actionTypes.TOGGLE_REDUX:
      return {
        ...state,
        hasRedux: !state.hasRedux,
      };
    case actionTypes.UPDATE_REDUX_TEST_STATEMENT:
      let reduxTestStatement = action.reduxTestStatement;
      return {
        ...state,
        reduxTestStatement,
      };
    case actionTypes.ADD_MIDDLEWARE:
      reduxStatements.push(
        createMiddleware()
      ); /* pushing the new middlewaew the user created into the statements array and then adding back the last render */
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.DELETE_MIDDLEWARE:
      reduxStatements = reduxStatements.filter(
        statement => statement.id !== action.id
      ); /* if statement id !== acion id, then what?? */
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_MIDDLEWARE:
      reduxStatements = reduxStatements.map(statement => {
        /* update statements if statement id === action id */
        if (statement.id === action.id) {
          statement.queryType = action.queryType;
          statement.eventValue = action.eventValue;
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.queryFunction = action.queryFunction;
          statement.suggestions = action.suggestions;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.ADD_ACTIONCREATOR:
      reduxStatements.push(createActionCreator());
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.DELETE_ACTIONCREATOR:
      reduxStatements = reduxStatements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_ACTIONCREATOR:
      reduxStatements = reduxStatements.map(statement => {
        if (statement.id === action.id) {
          statement.actionsFile = action.actionsFile;
          statement.filePath = action.filePath;
          statement.typesFileName = action.typesFileName;
          statement.typesFilePath = action.typesFilePath;
          statement.actionCreatorFunc = action.actionCreatorFunc;
          statement.payloadKey = action.payloadKey;
          statement.payloadType = action.payloadType;
          statement.actionType = action.actionType;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.ADD_ASYNC:
      reduxStatements.push(createAsync());
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.DELETE_ASYNC:
      reduxStatements = reduxStatements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_ASYNC:
      reduxStatements = reduxStatements.map(statement => {
        if (statement.id === action.id) {
          statement.actionsFile = action.actionsFile;
          statement.asyncFunction = action.asyncFunction;
          statement.typesFileName = action.typesFileName;
          statement.typesFilePath = action.typesFilePath;
          statement.method = action.method;
          statement.route = action.route;
          statement.requestBody = action.requestBody;
          statement.store = action.store;
          statement.matcher = action.matcher;
          statement.expectedResponse = action.expectedResponse;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.ADD_REDUCER:
      reduxStatements.push(createReducer());
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.DELETE_REDUCER:
      reduxStatements = reduxStatements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_REDUCER:
      reduxStatements = reduxStatements.map(statement => {
        if (statement.id === action.id) {
          statement.reducersFileName = action.reducersFileName;
          statement.reducersFilePath = action.reducersFilePath;
          statement.typesFileName = action.typesFileName;
          statement.typesFilePath = action.typesFilePath;
          statement.reducerAction = action.reducerAction;
          statement.initialState = action.initialState;
          statement.reducerName = action.reducerName;
          statement.expectedState = action.expectedState;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_ACTIONS_FILEPATH:
      reduxStatements = reduxStatements.map(statement => {
        if (statement.type === 'async' || statement.type === 'action-creator') {
          statement.actionsFileName = action.actionsFileName;
          statement.filePath = action.filePath;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_TYPES_FILEPATH:
      reduxStatements = reduxStatements.map(statement => {
        if (
          statement.type === 'async' ||
          statement.type === 'reducer' ||
          statement.type === 'action-creator'
        ) {
          statement.typesFileName = action.typesFileName;
          statement.typesFilePath = action.typesFilePath;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_REDUCERS_FILEPATH:
      reduxStatements = reduxStatements.map(statement => {
        if (statement.type === 'reducer') {
          statement.reducersFileName = action.reducersFileName;
          statement.reducersFilePath = action.reducersFilePath;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_MIDDLEWARES_FILEPATH:
      reduxStatements = reduxStatements.map(statement => {
        if (statement.type === 'middleware') {
          statement.middlewaresFileName = action.middlewaresFileName;
          statement.middlewaresFilePath = action.middlewaresFilePath;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.CREATE_NEW_REDUX_TEST /* renders the new test card */:
      return {
        reduxTestStatement: '',
        reduxStatements: [],
        hasRedux: 0,
      };
      case actionTypes.UPDATE_STATEMENTS_ORDER:
        reduxStatements = [...action.draggableStatements];
        return {
          ...state,
          reduxStatements,
        };
    default:
      return state;
  }
};