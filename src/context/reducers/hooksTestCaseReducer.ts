import { createContext } from 'react';
import { actionTypes } from '../actions/hooksTestCaseActions';
import { HooksTestCaseState, Assertion, Action, Hooks, Callback, HooksAction } from '../../utils/hooksTypes';

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

const deepCopy = (hooksStatements: Hooks[]): Hooks[] => {
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

// used to be
// export const hooksTestCaseReducer = (state: HooksTestCaseState, action: HooksAction) => {
export const hooksTestCaseReducer = (state: HooksTestCaseState, action: Action) => {
  Object.freeze(state);
  let hooksStatements: Hooks[] = [...state.hooksStatements];

  switch (action.type) {
    
    case actionTypes.RESET_TESTS: {
      return hooksTestCaseState;
    }
  
    case actionTypes.UPDATE_HOOKS_TEST_STATEMENT: {
      return {
        ...state,
        hooksTestStatement: action.hooksTestStatement,
      };
    }

    case actionTypes.ADD_CONTEXT: {
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
    }

    case actionTypes.DELETE_CONTEXT: {
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };
    }

    // >>>>>>>>> CURRENTLY NOT USED <<<<<<<<
    // case actionTypes.UPDATE_CONTEXT: {
    //   hooksStatements = hooksStatements.map((statement) => {
    //     if (statement.id === action.id) {
    //       return {
    //         ...statement,
    //         queryVariant: action.queryVariant,
    //         querySelector: action.querySelector,
    //         queryValue: action.queryValue,
    //         values: action.values,
    //         textNode: action.textNodes,
    //         testName: action.testName,
    //         providerComponent: action.providerComponent,
    //         consumerComponent: action.consumerComponent,
    //         context: action.context,
    //       };
    //     }
    //     return statement;
    //   });
    //   return {
    //     ...state,
    //     hooksStatements,
    //   };
    // }

    case actionTypes.ADD_HOOK_UPDATES: {
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
    }

    case actionTypes.DELETE_HOOK_UPDATES: {
      hooksStatements = hooksStatements.filter((statement) => statement.id !== action.id);
      return {
        ...state,
        hooksStatements,
      };
    }

    case actionTypes.UPDATE_HOOK_UPDATES: {
      let newStatement = hooksStatements.find((statement) => {
        return statement.id === action.id;
      });
      if (newStatement !== undefined) {
        Object.assign(newStatement, action, {
          type: 'hooks',
        });
      }
      return {
        ...state,
        hooksStatements,
      };
    }

    case actionTypes.UPDATE_HOOKS_FILEPATH: {
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
    }

    case actionTypes.UPDATE_CONTEXT_FILEPATH: {
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
    }

    case actionTypes.CREATE_NEW_HOOKS_TEST: {
      return {
        modalOpen: false,
        hooksTestStatement: '',
        hooksStatements: [{ ...newHooks, assertions: [{ ...newAssertion }] }],
      };
    }

    case actionTypes.UPDATE_STATEMENTS_ORDER: {
      if (action.draggableStatements) {
        const newHooksStatements = [...action.draggableStatements];
        return {
          ...state,
          hooksStatements: newHooksStatements,
        };
      }
    }

    case actionTypes.OPEN_INFO_MODAL: {
      return {
        ...state,
        modalOpen: true,
      };
    }

    case actionTypes.CLOSE_INFO_MODAL: {
      return {
        ...state,
        modalOpen: false,
      };
    }

    case actionTypes.ADD_ASSERTION: {
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
    }

    case actionTypes.DELETE_ASSERTION: {
      hooksStatements[action.index as number].assertions.splice(action.id!, 1);
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    }

    case actionTypes.UPDATE_ASSERTION: {
      hooksStatements[action.index as number].assertions[action.id as number] = action.assertion!;
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    }

    case actionTypes.ADD_CALLBACKFUNC: {
      hooksStatements[action.index as number].callbackFunc.push({
        id: hooksStatements[hooksStatements.length - 1].id + 1,
        callbackFunc: '',
      });
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    }

    case actionTypes.DELETE_CALLBACKFUNC: {
      hooksStatements[action.index as number].callbackFunc.splice(action.id!, 1);
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    }

    case actionTypes.UPDATE_CALLBACKFUNC: {
      hooksStatements[action.index as number].callbackFunc[
        action.id as number
      ] = action.callback!;
      return {
        ...state,
        hooksStatements: deepCopy(hooksStatements),
      };
    }

    // >>>>>>>>> CURRENTLY NOT USED <<<<<<<<
    // case actionTypes.TOGGLE_TYPEOF: {
    //   hooksStatements[action.index as number].post = !hooksStatements[action.index as number].post;
    //   return {
    //     ...state,
    //     hooksStatements,
    //   };
    // }

    case actionTypes.REPLACE_TEST: {
      return action.testState;
    }

    default:
      return state;
  }
};

const dispatchToHooksTestCase = () => null;


const hooksTestCaseArr: [HooksTestCaseState, (action: Action) => void] = [hooksTestCaseState, dispatchToHooksTestCase]
export const HooksTestCaseContext = createContext(hooksTestCaseArr);