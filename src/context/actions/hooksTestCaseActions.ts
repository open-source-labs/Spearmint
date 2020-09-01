import { HooksStatements } from '../../utils/hooksTypes';

export const actionTypes = {
  TOGGLE_HOOKS: 'TOGGLE_HOOKS',
  UPDATE_HOOKS_TEST_STATEMENT: 'UPDATE_HOOKS_TEST_STATEMENT',
  ADD_CONTEXT: 'ADD_CONTEXT',
  DELETE_CONTEXT: 'DELETE_CONTEXT',
  UPDATE_CONTEXT: 'UPDATE_CONTEXT',
  ADD_HOOKRENDER: 'ADD_HOOKRENDER',
  DELETE_HOOKRENDER: 'DELETE_HOOKRENDER',
  UPDATE_HOOKRENDER: 'UPDATE_HOOKRENDER',
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
};

export const toggleHooks = () => ({
  type: actionTypes.TOGGLE_HOOKS,
});

export const updateHooksTestStatement = (hooksTestStatement: string) => ({
  type: actionTypes.UPDATE_HOOKS_TEST_STATEMENT,
  hooksTestStatement,
});

export const addContexts = () => ({
  type: actionTypes.ADD_CONTEXT,
});

export const deleteContexts = (id: number) => ({
  type: actionTypes.DELETE_CONTEXT,
  id,
});

export const updateContexts = (contexts: object) => ({
  ...contexts,
  type: actionTypes.UPDATE_CONTEXT,
});

export const addHookUpdates = () => ({
  type: actionTypes.ADD_HOOK_UPDATES,
});

export const deleteHookUpdates = (id: number) => ({
  type: actionTypes.DELETE_HOOK_UPDATES,
  id,
});

export const updateHookUpdates = (hooksUpdates: object) => ({
  ...hooksUpdates,
  type: actionTypes.UPDATE_HOOK_UPDATES,
});

export const addHookRender = () => ({
  type: actionTypes.ADD_HOOKRENDER,
});

export const deleteHookRender = (id: number) => ({
  type: actionTypes.DELETE_HOOKRENDER,
  id,
});

export const updateHookRender = (hookRenders: object) => ({
  ...hookRenders,
  type: actionTypes.UPDATE_HOOKRENDER,
});

export const updateHooksFilePath = (hookFileName: string, hookFilePath: string) => ({
  type: actionTypes.UPDATE_HOOKS_FILEPATH,
  hookFileName,
  hookFilePath,
});

export const updateContextFilePath = (contextFileName: string, contextFilePath: string) => ({
  type: actionTypes.UPDATE_CONTEXT_FILEPATH,
  contextFileName,
  contextFilePath,
});

export const createNewHooksTest = () => ({
  type: actionTypes.CREATE_NEW_HOOKS_TEST,
});

export const updateStatementsOrder = (draggableStatements: Array<HooksStatements>) => ({
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

export const deleteAssertion = (index: number, id: number) => {
  return {
    type: actionTypes.DELETE_ASSERTION,
    index,
    id,
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

export const toggleTypeof = (index: number) => {
  return {
    type: actionTypes.TOGGLE_TYPEOF,
    index,
  };
};
