import React, { createContext, useReducer } from 'react';
import {
  actionTypes,
  makeDeepCopyOfObject,
  traverseObject,
  updateObjectsKeyValuePairs,
} from '../actions/updatedFrontendFrameworkTestCaseActions';
import {
  ReactTestCaseTypes,
  Action,
  ItStatements,
  DescribeBlocks,
  Statements,
  Prop,
  StatementsById,
  ReactReducerAction,
} from '../../utils/updatedReactTypes';

// similar to globalReducer, but instead of dealing with global items, this is specific to React,
// this holds state for things like describe and it statements, basically what your React test looks like
export const initialReactTestFileState = {
  //below is the initial state of the reactTestFile State
  modalOpen: false,
  children: {
    /*
    describe1: {
      parentFilepath: '',
      filepath: 'describe1', //filepath is a string, which in the UI, will be treated like the id for a block
      objectType: 'describe',
      text: 'comment for Object',
      children: {
        //e.g. describe/setup/teardown/it blocks that are direct children of describe block
        k23on32230h23: {
          //a uuid, or unique value that can be generated and used as id upon the adding of a new UI block
          parentFilepath: 'describe1',
          filepath: 'describe1/k23on32230h23', //delimiter for levels deep represented by either a ',' or a'-'
          objectType: 'setupTeardown',
          text: 'comment for Object',
          children: {
            // since objectType is a 'setupTeardown', logically it's children will be things like 'beforeAll'
            ha23204802302: {
              parentFilepath: 'describe1/k23on32230h23',
              filepath: 'describe1/k23on32230h23/ha23204802302', //
              objectType: 'beforeAll', // object type key exists to with future "generateTestFile" functionality
              mockData: {
                key1: 'value1',
                key2: 'value2',
                key3: 'value3',
              },
            },
          },
        },
        a23lki3h23: {
          //a uuid, or unique value that can be generated and used as id upon the adding of a new UI block
          parentFilepath: 'describe1',
          filepath: 'describe1/a23lki3h23', //delimiter for levels deep represented by either a ',' or a'-'
          objectType: 'describe',
          text: 'comment for 2nd describe Object',
          children: {
            pa3onO22H0h2p: {
              parentFilepath: 'describe1/a23lki3h23',
              filepath: 'describe1/a23lki3h23/pa3onO22H0h2p', //
              objectType: 'test', // object type key exists to with future "generateTestFile" functionality
              text: 'Comment Related to Test File',
              children: {}, //include objects for info on created 'Acts', and 'Assertions'***order shown in UI matters.
            },
          },
        },
      },
    },*/
  },
};

/* ---------------------------- Helper Functions ---------------------------- */

const createDescribeBlock = (filepath: string, parentFilepath) => {
  return {
    filepath,
    parentFilepath,
    objectType: 'describe',
    text: '',
    children: {},
  };
};

const createTestBlock = (filepath, parentFilepath) => ({
  filepath,
  parentFilepath,
  objectType: 'test',
  text: '',
});
const createSetupTeardownBlock = () => {};
const createStatementBlock = () => {};

const createAction = (filepath, parentFilepath) => ({
  filepath,
  parentFilepath,
  objectType: 'statement',
  statementType: 'action',
  eventType: '',
  eventValue: null,
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  suggestions: [],
});

const createAssertion = (filepath, parentFilepath) => ({
  filepath,
  parentFilepath,
  objectType: 'statement',
  statementType: 'assertion',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  isNot: false,
  matcherType: '',
  matcherValue: '',
  suggestions: [],
});

const createRender = (filepath, parentFilepath) => ({
  filepath,
  parentFilepath,
  objectType: 'statement',
  statementType: 'render',
  props: [],
});

const createProp = (propId: string, filepath) => ({
  filepath,
  propKey: '',
  propValue: '',
});

