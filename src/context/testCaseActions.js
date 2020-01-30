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

  ADD_REDUCER: 'ADD_REDUCER',
  DELETE_REDUCER: 'DELETE_REDUCER',
  UPDATE_REDUCER: 'UPDATE_REDUCER',

  ADD_HOOK_UPDATES: 'ADD_HOOK_UPDATES',
  DELETE_HOOK_UPDATES: 'DELETE_HOOK_UPDATE',
  UPDATE_HOOK_UPDATES: 'UPDATE_HOOK_UPDATES',

  UPDATE_ACTIONS_FILEPATH: 'UPDATE_ACTIONS_FILEPATH',
  UPDATE_TYPES_FILEPATH: 'UPDATE_TYPES_FILEPATH',
  UPDATE_REDUCERS_FILEPATH: 'UPDATE_REDUCERS_FILEPATH',
  UPDATE_MIDDLEWARES_FILEPATH: 'UPDATE_MIDDLEWARES_FILEPATH',

  CREATE_NEW_TEST: 'CREATE_NEW_TEST',
};

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

export const addMiddleware = () => ({
  type: actionTypes.ADD_MIDDLEWARE,
});

export const deleteMiddleware = id => ({
  type: actionTypes.DELETE_MIDDLEWARE,
  id,
});

export const updateMiddleware = ({
  id,
  middlewaresFileName,
  middlewaresFilePath,
  queryType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  queryFunction,
}) => ({
  type: actionTypes.UPDATE_MIDDLEWARE,
  id,
  middlewaresFileName,
  middlewaresFilePath,
  queryType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  queryFunction,
});

export const addReducer = () => ({
  type: actionTypes.ADD_REDUCER,
});

export const deleteReducer = id => ({
  type: actionTypes.DELETE_REDUCER,
  id,
});

export const updateReducer = ({
  id,
  queryVariant,
  querySelector,
  queryValue,
  typesFileName,
  typesFilePath,
  reducersFileName,
  reducersFilePath,
  matcherValue,
}) => ({
  type: actionTypes.UPDATE_REDUCER,
  id,
  queryVariant,
  querySelector,
  queryValue,
  typesFileName,
  typesFilePath,
  reducersFileName,
  reducersFilePath,
  matcherValue,
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
  actionsFileName,
  filePath,
  typesFileName,
  typesFilePath,
  asyncFunction,
  method,
  route,
  store,
  matcher,
  expectedResponse,
}) => ({
  type: actionTypes.UPDATE_ASYNC,
  id,
  actionsFileName,
  filePath,
  typesFileName,
  typesFilePath,
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
  actionsFileName,
  filePath,
  typesFileName,
  typesFilePath,
  actionCreatorFunc,
  actionType,
  payloadKey,
  payloadType,
}) => ({
  type: actionTypes.UPDATE_ACTIONCREATOR,
  id,
  actionsFileName,
  filePath,
  typesFileName,
  typesFilePath,
  actionCreatorFunc,
  actionType,
  payloadKey,
  payloadType,
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
  hookFile,
  callbackFunc,
  managedState,
  updatedState,
  filePath,
}) => ({
  type: actionTypes.UPDATE_HOOK_UPDATES,
  id,
  hook,
  hookFile,
  callbackFunc,
  managedState,
  updatedState,
  filePath,
});

export const updateActionsFilePath = (actionsFileName, filePath) => ({
  type: actionTypes.UPDATE_ACTIONS_FILEPATH,
  actionsFileName,
  filePath,
});

export const updateTypesFilePath = (typesFileName, typesFilePath) => ({
  type: actionTypes.UPDATE_TYPES_FILEPATH,
  typesFileName,
  typesFilePath,
});

export const updateReducersFilePath = (reducersFileName, reducersFilePath) => ({
  type: actionTypes.UPDATE_REDUCERS_FILEPATH,
  reducersFileName,
  reducersFilePath,
});

export const updateMiddlewaresFilePath = (middlewaresFileName, middlewaresFilePath) => ({
  type: actionTypes.UPDATE_MIDDLEWARES_FILEPATH,
  middlewaresFileName,
  middlewaresFilePath,
});

export const createNewTest = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});
