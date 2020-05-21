import { createContext } from 'react';

export const HooksTestCaseContext = createContext(null);

interface hooksTestCaseState {
  hooksTestStatement: string;
  hooksStatements: Array<hooksStatements>;
  hasHooks: number;
  statementId: number;
}

interface hooksStatements {
  id: number;
  type: string;
  [key: string]: any
}

type HooksStatementType =
 | { type: 'TOGGLE_HOOKS' | 'ADD_CONTEXT' | 'ADD_HOOKRENDER' | 'ADD_HOOK_UPDATES' | 'ADD_HOOKRENDER' | 'CREATE_NEW_HOOKS_TEST' }
 | { type: 'UPDATE_HOOKS_TEST_STATEMENT'; hooksTestStatement: string }
 | { type: 'DELETE_CONTEXT' | 'DELETE_HOOKRENDER' | 'DELETE_HOOK_UPDATES'; id: number }
 | { type: 'UPDATE_CONTEXT'; id: number; queryVariant: string; querySelector: string; queryValue: string; values: string; textNodes: string; providerComponent: string; consumerComponent: string; context: string; }
 | { type: 'UPDATE_HOOKRENDER'; id: number; hook: string; parameterOne: string; expectedReturnValue: string; returnValue: string; }
 | { type: 'UPDATE_HOOK_UPDATES'; id: number; hook: string; hookFileName: string; hookFilePath: string; callbackFunc: string; managedState: string; updatedState: string;}
 | { type: 'UPDATE_HOOKS_FILEPATH'; hookFileName: string; hookFilePath: string }
 | { type: 'UPDATE_CONTEXT_FILEPATH'; contextFileName: string; contextFilePath: string }
 | { type: 'UPDATE_STATEMENTS_ORDER'; draggableStatements: object[] };


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

export const hooksTestCaseReducer = (state: hooksStatements, action: HooksStatementType) => {
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
    case 'UPDATE_STATEMENTS_ORDER':
      hooksStatements = [...action.draggableStatements];
      return {
        ...state,
        hooksStatements,
      };
    default:
      return state;
  }
};