/* ------------------------- React Test Case Reducer ------------------------ */
/* 
If you have reached this comment in search of trying to resolve type errors of passed in actions of dispatch
functions pointing at this reducer, I have looked at this for several hours and come to the conclusion that the
actions & cases will need to be somewhat (read: completely) rewritten in a more consistent way in order to
satisfy typescript. Unfortunately we are not able to achieve this in the time available to us. For inspiration,
I would encourage you to look at ./hooksTestCaseReducer, which seems to have a workable implementation that could 
be extended to the other reducers. I hope this comment can save you the hours of confusion I experienced when trying
to parse this code. Good luck!
*/
export const reactTestFileReducer = (state: ReactTestCaseTypes, action) => {
  Object.freeze(state);
  switch (action.type) {
    case actionTypes.ADD_OBJECT_TO_STATE_OBJECT: {
      const { objectType, addObjectToWhere, newObjectsKey } = action.payload;
      const deepCopyOfObject = makeDeepCopyOfObject(state);
      let targetObject = deepCopyOfObject;
      let parentFilepath = '';
      if (addObjectToWhere) {
        parentFilepath = addObjectToWhere + '/';
        targetObject = traverseObject(state, addObjectToWhere);
      }
      const newFilepath = parentFilepath + newObjectsKey;
      console.log('deepCopyOfObject', deepCopyOfObject);
      console.log('targetObject', targetObject);
      console.log('parentFilepath', parentFilepath);
      console.log('newObjectsKey', newObjectsKey);
      console.log('newFilepath', newFilepath);

      switch (objectType) {
        case 'describe': {
          console.log('enetered make describe block');
          targetObject.children[newObjectsKey] = createDescribeBlock(
            newFilepath,
            parentFilepath
          );
          return deepCopyOfObject;
        }
        case 'test': {
          console.log('enetered make test block');
          targetObject.children[newObjectsKey] = createTestBlock(
            parentFilepath + newObjectsKey,
            addObjectToWhere
          );
          return deepCopyOfObject;
        }
        case 'render': {
          targetObject.children[newObjectsKey] = createRender(
            newFilepath,
            addObjectToWhere
          );
          return deepCopyOfObject;
        }
        case 'action': {
          targetObject.children[newObjectsKey] = createAction(
            newFilepath,
            addObjectToWhere
          );
          return deepCopyOfObject;
        }
        case 'assertion': {
          targetObject.children[newObjectsKey] = createAssertion(
            newFilepath,
            addObjectToWhere
          );
          return deepCopyOfObject;
        }
        case 'props': {
          console.log('enetered make props block');
          targetObject.children[newObjectsKey] = createProp(
            newFilepath,
            addObjectToWhere
          );
          return deepCopyOfObject;
        }
      }

      return deepCopyOfObject;
    }
    case actionTypes.RESET_TESTS: {
      return state;
    }
    /*
      Just some code to confirm state object is treated as immutable, so new state object is needs to be returned

      state['describeId'] = ++updatedDescribeId;
      state['describeBlocks']['byId'][describeId] =
        createDescribeBlock(describeId);
      state['describeBlocks']['allIds'].push(describeId);
      state['itStatements']['allIds'][describeId] = [];
      return state;*/

    case actionTypes.UPDATE_OBJECT_IN_STATE_OBJECT: {
      const { filepathToObject, key, value } = action.payload;
      const deepCopyOfObject = makeDeepCopyOfObject(state);
      const objectToUpdate = traverseObject(state, filepathToObject);
      updateObjectsKeyValuePairs(objectToUpdate, { key: value });
    }
    case actionTypes.DELETE_OBJECT_FROM_STATE_OBJECT: {
      const { objectInStateToDelete } = action;
      const deepCopyOfObject = makeDeepCopyOfObject(state);
      const targetObject = traverseObject(
        state,
        objectInStateToDelete['parentsFilepath']
      );
      const parentFilePathsLength =
        objectInStateToDelete['parentsFilePath'].length;
      const thisObjectsKey = objectInStateToDelete['filepath'].slice(
        parentFilePathsLength + 1
      );
      delete targetObject[thisObjectsKey];
      return deepCopyOfObject;
    }

    case actionTypes.CREATE_NEW_TEST: {
      return {
        ...state,
        describeBlocks: {
          byId: {},
          allIds: [],
        },
        itStatements: {
          byId: {},
          allIds: {},
        },
        statements: {
          byId: {},
          allIds: [],
        },
      };
    }
    case actionTypes.OPEN_INFO_MODAL: {
      return {
        ...state,
        modalOpen: true,
      };
    }
    case actionTypes.CLOSE_INFO_MODAL: {
      return {
        ...state,
        modalOpen: false,
      };
    }
    case actionTypes.REPLACE_TEST: {
      return action.testState;
    }
    default:
      return state;
  }
};

//const rTFDispatch = () => null;
