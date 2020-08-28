// ----------------Action types--------------------
export const actionTypes = {
  TOGGLE_REDUX: 'TOGGLE_REDUX',
  UPDATE_REDUX_TEST_STATEMENT: 'UPDATE_REDUX_TEST_STATEMENT',
  ADD_MIDDLEWARE: 'ADD_MIDDLEWARE',
  DELETE_MIDDLEWARE: 'DELETE_MIDDLEWARE',
  UPDATE_MIDDLEWARE: 'UPDATE_MIDDLEWARE',
  ADD_ACTIONCREATOR: 'ADD_ACTIONCREATOR',
  DELETE_ACTIONCREATOR: 'DELETE_ACTIONCREATOR',
  UPDATE_ACTIONCREATOR: 'UPDATE_ACTIONCREATOR',
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
  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  CREATE_NEW_REDUX_TEST: 'CREATE_NEW_REDUX_TEST',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
};

interface ToggleReduxAction {
  type: typeof actionTypes.TOGGLE_REDUX;
  payload?: null;
}

interface UpdateReduxTestStatementAction {
  type: typeof actionTypes.UPDATE_REDUX_TEST_STATEMENT;
  payload: string;
}

interface UpdateMiddlewareAction {
  type: typeof actionTypes.UPDATE_MIDDLEWARE;
  payload: UpdateMiddleware;
}

interface UpdateActionCreatorAction {
  type: typeof actionTypes.UPDATE_ACTIONCREATOR;
  payload: UpdateActionCreator;
}

interface UpdateAsyncAction {
  type: typeof actionTypes.UPDATE_ASYNC;
  payload: UpdateAsync;
}

interface UpdateReducerAction {
  type: typeof actionTypes.UPDATE_REDUCER;
  payload: UpdateReducer;
}

interface UpdateActionsFilePathAction {
  type: typeof actionTypes.UPDATE_ACTIONS_FILEPATH;
  payload: UpdateActionsFilePath;
}

interface UpdateStatementsOrderAction {
  type: typeof actionTypes.UPDATE_STATEMENTS_ORDER;
  payload: ReduxStatements[];
}

interface AddMiddlewareAction {
  type: typeof actionTypes.ADD_MIDDLEWARE;
  payload?: null;
}

interface DeleteMiddlewareAction {
  type: typeof actionTypes.DELETE_MIDDLEWARE;
  payload: number | null;
}

interface AddActionCreatorAction {
  type: typeof actionTypes.ADD_ACTIONCREATOR;
  payload?: null;
}

interface DeleteActionCreatorAction {
  type: typeof actionTypes.DELETE_ACTIONCREATOR;
  payload: number;
}

interface AddAsyncAction {
  type: typeof actionTypes.ADD_ASYNC;
  payload?: null;
}

interface DeleteAsyncAction {
  type: typeof actionTypes.DELETE_ASYNC;
  payload: number;
}

interface AddReducerAction {
  type: typeof actionTypes.ADD_REDUCER;
  payload?: null;
}

interface DeleteReducer {
  type: typeof actionTypes.DELETE_REDUCER;
  payload: number;
}

interface UpdateActionsFilePathActions {
  type: typeof actionTypes.UPDATE_ACTIONS_FILEPATH;
  payload: UpdateActionsFilePath;
}

interface UpdateTypesFilePathAction {
  type: typeof actionTypes.UPDATE_TYPES_FILEPATH;
  payload: UpdateTypesFilePath;
}

interface UpdateReducerFilePathAction {
  type: typeof actionTypes.UPDATE_REDUCERS_FILEPATH;
  payload: UpdateReducerFilePath;
}

interface UpdateMiddlewaresFilePathAction {
  type: typeof actionTypes.UPDATE_MIDDLEWARES_FILEPATH;
  payload: UpdateMiddlewaresFilePath;
}

interface CreateNewReduxTestAction {
  type: typeof actionTypes.CREATE_NEW_REDUX_TEST;
  payload?: null;
}

// interface OpenModalAction {
//   type: typeof actionTypes.OPEN_INFO_MODAL;
//   payload?: null;
// }

// interface CloseModalAction {
//   type: typeof actionTypes.CLOSE_INFO_MODAL;
//   payload?: null;
// }

