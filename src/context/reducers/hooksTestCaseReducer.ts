import { createContext } from 'react';
import { actionTypes } from '../actions/hooksTestCaseActions';

export const HooksTestCaseContext = createContext(null);

interface hooksTestCaseState {
  hooksTestStatement: string;
  hooksStatements: Array<hooksStatements>;
  hasHooks: number;
  statementId: number;
}

// hookStatments must have id and type properties
interface hooksStatements {
  id: number;
  type: string;
  [key: string]: any
}

export const hooksTestCaseState = {
  hooksTestStatement: '',
  hooksStatements: [],
  hasHooks: 0,
  statementId: 0,
};

const createContexts = (statementId: number) => ({
  id: statementId,
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

const createHookRender = (statementId: number) => ({
  id: statementId,
  type: 'hookRender',
  hookFileName: '',
  hookFilePath: '',
  hook: '',
  parameterOne: '',
  parameterTwo: '',
  returnValue: '',
});

const createHookUpdates = (statementId: number) => ({
  id: statementId,
  hookFileName: '',
  hookFilePath: '',
  type: 'hook-updates',
  hook: '',
  callbackFunc: '',
  managedState: '',
  updatedState: '',
});

export const hooksTestCaseReducer = (state: hooksTestCaseState, action: any) => {
  Object.freeze(state);
  let hooksStatements = [...state.hooksStatements];

  switch (action.type) {
    case actionTypes.TOGGLE_HOOKS: {
      let newTestStatement;
      if (!state.hasHooks) {
        newTestStatement = action.testStatement;
      }
      return {
        ...state,
        newTestStatement,
        hasHooks: state.hasHooks + 1,
      };
    }
    case actionTypes.UPDATE_HOOKS_TEST_STATEMENT: {
      return {
        ...state,
        hooksTestStatement: action.hooksTestStatement,
      };
    }
    case actionTypes.ADD_CONTEXT:
      hooksStatements.push(createContexts(state.statementId + 1));
      return {
        ...state,
        hooksStatements,
        statementId: state.statementId + 1,
      };
    case actionTypes.DELETE_CONTEXT:
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.UPDATE_CONTEXT:
      hooksStatements = hooksStatements.map((statement) => {
        if (statement.id === action.id) {
          return {
            ...statement,
            queryVariant: action.queryVariant,
            querySelector: action.querySelector,
            queryValue: action.queryValue,
            values: action.values,
            textNode: action.textNodes,
            providerComponent: action.providerComponent,
            consumerComponent: action.consumerComponent,
            context: action.context,
          };
        }
        return statement;
      });
      return {
        ...state,
        hooksStatements,
      };
    case actionTypes.ADD_HOOK_UPDATES:
      hooksStatements.push(createHookUpdates(state.statementId + 1));
      return {
        ...state,
        hooksStatements,
        statementId: state.statementId + 1,
      };

    case actionTypes.DELETE_HOOK_UPDATES:
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.UPDATE_HOOK_UPDATES:
      hooksStatements = hooksStatements.map((statement) => {
        if (statement.id === action.id) {
          return {
            ...statement,
            hook: action.hook,
            hookFileName: action.hookFileName,
            hookFilePath: action.hookFilePath,
            callbackFunc: action.callbackFunc,
            managedState: action.managedState,
            updatedState: action.updatedState,
          };
        }
        return statement;
      });
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.ADD_HOOKRENDER:
      hooksStatements.push(createHookRender(state.statementId + 1));
      return {
        ...state,
        hooksStatements,
        statementId: state.statementId + 1,
      };

    case actionTypes.DELETE_HOOKRENDER:
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.UPDATE_HOOKRENDER:
      hooksStatements = hooksStatements.map((statement) => {
        if (statement.id === action.id) {
          return {
            ...statement,
            hook: action.hook,
            parameterOne: action.parameterOne,
            expectedReturnValue: action.expectedReturnValue,
            returnValue: action.returnValue,
          };
        }
        return statement;
      });
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.UPDATE_HOOKS_FILEPATH:
      hooksStatements = hooksStatements.map((statement) => {
        if (statement.type === 'hook-updates' || statement.type === 'hookRender') {
          return {
            ...statement,
            hookFileName: action.hookFileName,
            hookFilePath: action.hookFilePath,
          };
        }
        return statement;
      });
      return {
        ...state,
        hooksStatements,
      };
    case actionTypes.UPDATE_CONTEXT_FILEPATH:
      hooksStatements = hooksStatements.map((statement) => {
        if (statement.type === 'context') {
          return {
            ...statement,
            contextFileName: action.contextFileName,
            contextFilePath: action.contextFilePath,
          };
        }
        return statement;
      });
      return {
        ...state,
        hooksStatements,
      };

    case actionTypes.CREATE_NEW_HOOKS_TEST:
      return {
        hasHooks: 0,
        hooksTestStatement: '',
        hooksStatements: [],
      };
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      hooksStatements = [...action.draggableStatements];
      return {
        ...state,
        hooksStatements,
      };
    default:
      return state;
  }
};
