export const actionTypes = {
  TOGGLE_REDUX: 'TOGGLE_REDUX',

  UPDATE_REDUX_TEST_STATEMENT: 'UPDATE_REDUX_TEST_STATEMENT',

  ADD_MIDDLEWARE: 'ADD_MIDDLEWARE',
  DELETE_MIDDLEWARE: 'DELETE_MIDDLEWARE',
  UPDATE_MIDDLEWARE: 'UPDATE_MIDDLEWARE',

  ADD_ACTIONCREATOR: 'ADD_ACTIONCREATOR',
  DELETE_ACTIONCREATOR: 'DELETE_ACTIONCREATOR',
  UPDATE_ACTIONCREATOR: 'UPDATE_ACTIONCREATORS',

  ADD_ASYNC: 'ADD_ASYNC',
  DELETE_ASYNC: 'DELETE_ASYNC',
  UPDATE_ASYNC: 'UPDATE_ASYNC',

  ADD_REDUCER: 'ADD_REDUCER',
  DELETE_REDUCER: 'DELETE_REDUCER',
  UPDATE_REDUCER: 'UPDATE_REDUCER',

  UPDATE_MIDDLEWARES_FILEPATH: 'UPDATE_MIDDLEWARES_FILEPATH',
  UPDATE_ACTIONS_FILEPATH: 'UPDATE_ACTIONS_FILEPATH',
  UPDATE_TYPES_FILEPATH: 'UPDATE_TYPES_FILEPATH',
  UPDATE_REDUCERS_FILEPATH: 'UPDATE_REDUCERS_FILEPATH',

  CREATE_NEW_REDUX_TEST: 'CREATE_NEW_REDUX_TEST',
};

export const toggleRedux = () => ({
  type: actionTypes.TOGGLE_REDUX,
});

export const updateReduxTestStatement = reduxTestStatement => ({
  type: actionTypes.UPDATE_REDUX_TEST_STATEMENT,
  reduxTestStatement,
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
  requestBody,
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
  requestBody,
  store,
  matcher,
  expectedResponse,
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
  reducerAction,
  initialState,
  reducerName,
  typesFileName,
  typesFilePath,
  reducersFileName,
  reducersFilePath,
  expectedState,
}) => ({
  type: actionTypes.UPDATE_REDUCER,
  id,
  reducerAction,
  initialState,
  reducerName,
  typesFileName,
  typesFilePath,
  reducersFileName,
  reducersFilePath,
  expectedState,
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

export const createNewReduxTest = () => ({
  type: actionTypes.CREATE_NEW_REDUX_TEST,
});
