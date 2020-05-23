import { createContext } from 'react';
import { HooksTestCaseState, HooksStatementType } from '../../utils/hooks';

export const HooksTestCaseContext: any = createContext(null);

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

export const hooksTestCaseReducer = (state: HooksTestCaseState, action: HooksStatementType) => {
  Object.freeze(state);
  let hooksStatements = [...state.hooksStatements];

  switch (action.type) {
    case 'TOGGLE_HOOKS': {
      return {
        ...state,
        hasHooks: state.hasHooks + 1,
      };
    }
    case 'UPDATE_HOOKS_TEST_STATEMENT': {
      return {
        ...state,
        hooksTestStatement: action.hooksTestStatement,
      };
    }
    case 'ADD_CONTEXT':
      hooksStatements.push(createContexts(state.statementId + 1));
      return {
        ...state,
        hooksStatements,
        statementId: state.statementId + 1,
      };
    case 'DELETE_CONTEXT':
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case 'UPDATE_CONTEXT':
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
    case 'ADD_HOOK_UPDATES':
      hooksStatements.push(createHookUpdates(state.statementId + 1));
      return {
        ...state,
        hooksStatements,
        statementId: state.statementId + 1,
      };

    case 'DELETE_HOOK_UPDATES':
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case 'UPDATE_HOOK_UPDATES':
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

    case 'ADD_HOOKRENDER':
      hooksStatements.push(createHookRender(state.statementId + 1));
      return {
        ...state,
        hooksStatements,
        statementId: state.statementId + 1,
      };

    case 'DELETE_HOOKRENDER':
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case 'UPDATE_HOOKRENDER':
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

    case 'UPDATE_HOOKS_FILEPATH':
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
    case 'UPDATE_CONTEXT_FILEPATH':
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

    case 'CREATE_NEW_HOOKS_TEST':
      return {
        hasHooks: 0,
        hooksTestStatement: '',
        hooksStatements: [],
      };
    case 'UPDATE_STATEMENTS_ORDER': {
      const newHooksStatements = [...action.draggableStatements];
      return {
        ...state,
        hooksStatements: newHooksStatements,
      };
    }
    default:
      return state;
  }
};
