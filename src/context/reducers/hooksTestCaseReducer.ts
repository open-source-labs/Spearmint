import { createContext } from 'react';
// import { actionTypes } from '../actions/hooksTestCaseActions';
import { HooksTestCaseState, Assertion, Action, Hooks } from '../../utils/hooksTypes';

export const HooksTestCaseContext: any = createContext(null);

const newAssertion: Assertion = {
  id: 0,
  expectedState: '',
  expectedValue: '',
  matcher: '',
  not: false,
};

const newHooks: Hooks = {
  id: 0,
  type: 'hook-updates',
  testName: '',
  hook: '',
  hookParams: '',
  callbackFunc: '',
  assertions: [
    {
      ...newAssertion,
    },
  ],
  typeof: false,
};

export const hooksTestCaseState: HooksTestCaseState = {
  hooksTestStatement: '',
  hooksStatements: [{ ...newHooks, assertions: [{ ...newAssertion }] }],
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
  parameters: '',
  expectedState: '',
  expectedValue: '',
});

const createHookUpdates = (statementId: number) => ({
  ...newHooks,
  id: statementId,
});

const deepCopy = (hooksStatements: Hooks[]) => {
  function copyAssertions(array: Assertion[]) {
    console.log('array', array);
    const copy: Assertion[] = array.map((el) => {
      return { ...el };
    });
    return copy;
  }

  const fullCopy: Hooks[] = hooksStatements.map((el) => {
    return { ...el, assertions: copyAssertions(el.assertions) };
  });

  return fullCopy;
};

export const hooksTestCaseReducer = (state: HooksTestCaseState, action: Action) => {
  Object.freeze(state);
  console.log('state', state);
  console.log('action', action);
  let hooksStatements = [...state.hooksStatements];

  switch (action.type) {
    case 'UPDATE_HOOKS_TEST_STATEMENT': {
      // console.log('hooksteststatement', action.hooksTestStatement);
      return {
        ...state,
        hooksTestStatement: action.hooksTestStatement,
      };
    }

    case 'ADD_CONTEXT':
      hooksStatements.push(createContexts(state.statementId));
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
          console.log('update context action', action);
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
      // hooksStatements.push(createHookUpdates(state.statementId));
      // hooksStatements.push(createContexts(state.statementId));

      hooksStatements.push({
        ...newHooks,
        id: hooksStatements[hooksStatements.length - 1].id + 1,
        assertions: [],
      });
      return {
        ...state,
        hooksStatements,
      };

    case 'DELETE_HOOK_UPDATES':
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };

    case 'UPDATE_HOOK_UPDATES':
      // hooksStatements = hooksStatements.map((statement) => {
      // console.log(statement);
      let newStatement = hooksStatements.find((statement) => {
        return statement.id === action.id;
      });
      Object.assign(newStatement, action, {
        type: 'hook-updates',
      });
      return {
        ...state,
        hooksStatements,
      };
      // });
      return {
        ...state,
        hooksStatements,
      };

    case 'ADD_HOOKRENDER':
      hooksStatements.push(createHookRender(state.statementId));
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
            parameters: action.parameters,
            expectedValue: action.expectedValue,
            expectedState: action.expectedState,
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
        modalOpen: false,
        hooksTestStatement: '',
        hooksStatements: [{ ...newHooks, assertions: [{ ...newAssertion }] }],
      };
    case 'UPDATE_STATEMENTS_ORDER': {
      const newHooksStatements = [...action.draggableStatements];
      return {
        ...state,
        hooksStatements: newHooksStatements,
      };
    }
    case 'OPEN_INFO_MODAL':
      return {
        ...state,
        modalOpen: true,
      };
    case 'CLOSE_INFO_MODAL':
      return {
        ...state,
        modalOpen: false,
      };
    case 'ADD_ASSERTION':
      hooksStatements[action.index as number].assertions.push({
        id: hooksStatements[hooksStatements.length - 1].id + 1,
        expectedState: '',
        matcher: '',
        expectedValue: '',
        not: false,
      });
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    case 'DELETE_ASSERTION':
      hooksStatements[action.index as number].assertions.splice(action.id!, 1);
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    case 'UPDATE_ASSERTION':
      hooksStatements[action.index as number].assertions[action.id as number] = action.assertion!;
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    case 'TOGGLE_TYPEOF':
      hooksStatements[action.index as number].post = !hooksStatements[action.index as number].post;
      return {
        ...state,
        hooksStatements,
      };
    default:
      return state;
  }
};
