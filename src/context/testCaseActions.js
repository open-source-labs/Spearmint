export const actionTypes = {
  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  UPDATE_TEST_STATEMENT: 'UPDATE_TEST_STATEMENT',

  ADD_ACTION: 'ADD_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
  UPDATE_ACTION: 'UPDATE_ACTION',

  ADD_MIDDLEWARE: 'ADD_MIDDLEWARE',
  DELETE_MIDDLEWARE: 'DELETE_MIDDLEWARE',
  UPDATE_MIDDLEWARE: 'UPDATE_MIDDLEWARE',

  ADD_ASSERTION: 'ADD_ASSERTION',
  DELETE_ASSERTION: 'DELETE_ASSERTION',
  UPDATE_ASSERTION: 'UPDATE_ASSERTION',

  ADD_RENDER: 'ADD_RENDER',
  DELETE_RENDER: 'DELETE_RENDER',
  UPDATE_RENDER_COMPONENT: 'UPDATE_RENDER_COMPONENT',

  ADD_RENDER_PROP: 'ADD_RENDER_PROP',
  DELETE_RENDER_PROP: 'DELETE_RENDER_PROP',
  UPDATE_RENDER_PROP: 'UPDATE_RENDER_PROPS',

  ADD_ASYNC: 'ADD_ASYNC',
  DELETE_ASYNC: 'DELETE_ASYNC',
  UPDATE_ASYNC: 'UPDATE_ASYNC',

  ADD_ACTIONCREATOR: 'ADD_ACTIONCREATOR',
  DELETE_ACTIONCREATOR: 'DELETE_ACTIONCREATOR',
  UPDATE_ACTIONCREATOR: 'UPDATE_ACTIONCREATORS',

  CREATE_NEW_TEST: 'CREATE_NEW_TEST',

  // Action type for reducer
  ADD_REDUCER: 'ADD_REDUCER',
  DELETE_REDUCER: 'DELETE_REDUCER',
  UPDATE_REDUCER: 'UPDATE_REDUCER',

  // Action type for hookRender
  ADD_HOOKRENDER: 'ADD_HOOKRENDER',
  DELETE_HOOKRENDER: 'DELETE_HOOKRENDER',
  UPDATE_HOOKRENDER: 'UPDATE_HOOKRENDER',
};

export const updateStatementsOrder = draggableStatements => ({
  type: actionTypes.UPDATE_STATEMENTS_ORDER,
  draggableStatements,
});

export const updateTestStatement = testStatement => ({
  type: actionTypes.UPDATE_TEST_STATEMENT,
  testStatement,
});

export const addMiddleware = () => ({
  type: actionTypes.ADD_MIDDLEWARE,
});

export const deleteMiddleware = id => ({
  type: actionTypes.DELETE_MIDDLEWARE,
  id,
});

export const updateMiddleware = ({
  id,
  eventType,
  queryType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  queryFunction,
  suggestions,
}) => ({
  type: actionTypes.UPDATE_MIDDLEWARE,
  id,
  eventType,
  queryType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  queryFunction,
  suggestions,
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

// Functions for Reducer
export const addReducer = () => ({
  type: actionTypes.ADD_REDUCER,
});

export const deleteReducer = id => ({
  type: actionTypes.DELETE_REDUCER,
  id,
});

export const updateReducer = ({
  id,
  actionType,
  initialState,
  reducerName,
  updatedState,
}) => ({
  type: actionTypes.UPDATE_REDUCER,
  id,
  actionType,
  initialState,
  reducerName,
  updatedState,
});

export const addAsync = () => ({
  type: actionTypes.ADD_ASYNC,
});

export const deleteAsync = id => ({
  type: actionTypes.DELETE_ASYNC,
  id,
});

export const updateAsync = ({
  id,
  asyncFunction,
  method,
  route,
  store,
  matcher,
  expectedResponse,
}) => ({
  type: actionTypes.UPDATE_ASYNC,
  id,
  asyncFunction,
  method,
  route,
  store,
  matcher,
  expectedResponse,
});

export const addActionCreator = () => ({
  type: actionTypes.ADD_ACTIONCREATOR,
});

export const deleteActionCreator = id => ({
  type: actionTypes.DELETE_ACTIONCREATOR,
  id,
});

export const updateActionCreator = ({
  id,
  actionsFolder,
  typesFolder,
  actionCreatorFunc,
  actionType,
  payloadKey,
  payloadType,
  filePath,
}) => ({
  type: actionTypes.UPDATE_ACTIONCREATOR,
  id,
  actionsFolder,
  typesFolder,
  actionCreatorFunc,
  actionType,
  payloadKey,
  payloadType,
  filePath,
});

// hookRender
export const addHookRender = () => ({
  type: actionTypes.ADD_HOOKRENDER,
});

export const deleteHookRender = id => ({
  type: actionTypes.DELETE_HOOKRENDER,
  id,
});

export const updateHookRender = ({
  id,
  hookRenderFolder,
  hookFuncFolder,
  hookFunction,
  parameterOne,
  expectedReturnValue,
  returnValue,
}) => ({
  type: actionTypes.UPDATE_HOOKRENDER,
  id,
  hookRenderFolder,
  hookFuncFolder,
  hookFunction,
  parameterOne,
  expectedReturnValue,
  returnValue,
});
export const createNewTest = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});
