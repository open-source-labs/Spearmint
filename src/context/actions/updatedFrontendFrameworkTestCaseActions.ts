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

  ADD_ACTION: 'ADD_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
  UPDATE_ACTION: 'UPDATE_ACTION',

  ADD_ASSERTION: 'ADD_ASSERTION',
  DELETE_ASSERTION: 'DELETE_ASSERTION',
  UPDATE_ASSERTION: 'UPDATE_ASSERTION',

  ADD_RENDER: 'ADD_RENDER',
  DELETE_RENDER: 'DELETE_RENDER',
  UPDATE_RENDER_COMPONENT: 'UPDATE_RENDER_COMPONENT',

  ADD_PROP: 'ADD_PROP',
  DELETE_PROP: 'DELETE_PROP',
  UPDATE_PROP: 'UPDATE_PROP',

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

export function makeDeepCopyOfObject(objectToCopy) {
  if (typeof objectToCopy !== 'object') return objectToCopy; // return element if not an object
  let deepCopy;
  //logic for deep copy for copying contents of Arrays vs Objects
  if (Array.isArray(objectToCopy)) {
    deepCopy = objectToCopy.map((element) => {
      if (typeof element === 'object') return makeDeepCopyOfObject(element);
      else return element;
    });
  } else {
    //handle an object that's not an array
    deepCopy = {};
    for (const key in objectToCopy) {
      if (typeof objectToCopy[key] === 'object')
        deepCopy[key] = makeDeepCopyOfObject(objectToCopy[key]);
      else deepCopy[key] = objectToCopy[key];
    }
  }
  return deepCopy;
}

export function traverseObject(objectToTraverse, filePath) {
  if (!filePath) return objectToTraverse; //currently, a filepath will only not exist if you're starting at top level state object
  const filePathFolders = filePath.split('/'); //The delimiter is removed and the keys that lead to your target object in the state are stored in array indexes, order kept
  let curObject = objectToTraverse; //let's us track how deep we've looked following path
  filePathFolders.forEach((folderToEnter) => {
    curObject = curObject.children[folderToEnter];
  }); //needs to be curObject.children bc every objects child blocks are found in that children property
  return curObject; //return the object we're targeting
}

export function updateObjectsKeyValuePairs(objectToUpdate, keyValuePairs) {
  for (let key in keyValuePairs) {
    objectToUpdate[key] = keyValuePairs[key];
  }
}

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