// -------------Reducer Types--------------

export interface ReduxTestCaseState {
  reduxTestStatement: string;
  reduxStatements: Array<ReduxStatements>;
}
export interface UpdateMiddleware {
  id: number;
  eventType: string;
  eventValue: string;
  queryType: string;
  queryVariant: string;
  querySelector: string;
  queryValue: string;
  queryFunction: string;
  suggestions: string;
}

export interface UpdateActionCreator {
  id: number;
  actionsFileName: string;
  filePath: string;
  typesFileName: string;
  typesFilePath: string;
  actionCreatorFunc: string;
  actionType: string;
  payloadKey: string;
  payloadType: string;
}

export interface UpdateAsync {
  id: number;
  actionsFileName: string;
  filePath: string;
  typesFileName: string;
  typesFilePath: string;
  asyncFunction: string;
  method: string;
  route: string;
  requestBody: string;
  store: string;
  matcher: string;
  expectedResponse: string;
}

export interface UpdateReducer {
  id: number;
  reducerAction: string;
  itStatement: string;
  initialState: string;
  payloadKey: string;
  payloadValue: any;
  reducerName: string;
  typesFileName: string;
  typesFilePath: string;
  reducersFileName: string;
  reducersFilePath: string;
  expectedKey: string;
  expectedValue: string;
}

export interface UpdateActionsFilePath {
  actionsFileName: string;
  filePath: string;
}

export interface UpdateTypesFilePath {
  typesFileName: string;
  typesFilePath: string;
  type: string;
}

export interface UpdateReducerFilePath {
  reducersFileName: string;
  reducersFilePath: string;
}

export interface UpdateMiddlewaresFilePath {
  middlewaresFileName: string;
  middlewaresFilePath: string;
}

export interface ReduxTestModalProps {
  isReduxModalOpen: boolean;
  closeReduxModal: () => boolean | void;
}
interface Middleware {
  id?: number;
  type?: string;
  middlewaresFileName?: string;
  middlewaresFilePath?: string;
  queryType?: string;
  eventValue?: null | string;
  queryVariant?: string;
  querySelector?: string;
  queryValue?: string;
  queryFunction?: string;
  suggestions?: string;
}
interface ActionCreator {
  id?: number;
  actionsFileName?: string;
  filePath?: string;
  typesFileName?: string;
  typesFilePath?: string;
  type?: string;
  actionCreatorFunc?: string;
  actionType?: string;
  payloadKey?: null | string;
  payloadType?: null | string;
}
interface Async {
  id?: number;
  type?: string;
  actionsFileName?: string;
  filePath?: string;
  typesFileName?: string;
  typesFilePath?: string;
  asyncFunction?: string;
  method?: string;
  route?: string;
  requestBody?: string;
  store?: string;
  matcher?: string;
  expectedResponse?: string;
  actionsFile?: string;
}

interface Reducer {
  id?: number;
  type?: string;
  itStatement?: string;
  typesFileName?: string;
  typesFilePath?: string;
  reducersFileName?: string;
  reducersFilePath?: string;
  reducerAction?: string;
  initialState?: string;
  payloadKey?: string;
  payloadValue?: any;
  reducerName?: string;
  expectedValue?: string;
  expectedKey?: string;
}

// type interface shape for all redux test statments
export interface ReduxStatements extends Middleware, Reducer, ActionCreator, Async {}

// Combines all type interfaces for redux actions
export type ReduxActionTypes =
  | ToggleReduxAction
  | UpdateReduxTestStatementAction
  | UpdateMiddlewareAction
  | UpdateActionCreatorAction
  | UpdateAsyncAction
  | UpdateReducerAction
  | UpdateActionsFilePathAction
  | UpdateStatementsOrderAction
  | DeleteMiddlewareAction
  | AddMiddlewareAction
  | AddActionCreatorAction
  | DeleteActionCreatorAction
  | AddAsyncAction
  | DeleteAsyncAction
  | AddReducerAction
  | DeleteReducer
  | UpdateActionsFilePathActions
  | UpdateTypesFilePathAction
  | UpdateReducerFilePathAction
  | UpdateMiddlewaresFilePathAction
  | CreateNewReduxTestAction;
