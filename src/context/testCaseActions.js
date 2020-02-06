export const actionTypes = {
  TOGGLE_REACT: 'TOGGLE_REACT',

  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  UPDATE_TEST_STATEMENT: 'UPDATE_TEST_STATEMENT',

  ADD_ACTION: 'ADD_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
  UPDATE_ACTION: 'UPDATE_ACTION',

  ADD_ASSERTION: 'ADD_ASSERTION',
  DELETE_ASSERTION: 'DELETE_ASSERTION',
  UPDATE_ASSERTION: 'UPDATE_ASSERTION',

  ADD_RENDER: 'ADD_RENDER',
  DELETE_RENDER: 'DELETE_RENDER',
  UPDATE_RENDER_COMPONENT: 'UPDATE_RENDER_COMPONENT',

  ADD_RENDER_PROP: 'ADD_RENDER_PROP',
  DELETE_RENDER_PROP: 'DELETE_RENDER_PROP',
  UPDATE_RENDER_PROP: 'UPDATE_RENDER_PROPS',

  // Context
  ADD_CONTEXT: 'ADD_CONTEXT',
  DELETE_CONTEXT: 'DELETE_CONTEXT',
  UPDATE_CONTEXT: 'UPDATE_CONTEXT',

  // Action type for hookRender
  ADD_HOOKRENDER: 'ADD_HOOKRENDER',
  DELETE_HOOKRENDER: 'DELETE_HOOKRENDER',
  UPDATE_HOOKRENDER: 'UPDATE_HOOKRENDER',

  ADD_HOOK_UPDATES: 'ADD_HOOK_UPDATES',
  DELETE_HOOK_UPDATES: 'DELETE_HOOK_UPDATE',
  UPDATE_HOOK_UPDATES: 'UPDATE_HOOK_UPDATES',

  UPDATE_HOOKS_FILEPATH: 'UPDATE_HOOKS_FILEPATH',

  CREATE_NEW_TEST: 'CREATE_NEW_TEST',
};

export const toggleReact = () => ({
  type: actionTypes.TOGGLE_REACT,
});

export const updateStatementsOrder = draggableStatements => ({
  type: actionTypes.UPDATE_STATEMENTS_ORDER,
  draggableStatements,
});

export const updateTestStatement = testStatement => ({
  type: actionTypes.UPDATE_TEST_STATEMENT,
  testStatement,
});

export const addAction = () => ({
  type: actionTypes.ADD_ACTION,
});

export const deleteAction = id => ({
  type: actionTypes.DELETE_ACTION,
  id,
});

export const updateAction = ({
  id,
  eventType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  suggestions,
}) => ({
  type: actionTypes.UPDATE_ACTION,
  id,
  eventType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  suggestions,
});

export const addAssertion = () => ({
  type: actionTypes.ADD_ASSERTION,
});

export const deleteAssertion = id => ({
  type: actionTypes.DELETE_ASSERTION,
  id,
});

export const updateAssertion = ({
  id,
  queryVariant,
  querySelector,
  queryValue,
  isNot,
  matcherType,
  matcherValue,
  suggestions,
}) => ({
  type: actionTypes.UPDATE_ASSERTION,
  id,
  queryVariant,
  querySelector,
  queryValue,
  isNot,
  matcherType,
  matcherValue,
  suggestions,
});

export const addRender = () => ({
  type: actionTypes.ADD_RENDER,
});

export const deleteRender = id => ({
  type: actionTypes.DELETE_RENDER,
  id,
});

export const updateRenderComponent = (componentName, filePath) => ({
  type: actionTypes.UPDATE_RENDER_COMPONENT,
  componentName,
  filePath,
});

export const addRenderProp = renderId => ({
  type: actionTypes.ADD_RENDER_PROP,
  renderId,
});

export const deleteRenderProp = (renderId, propId) => ({
  type: actionTypes.DELETE_RENDER_PROP,
  renderId,
  propId,
});

export const updateRenderProp = (renderId, propId, propKey, propValue) => ({
  type: actionTypes.UPDATE_RENDER_PROP,
  renderId,
  propId,
  propKey,
  propValue,
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

export const createNewTest = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});
