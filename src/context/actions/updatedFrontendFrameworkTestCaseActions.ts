// Actions for all front end frameworks, React, Solid, Svelete, and Vue can all use this because they
// function the same

/* ------------------------------ Action Types ------------------------------ */

import {
  UpdateActionProps,
  UpdateAssertionProps,
} from '../../utils/updatedReactTypes';

export const actionTypes = {
  ADD_OBJECT_TO_STATE_OBJECT: 'ADD_OBJECT_TO_STATE_OBJECT', //added by Cider. For Updated React Test FIle Tool
  UPDATE_OBJECT_IN_STATE_OBJECT: 'UPDATE_OBJECT_IN_STATE_OBJECT',
  DELETE_OBJECT_FROM_STATE_OBJECT: 'DELETE_OBJECT_FROM_STATE_OBJECT', //added by Cider. For Updated React Test FIle Tool

  UPDATE_DESCRIBE_ORDER: 'UPDATE_DESCRIBE_ORDER',

  UPDATE_ITSTATEMENT_ORDER: 'UPDATE_ITSTATEMENT_ORDER',

  CREATE_NEW_TEST: 'CREATE_NEW_TEST',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
  REPLACE_TEST: 'REPLACE_TEST',
  RESET_TESTS: 'RESET_TESTS',
};

/* --------------------------------- Actions -------------------------------- */

export const updateDescribeOrder = (reorderedDescribe: string[]) => ({
  type: actionTypes.UPDATE_DESCRIBE_ORDER,
  reorderedDescribe,
});

// not being imported anywhere?

export const updateItStatementOrder = (
  reorderedIt: string[],
  describeId: string
) => ({
  type: actionTypes.UPDATE_ITSTATEMENT_ORDER,
  reorderedIt,
  describeId,
});

export const createNewTest = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});

export const openInfoModal = () => {
  return { type: actionTypes.OPEN_INFO_MODAL };
};

export const closeInfoModal = () => {
  return { type: actionTypes.CLOSE_INFO_MODAL };
};

// -------- NOT IMPORTED IN ANY FILES ---------------
// export const reactReplaceTest = (testState) => ({
//   type: actionTypes.REPLACE_TEST,
//   testState,
// });

// export const svelteReplaceTest = (testState) => ({
//   type: actionTypes.REPLACE_TEST,
//   testState,
// });

// export const vueReplaceTest = (testState) => ({
//   type: actionTypes.REPLACE_TEST,
//   testState,
// });

export const resetTests = () => ({
  type: actionTypes.RESET_TESTS,
});

export function addObjectToStateObject(
  objectType,
  addObjectToWhere, //filepath for its parent object in state
  newObjectsKey
) {
  return {
    type: actionTypes.ADD_OBJECT_TO_STATE_OBJECT,
    payload: { objectType, addObjectToWhere, newObjectsKey },
  };
}

export function updateObjectInStateObject(
  filepathToObject,
  key, //filepath for its parent object in state
  value
) {
  return {
    type: actionTypes.UPDATE_OBJECT_IN_STATE_OBJECT,
    payload: { filepathToObject, key, value },
  };
}

export function deleteObjectFromStateObject(parentsFilepath, targetsKey) {
  return {
    type: actionTypes.DELETE_OBJECT_FROM_STATE_OBJECT,
    payload: { parentsFilepath, targetsKey },
  };
}
