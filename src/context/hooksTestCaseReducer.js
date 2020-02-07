import { createContext } from 'react';
import { actionTypes } from './hooksTestCaseActions';

export const HooksTestCaseContext = createContext(null);

export const hooksTestCaseState = {
  hooksTestStatement: '',
  hooksStatements: [],
  hasHooks: false,
};

let statementId = 0;

const createContexts = () => ({
  id: statementId++,
  type: 'context',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  values: '',
  textNode: '',
  providerComponent: '',
  consumerComponent: '',
  context: '',
  contextFileName: '',
  contextFilePath: '',
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

export const hooksTestCaseReducer = (state, action) => {
  Object.freeze(state);
  let hooksStatements = [...state.hooksStatements];

  switch (action.type) {
    case actionTypes.TOGGLE_HOOKS:
      let newTestStatement;
      if (!state.hasHooks) {
        newTestStatement = action.testStatement;
      }
      return {
        ...state,
        newTestStatement,
        hasHooks: !state.hasHooks,
      };
    case actionTypes.UPDATE_HOOKS_TEST_STATEMENT:
      let hooksTestStatement = action.hooksTestStatement;
      return {
        ...state,
        hooksTestStatement,
      };
    case actionTypes.ADD_CONTEXT:
      hooksStatements.push(createContexts());
      return {
        ...state,
        hooksStatements,
      };
    case actionTypes.DELETE_CONTEXT:
      hooksStatements = hooksStatements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };
    case actionTypes.UPDATE_CONTEXT:
      hooksStatements = hooksStatements.map(statement => {
        if (statement.id === action.id) {
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.values = action.values;
          statement.textNode = action.textNodes;
          statement.providerComponent = action.providerComponent;
          statement.consumerComponent = action.consumerComponent;
          statement.context = action.context;
        }
        return statement;
      });
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.ADD_HOOK_UPDATES:
      hooksStatements.push(createHookUpdates());
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.DELETE_HOOK_UPDATES:
      hooksStatements = hooksStatements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.UPDATE_HOOK_UPDATES:
      hooksStatements = hooksStatements.map(statement => {
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
        hooksStatements,
      };

    case actionTypes.ADD_HOOKRENDER:
      hooksStatements.push(createHookRender());
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.DELETE_HOOKRENDER:
      hooksStatements = hooksStatements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.UPDATE_HOOKRENDER:
      hooksStatements = hooksStatements.map(statement => {
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
        hooksStatements,
      };

    case actionTypes.UPDATE_HOOKS_FILEPATH:
      hooksStatements = hooksStatements.map(statement => {
        if (statement.type === 'hook-updates' || statement.type === 'hookRender') {
          statement.hookFileName = action.hookFileName;
          statement.hookFilePath = action.hookFilePath;
        }
        return statement;
      });
      return {
        ...state,
        hooksStatements,
      };
    case actionTypes.UPDATE_CONTEXT_FILEPATH:
      hooksStatements = hooksStatements.map(statement => {
        if (statement.type === 'context') {
          statement.contextFileName = action.contextFileName;
          statement.contextFilePath = action.contextFilePath;
        }
        return statement;
      });
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.CREATE_NEW_HOOKS_TEST:
      return {
        hooksTestStatement: '',
        hooksStatements: [],
      };
    default:
      return state;
  }
};
