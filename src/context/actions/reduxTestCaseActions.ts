import { 
  ReduxActionTypes,
  actionTypes,
  UpdateMiddleware,
  UpdateActionCreator,
  UpdateAsync,
  UpdateReducer,
  ReduxStatements,

} from '../reduxTypes/reduxTypes';

export const toggleRedux = (): ReduxActionTypes => ({
  type: actionTypes.TOGGLE_REDUX,
});
export const updateReduxTestStatement = (reduxTestStatement: string): ReduxActionTypes => ({
  type: actionTypes.UPDATE_REDUX_TEST_STATEMENT,
  payload: reduxTestStatement,
});
export const addMiddleware = (): ReduxActionTypes => ({
  type: actionTypes.ADD_MIDDLEWARE,
});
export const deleteMiddleware = (id: number): ReduxActionTypes => ({
  type: actionTypes.DELETE_MIDDLEWARE,
  payload: id,
});
export const updateMiddleware = (updateMiddleware: UpdateMiddleware): ReduxActionTypes => ({
  type: actionTypes.UPDATE_MIDDLEWARE,
  payload: updateMiddleware,
});
export const addActionCreator = (): ReduxActionTypes => ({
  type: actionTypes.ADD_ACTIONCREATOR,
});
export const deleteActionCreator = (id: number): ReduxActionTypes => ({
  type: actionTypes.DELETE_ACTIONCREATOR,
  payload: id,
});
export const updateActionCreator = (updatedActionCreator: UpdateActionCreator): ReduxActionTypes => ({
  type: actionTypes.UPDATE_ACTIONCREATOR,
  payload: updatedActionCreator,
});
export const addAsync = (): ReduxActionTypes => ({
  type: actionTypes.ADD_ASYNC,
});
export const deleteAsync = (id: number): ReduxActionTypes => ({
  type: actionTypes.DELETE_ASYNC,
  payload: id,
});
export const updateAsync = (updatedAsync: UpdateAsync): ReduxActionTypes => ({
  type: actionTypes.UPDATE_ASYNC,
  payload: updatedAsync,
});
export const addReducer = (): ReduxActionTypes => ({
  type: actionTypes.ADD_REDUCER,
});
export const deleteReducer = (id: number): ReduxActionTypes => ({
  type: actionTypes.DELETE_REDUCER,
  payload: id,
});
export const updateReducer = (updatedReducer: UpdateReducer): ReduxActionTypes => ({
  type: actionTypes.UPDATE_REDUCER,
  payload: updatedReducer,
});
export const updateActionsFilePath = (actionsFileName: string, filePath: string, id: number): ReduxActionTypes => ({
  type: actionTypes.UPDATE_ACTIONS_FILEPATH,
  payload: {
    actionsFileName,
    filePath,
    id,
  }
});
export const updateTypesFilePath = (typesFileName: string, typesFilePath: string, id: number): ReduxActionTypes => ({
  type: actionTypes.UPDATE_TYPES_FILEPATH,
  payload: {
    typesFileName,
    typesFilePath,
    id,
  }
});
export const updateReducersFilePath = (reducersFileName: string, reducersFilePath: string): ReduxActionTypes => ({
  type: actionTypes.UPDATE_REDUCERS_FILEPATH,
  payload: {
    reducersFileName,
    reducersFilePath,
  }
});
export const updateMiddlewaresFilePath = (middlewaresFileName: string, middlewaresFilePath: string): ReduxActionTypes => ({
  type: actionTypes.UPDATE_MIDDLEWARES_FILEPATH,
  payload: {
    middlewaresFileName,
    middlewaresFilePath,
  }
});
export const createNewReduxTest = (): ReduxActionTypes => ({
  type: actionTypes.CREATE_NEW_REDUX_TEST,
});
export const updateStatementsOrder = (draggableStatements: any[]) => {
  console.log('action', draggableStatements)
  return {
  type: actionTypes.UPDATE_STATEMENTS_ORDER,
  payload: draggableStatements,
}};
  