import { createContext } from 'react';
import { HooksTestCaseState, Assertion, HooksAction, Hooks, Callback } from '../../utils/hooksTypes';

export const HooksTestCaseContext: any = createContext([]);

const newAssertion: Assertion = {
  id: 0,
  expectedState: '',
  expectedValue: '',
  matcher: '',
  not: false,
};
const newCallback: Callback = {
  id: 0,
  callbackFunc: '',
};

const newHooks: Hooks = {
  id: 0,
  type: 'hooks',
  testName: '',
  hook: '',
  hookParams: '',
  hookFileName: '',
  hookFilePath: '',
  callbackFunc: [
    {
      ...newCallback,
    },
  ],
  assertions: [
    {
      ...newAssertion,
    },
  ],
  typeof: false,
};

const newContext: any = {
  id: 0,
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
  testName: '',
  assertions: [
    {
      ...newAssertion,
    },
  ],
};

export const hooksTestCaseState: HooksTestCaseState = {
  hooksTestStatement: '',
  hooksStatements: [],
  statementId: 0,
  hookFileName: '',
  hookFilePath: '',
};

const deepCopy = (hooksStatements: Hooks[]) => {
  function copyAssertions(array: Assertion[]) {
    const copy: Assertion[] = array.map((el) => {
      return { ...el };
    });
    return copy;
  }
  function copyCallbackFunc(array: Callback[]) {
    const copy: Callback[] = array.map((el) => {
      return { ...el };
    });
    return copy;
  }

  const fullCopy: Hooks[] = hooksStatements.map((el) => {
    return {
      ...el,
      assertions: copyAssertions(el.assertions),
      callbackFunc: copyCallbackFunc(el.callbackFunc),
    };
    // }
  });

  return fullCopy;
};

export const hooksTestCaseReducer = (state: HooksTestCaseState, action: HooksAction) => {
  Object.freeze(state);
  let hooksStatements = [...state.hooksStatements];

  switch (action.type) {
    case 'UPDATE_HOOKS_TEST_STATEMENT': {
      return {
        ...state,
        hooksTestStatement: action.hooksTestStatement,
      };
    }

    case 'ADD_CONTEXT':
      if (hooksStatements.length === 0) {
        return {
          ...state,
          hooksTestStatement: '',
          id: 0,
          hooksStatements: [{ ...newContext }],
        };
      }
      hooksStatements.push({
        ...newContext,
        id: hooksStatements[hooksStatements.length - 1].id + 1,
      });
      return {
        ...state,
        hooksStatements,
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
            testName: action.testName,
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
      if (hooksStatements.length === 0) {
        return {
          ...state,
          hooksTestStatement: '',
          id: 0,
          hooksStatements: [{ ...newHooks, assertions: [{ ...newAssertion }] }],
        };
      }
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
      let newStatement = hooksStatements.find((statement) => {
        return statement.id === action.id;
      });
      Object.assign(newStatement, action, {
        type: 'hooks',
      });
      return {
        ...state,
        hooksStatements,
      };
    case 'UPDATE_HOOKS_FILEPATH':
      hooksStatements = hooksStatements.map((statement) => {
        return {
          ...statement,
          hookFileName: action.hookFileName,
          hookFilePath: action.hookFilePath,
        };
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

    case 'ADD_CALLBACKFUNC':
      hooksStatements[action.index as number].callbackFunc.push({
        id: hooksStatements[hooksStatements.length - 1].id + 1,
        callbackFunc: '',
      });
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    case 'DELETE_CALLBACKFUNC':
      hooksStatements[action.index as number].callbackFunc.splice(action.id!, 1);
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    case 'UPDATE_CALLBACKFUNC':
      hooksStatements[action.index as number].callbackFunc[
        action.id as number
      ] = action.callbackFunc!;
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
    case 'REPLACE_TEST': {
      return action.testState;
    }
    default:
      return state;
  }
};
