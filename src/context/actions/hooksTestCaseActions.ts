import { Assertion, Callback, Hooks } from '../../utils/hooksTypes';

export const actionTypes = {
  TOGGLE_HOOKS: 'TOGGLE_HOOKS',
  UPDATE_HOOKS_TEST_STATEMENT: 'UPDATE_HOOKS_TEST_STATEMENT',
  ADD_CONTEXT: 'ADD_CONTEXT',
  DELETE_CONTEXT: 'DELETE_CONTEXT',
  UPDATE_CONTEXT: 'UPDATE_CONTEXT',
  ADD_HOOK_UPDATES: 'ADD_HOOK_UPDATES',
  DELETE_HOOK_UPDATES: 'DELETE_HOOK_UPDATES',
  UPDATE_HOOK_UPDATES: 'UPDATE_HOOK_UPDATES',
  UPDATE_HOOKS_FILEPATH: 'UPDATE_HOOKS_FILEPATH',
  UPDATE_CONTEXT_FILEPATH: 'UPDATE_CONTEXT_FILEPATH',
  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  CREATE_NEW_HOOKS_TEST: 'CREATE_NEW_HOOKS_TEST',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
  ADD_ASSERTION: 'ADD_ASSERTION',
  UPDATE_ASSERTION: 'UPDATE_ASSERTION',
  DELETE_ASSERTION: 'DELETE_ASSERTION',
  TOGGLE_TYPEOF: 'TOGGLE_TYPEOF',
  ADD_CALLBACKFUNC: 'ADD_CALLBACKFUNC',
  DELETE_CALLBACKFUNC: 'DELETE_CALLBACKFUNC',
  UPDATE_CALLBACKFUNC: 'UPDATE_CALLBACKFUNC',
  REPLACE_TEST: 'REPLACE_TEST',
  RESET_TESTS: 'RESET_TESTS',
};

export const toggleHooks = () => ({
  type: actionTypes.TOGGLE_HOOKS,
});

export const updateHooksTestStatement = (hooksTestStatement: string) => ({
  type: actionTypes.UPDATE_HOOKS_TEST_STATEMENT,
  hooksTestStatement,
});

export const addHookUpdates = () => ({
  type: actionTypes.ADD_HOOK_UPDATES,
});

export const deleteHookUpdates = (id: number) => ({
  type: actionTypes.DELETE_HOOK_UPDATES,
  id,
});

export const updateHookUpdates = (hooksUpdates: Hooks) => ({
  ...hooksUpdates,
  type: actionTypes.UPDATE_HOOK_UPDATES,
});

export const updateHooksFilePath = (hookFileName: string, hookFilePath: string) => ({
  type: actionTypes.UPDATE_HOOKS_FILEPATH,
  hookFileName,
  hookFilePath,
});

export const createNewHooksTest = () => ({
  type: actionTypes.CREATE_NEW_HOOKS_TEST,
});

export const updateStatementsOrder = (draggableStatements: Hooks[]) => ({
  type: actionTypes.UPDATE_STATEMENTS_ORDER,
  draggableStatements,
});

export const openInfoModal = () => ({
  type: actionTypes.OPEN_INFO_MODAL,
});

export const closeInfoModal = () => ({
  type: actionTypes.CLOSE_INFO_MODAL,
});

export const addAssertion = (index: number) => {
  return {
    type: actionTypes.ADD_ASSERTION,
    index,
  };
};

export const updateAssertion = (index: number, id: number, newAssertion: Assertion) => {
  return {
    type: actionTypes.UPDATE_ASSERTION,
    index,
    id,
    assertion: newAssertion,
  };
};

export const deleteAssertion = (index: number, id: number) => {
  return {
    type: actionTypes.DELETE_ASSERTION,
    index,
    id,
  };
};

export const addCallbackFunc = (index: number) => {
  return {
    type: actionTypes.ADD_CALLBACKFUNC,
    index,
  };
};

export const updateCallbackFunc = (index: number, id: number, newCallback: Callback) => {
  return {
    type: actionTypes.UPDATE_CALLBACKFUNC,
    index,
    id,
    callbackFunc: newCallback,
  };
};

export const deleteCallbackFunc = (index: number, id: number) => {
  return {
    type: actionTypes.DELETE_CALLBACKFUNC,
    index,
    id,
  };
};

export const toggleTypeof = (index: number) => {
  return {
    type: actionTypes.TOGGLE_TYPEOF,
    index,
  };
};

export const hooksReplaceTest = (testState: object) => ({
  type: actionTypes.REPLACE_TEST,
  testState,
});

export const resetTests = () => ({
  type: actionTypes.RESET_TESTS
});
