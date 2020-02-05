import { createContext } from 'react';
import { actionTypes } from './testCaseActionTypes';

export const TestCaseContext = createContext(null);

export const testCaseState = {
  testStatement: '',
  statements: [
    {
      id: 0,
      type: 'render',
      componentName: '',
      filePath: '',
      props: [],
      hasProp: false,
    },
    {
      id: 1,
      type: 'assertion',
      queryVariant: '',
      querySelector: '',
      queryValue: '',
      isNot: false,
      matcherType: '',
      matcherValue: '',
      suggestions: [],
    },
  ],
};

let statementId = 2;
let renderPropsId = 0;

const createAction = () => ({
  id: statementId++,
  type: 'action',
  eventType: '',
  eventValue: null,
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  suggestions: [],
});

const createAssertion = () => ({
  id: statementId++,
  type: 'assertion',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  isNot: false,
  matcherType: '',
  matcherValue: '',
  suggestions: [],
});

const createRerender = (componentName, filePath) => ({
  id: statementId++,
  type: 'render',
  componentName,
  filePath,
  props: [],
});

const createRenderProp = () => ({
  id: renderPropsId++,
  propKey: '',
  propValue: '',
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
  store: '',
  matcher: '',
  expectedResponse: '',
});

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

const createReducer = () => ({
  id: statementId++,
  type: 'reducer',
  typesFileName: '',
  typesFilePath: '',
  reducersFileName: '',
  reducersFilePath: '',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  matcherValue: '',
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

const createHookRender = () => ({
  id: statementId++,
  type: 'hookRender',
  hookFileName: '',
  hookFilePath: '',
  hook: '',
  parameterOne: '',
  parameterTwo: '',
  returnValue: '',
});

const createHookUpdates = () => ({
  id: statementId++,
  hookFileName: '',
  hookFilePath: '',
  type: 'hook-updates',
  hook: '',
  callbackFunc: '',
  managedState: '',
  updatedState: '',
});

export const testCaseReducer = (state, action) => {
  Object.freeze(state);
  let statements = [...state.statements];
  let lastAssertionStatement;

  switch (action.type) {
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      const firstRenderStatement = statements[0];
      lastAssertionStatement = statements[statements.length - 1];
      statements = [firstRenderStatement, ...action.draggableStatements, lastAssertionStatement];
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_TEST_STATEMENT:
      let testStatement = action.testStatement;
      return {
        ...state,
        testStatement,
      };
    case actionTypes.ADD_ACTION:
      lastAssertionStatement = statements.pop();
      statements.push(createAction(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ACTION:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ACTION:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.eventType = action.eventType;
          statement.eventValue = action.eventValue;
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.suggestions = action.suggestions;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_ASSERTION:
      lastAssertionStatement = statements.pop();
      statements.push(createAssertion(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ASSERTION:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ASSERTION:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.isNot = action.isNot;
          statement.matcherType = action.matcherType;
          statement.matcherValue = action.matcherValue;
          statement.suggestions = action.suggestions;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_RENDER:
      lastAssertionStatement = statements.pop();
      const renderComponentName = state.statements[0].componentName;
      const renderFilePath = state.statements[0].filePath;
      statements.push(createRerender(renderComponentName, renderFilePath), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_RENDER:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
        lastAssertionStatement,
      };
    case actionTypes.UPDATE_RENDER_COMPONENT:
      statements = statements.map(statement => {
        if (statement.type === 'render') {
          statement.componentName = action.componentName;
          statement.filePath = action.filePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
          statement.props.push(createRenderProp());
        }
        return statement;
      });
      return {
        ...state,
        statements,
        hasProp: !statements[0].hasProp,
      };
    case actionTypes.DELETE_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
          statement.props = statement.props.filter(prop => prop.id !== action.propId);
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
          statement.props.map(prop => {
            if (prop.id === action.propId) {
              prop.propKey = action.propKey;
              prop.propValue = action.propValue;
            }
            return prop;
          });
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.ADD_MIDDLEWARE:
      lastAssertionStatement = statements.pop();
      statements.push(createMiddleware(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_MIDDLEWARE:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_MIDDLEWARE:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.middlewaresFileName = action.middlewaresFileName;
          statement.middlewaresFilePath = action.middlewaresFilePath;
          statement.queryType = action.queryType;
          statement.eventValue = action.eventValue;
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.queryFunction = action.queryFunction;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_REDUCER:
      lastAssertionStatement = statements.pop();
      statements.push(createReducer(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_REDUCER:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_REDUCER:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.reducersFileName = action.reducersFileName;
          statement.reducersFilePath = action.reducersFilePath;
          statement.typesFileName = action.typesFileName;
          statement.typesFilePath = action.typesFilePath;
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.matcherValue = action.matcherValue;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.ADD_ASYNC:
      lastAssertionStatement = statements.pop();
      statements.push(createAsync(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ASYNC:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ASYNC:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.actionsFile = action.actionsFile;
          statement.asyncFunction = action.asyncFunction;
          statement.typesFileName = action.typesFileName;
          statement.typesFilePath = action.typesFilePath;
          statement.method = action.method;
          statement.route = action.route;
          statement.store = action.store;
          statement.matcher = action.matcher;
          statement.expectedResponse = action.expectedResponse;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.ADD_ACTIONCREATOR:
      lastAssertionStatement = statements.pop();
      statements.push(createActionCreator(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.DELETE_ACTIONCREATOR:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_ACTIONCREATOR:
      statements = statements.map(statement => {
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
        statements,
      };

    case actionTypes.UPDATE_ACTIONS_FILEPATH:
      statements = statements.map(statement => {
        if (statement.type === 'async' || statement.type === 'action-creator') {
          statement.actionsFileName = action.actionsFileName;
          statement.filePath = action.filePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_TYPES_FILEPATH:
      statements = statements.map(statement => {
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
        statements,
      };

    case actionTypes.UPDATE_REDUCERS_FILEPATH:
      statements = statements.map(statement => {
        if (statement.type === 'reducer') {
          statement.reducersFileName = action.reducersFileName;
          statement.reducersFilePath = action.reducersFilePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_MIDDLEWARES_FILEPATH:
      statements = statements.map(statement => {
        if (statement.type === 'middleware') {
          statement.middlewaresFileName = action.middlewaresFileName;
          statement.middlewaresFilePath = action.middlewaresFilePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.ADD_HOOK_UPDATES:
      lastAssertionStatement = statements.pop();
      statements.push(createHookUpdates(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.DELETE_HOOK_UPDATES:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_HOOK_UPDATES:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.hook = action.hook;
          statement.hookFileName = action.hookFileName;
          statement.hookFilePath = action.hookFilePath;
          statement.callbackFunc = action.callbackFunc;
          statement.managedState = action.managedState;
          statement.updatedState = action.updatedState;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.ADD_HOOKRENDER:
      lastAssertionStatement = statements.pop();
      statements.push(createHookRender(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.DELETE_HOOKRENDER:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_HOOKRENDER:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.hook = action.hook;
          statement.parameterOne = action.parameterOne;
          statement.expectedReturnValue = action.expectedReturnValue;
          statement.returnValue = action.returnValue;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.UPDATE_HOOKS_FILEPATH:
      statements = statements.map(statement => {
        if (statement.type === 'hook-updates' || statement.type === 'hookRender') {
          statement.hookFileName = action.hookFileName;
          statement.hookFilePath = action.hookFilePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };

    case actionTypes.CREATE_NEW_TEST:
      return {
        testStatement: '',
        statements: [
          {
            id: 0,
            type: 'render',
            componentName: '',
            filePath: '',
            props: [],
            hasProp: false,
          },
          {
            id: 1,
            type: 'assertion',
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            isNot: false,
            matcherType: '',
            matcherValue: '',
            suggestions: [],
          },
        ],
      };
    default:
      return state;
  }
};
