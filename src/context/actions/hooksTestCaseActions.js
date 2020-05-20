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
  DELETE_HOOK_UPDATES: 'DELETE_HOOK_UPDATE',
  UPDATE_HOOK_UPDATES: 'UPDATE_HOOK_UPDATES',

  UPDATE_HOOKS_FILEPATH: 'UPDATE_HOOKS_FILEPATH',
  UPDATE_CONTEXT_FILEPATH: 'UPDATE_CONTEXT_FILEPATH',

  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',

  CREATE_NEW_HOOKS_TEST: 'CREATE_NEW_HOOKS_TEST',
};

export const toggleHooks = () => ({
  type: actionTypes.TOGGLE_HOOKS,
});

export const updateHooksTestStatement = hooksTestStatement => ({
  type: actionTypes.UPDATE_HOOKS_TEST_STATEMENT,
  hooksTestStatement,
});

export const addContexts = () => ({
  type: actionTypes.ADD_CONTEXT,
});

export const deleteContexts = id => ({
  type: actionTypes.DELETE_CONTEXT,
  id,
});

export const updateContexts = ({
  id,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  values,
  textNode,
  providerComponent,
  consumerComponent,
  context,
}) => ({
  type: actionTypes.UPDATE_CONTEXT,
  id,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  values,
  textNode,
  providerComponent,
  consumerComponent,
  context,
});

export const addHookUpdates = () => ({
  type: actionTypes.ADD_HOOK_UPDATES,
});

export const deleteHookUpdates = id => ({
  type: actionTypes.DELETE_HOOK_UPDATES,
  id,
});

export const updateHookUpdates = ({
  id,
  hook,
  hookFileName,
  hookFilePath,
  callbackFunc,
  managedState,
  updatedState,
}) => ({
  type: actionTypes.UPDATE_HOOK_UPDATES,
  id,
  hook,
  hookFileName,
  hookFilePath,
  callbackFunc,
  managedState,
  updatedState,
});

export const addHookRender = () => ({
  type: actionTypes.ADD_HOOKRENDER,
});

export const deleteHookRender = id => ({
  type: actionTypes.DELETE_HOOKRENDER,
  id,
});

export const updateHookRender = ({
  id,
  hookFileName,
  hookFilePath,
  hook,
  parameterOne,
  expectedReturnValue,
  returnValue,
}) => ({
  type: actionTypes.UPDATE_HOOKRENDER,
  id,
  hookFileName,
  hookFilePath,
  hook,
  parameterOne,
  expectedReturnValue,
  returnValue,
});

export const updateHooksFilePath = (hookFileName, hookFilePath) => ({
  type: actionTypes.UPDATE_HOOKS_FILEPATH,
  hookFileName,
  hookFilePath,
});

export const updateContextFilePath = (contextFileName, contextFilePath) => ({
  type: actionTypes.UPDATE_CONTEXT_FILEPATH,
  contextFileName,
  contextFilePath,
});

export const createNewHooksTest = () => ({
  type: actionTypes.CREATE_NEW_HOOKS_TEST,
});

export const updateStatementsOrder = draggableStatements => {
  return {
    type: actionTypes.UPDATE_STATEMENTS_ORDER,
    draggableStatements,
  };
};
