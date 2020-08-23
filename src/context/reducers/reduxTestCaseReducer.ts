import { createContext } from 'react';
import { actionTypes, ReduxTestCaseState } from '../../utils/reduxTypes';

export const ReduxTestCaseContext: any = createContext(null);

/* here we create context for the redux test case. Dont provide it a default value (only used when you dont hve a provider for it), use null instead */
/* initial state for testCase */
export const reduxTestCaseState: ReduxTestCaseState = {
  reduxTestStatement: '' /* the test description */,
  reduxStatements: [] /* both of the cards on the page at open. Each card gets an id */,
};

let statementId = 0;

const createMiddleware = () => {
  statementId += 1;
  return {
    id: statementId,
    type: 'middleware',
    middlewaresFileName: '',
    middlewaresFilePath: '',
    queryType: '',
    eventValue: null,
    queryVariant: '',
    querySelector: '',
    queryValue: '',
    queryFunction: '',
  };
};
const createActionCreator = () => {
  statementId += 1;
  return {
    id: statementId,
    actionsFileName: '',
    filePath: '',
    typesFileName: '',
    typesFilePath: '',
    type: 'action-creator',
    actionCreatorFunc: '',
    actionType: '',
    payloadKey: null,
    payloadType: null,
  };
};
const createAsync = () => {
  statementId += 1;
  return {
    id: statementId,
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
  };
};
const createReducer = () => {
  statementId += 1;
  return {
    id: statementId,
    type: 'reducer',
    typesFileName: '',
    typesFilePath: '',
    reducersFileName: '',
    reducersFilePath: '',
    reducerAction: '',
    initialState: '',
    reducerName: '',
    expectedState: '',
  };
};
export const reduxTestCaseReducer = (state = reduxTestCaseState, action: any) => {
  let reduxStatements = [...state.reduxStatements];
  let reduxTestStatement;
  switch (action.type) {
    case actionTypes.UPDATE_REDUX_TEST_STATEMENT:
      reduxTestStatement = action.payload;
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
        (statement) => statement.id !== action.payload
      ); /* if statement id !== acion id, then what?? */
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_MIDDLEWARE:
      reduxStatements = reduxStatements.map((statement) => {
        /* update statements if statement id === action id */
        if (statement.id === action.payload.id) {
          statement.queryType = action.payload.queryType;
          statement.eventValue = action.payload.eventValue;
          statement.queryVariant = action.payload.queryVariant;
          statement.querySelector = action.payload.querySelector;
          statement.queryValue = action.payload.queryValue;
          statement.queryFunction = action.payload.queryFunction;
          statement.suggestions = action.payload.suggestions;
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
      reduxStatements = reduxStatements.filter((statement) => statement.id !== action.payload);
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_ACTIONCREATOR:
      reduxStatements = reduxStatements.map((statement) => {
        if (statement.id === action.payload.id) {
          statement.actionsFile = action.payload.actionsFile;
          statement.filePath = action.payload.filePath;
          statement.typesFileName = action.payload.typesFileName;
          statement.typesFilePath = action.payload.typesFilePath;
          statement.actionCreatorFunc = action.payload.actionCreatorFunc;
          statement.payloadKey = action.payload.payloadKey;
          statement.payloadType = action.payload.payloadType;
          statement.actionType = action.payload.actionType;
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
      reduxStatements = reduxStatements.filter((statement) => statement.id !== action.payload);
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_ASYNC:
      reduxStatements = reduxStatements.map((statement) => {
        if (statement.id === action.payload.id) {
          statement.actionsFile = action.payload.actionsFile;
          statement.asyncFunction = action.payload.asyncFunction;
          statement.typesFileName = action.payload.typesFileName;
          statement.typesFilePath = action.payload.typesFilePath;
          statement.method = action.payload.method;
          statement.route = action.payload.route;
          statement.requestBody = action.payload.requestBody;
          statement.store = action.payload.store;
          statement.matcher = action.payload.matcher;
          statement.expectedResponse = action.payload.expectedResponse;
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
      reduxStatements = reduxStatements.filter((statement) => statement.id !== action.payload);
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_REDUCER:
      reduxStatements = reduxStatements.map((statement) => {
        if (statement.id === action.payload.id) {
          statement.reducersFileName = action.payload.reducersFileName;
          statement.reducersFilePath = action.payload.reducersFilePath;
          statement.typesFileName = action.payload.typesFileName;
          statement.typesFilePath = action.payload.typesFilePath;
          statement.reducerAction = action.payload.reducerAction;
          statement.initialState = action.payload.initialState;
          statement.reducerName = action.payload.reducerName;
          statement.expectedState = action.payload.expectedState;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_ACTIONS_FILEPATH:
      reduxStatements = reduxStatements.map((statement) => {
        // if (statement.id === action.payload.id) {
        if (action.payload.type === statement.type) {
          statement.actionsFileName = action.payload.actionsFileName;
          statement.filePath = action.payload.filePath;
          // }
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_TYPES_FILEPATH:
      reduxStatements = reduxStatements.map((statement) => {
        // if (statement.id === action.payload.id) {
        if (action.payload.type === statement.type) {
          statement.typesFileName = action.payload.typesFileName;
          statement.typesFilePath = action.payload.typesFilePath;
        }
        // }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_REDUCERS_FILEPATH:
      reduxStatements = reduxStatements.map((statement) => {
        if (statement.type === 'reducer') {
          statement.reducersFileName = action.payload.reducersFileName;
          statement.reducersFilePath = action.payload.reducersFilePath;
        }
        return statement;
      });
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.UPDATE_MIDDLEWARES_FILEPATH:
      reduxStatements = reduxStatements.map((statement) => {
        if (statement.type === 'middleware') {
          statement.middlewaresFileName = action.payload.middlewaresFileName;
          statement.middlewaresFilePath = action.payload.middlewaresFilePath;
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
      };
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      reduxStatements = action.payload;
      return {
        ...state,
        reduxStatements,
      };
    case actionTypes.OPEN_INFO_MODAL:
      console.log('in here');
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
