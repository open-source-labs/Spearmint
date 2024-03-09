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
  filepath: 'root',
  children: {
    /*
      describe1: {
        key:'describe1',
        parentsFilepath: '',
        filepath: 'describe1', //filepath is a string, which in the UI, will be treated like the id for a block
        objectType: 'describe',
        comment: 'describe block for describe1',
        text: 'comment for Object',
        children: {
          //e.g. describe/setup/teardown/it blocks that are direct children of describe block
          k23on32230h23: {
            //a uuid, or unique value that can be generated and used as id upon the adding of a new UI block
            key: 'k23on32230h23',
            parentsFilepath: 'describe1',
            filepath: 'describe1/k23on32230h23', //delimiter for levels deep represented by either a ',' or a'-'
            objectType: 'setupTeardown',
            text: 'comment for Object',
            children: {
              // since objectType is a 'setupTeardown', logically it's children will be things like 'beforeAll'
              ha23204802302: {
                key: 'ha23204802302',
                parentsFilepath: 'describe1/k23on32230h23',
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
          Poree2230h23: {
            key: 'Poree2230h23',
            parentsFilepath: 'describe1',
            filePath: 'describe1/Poree2230h23',
            objectType: 'setupTeardown',
            children: {
              beforeAll: {},
              beforeEach: {},
              afterAll: {},
              afterEach: {},
            },
          },
          a23lki3h23: {
            key: 'a23lki3h23',
            //a uuid, or unique value that can be generated and used as id upon the adding of a new UI block
            parentsFilepath: 'describe1',
            filepath: 'describe1/a23lki3h23', //delimiter for levels deep represented by either a ',' or a'-'
            objectType: 'describe',
            text: 'comment for 2nd describe Object',
            children: {
              pa3onO22H0h2p: {
                key: 'pa3onO22H0h2p',
                parentsFilepath: 'describe1/a23lki3h23',
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

const createDescribeObject = (key, filepath: string, parentsFilepath) => {
  return {
    key,
    filepath,
    parentsFilepath,
    objectType: 'describe',
    comment: '',
    text: '',
    children: {},
  };
};

const createTestObject = (key, filepath, parentsFilepath) => ({
  key,
  filepath,
  parentsFilepath,
  objectType: 'test',
  comment: '',
  text: '',
  children: {},
});
const createStatementBlock = (key, filepath, parentsFilepath) => ({});

const createSetupTeardownObject = (key, filepath, parentsFilepath) => ({
  key,
  filepath,
  parentsFilepath,
  objectType: 'setupTeardown',
  children: {
    beforeAll: {},
    beforeEach: {},
    afterAll: {},
    afterEach: {},
  },
});

const createAction = (key, filepath, parentsFilepath) => ({
  key,
  filepath,
  parentsFilepath,
  objectType: 'statement',
  statementType: 'action',
  comment: '',
  eventType: '',
  eventValue: null,
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  suggestions: [],
});

const createAssertion = (key, filepath, parentsFilepath) => ({
  key,
  filepath,
  parentsFilepath,
  objectType: 'statement',
  statementType: 'assertion',
  comment: '',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  isNot: false,
  matcherType: '',
  matcherValue: '',
  suggestions: [],
});

const createRender = (key, filepath, parentsFilepath) => ({
  key,
  filepath,
  parentsFilepath,
  objectType: 'statement',
  statementType: 'render',
  comment: '',
  children: {}, //props
  //props: [],
});

const createProp = (key, filepath, parentsFilepath) => ({
  key,
  filepath,
  objectType: 'prop',
  parentsFilepath,
  comment: '',
  propKey: '',
  propValue: '',
});

const pickAndCreateObjectToAdd = (
  objectType,
  newObjectsKey,
  newObjectsFilepath,
  addObjectToWhere
) => {
  switch (objectType) {
    case 'describe': {
      return createDescribeObject(
        newObjectsKey,
        newObjectsFilepath,
        addObjectToWhere
      );
    }
    case 'test': {
      return createTestObject(
        newObjectsKey,
        newObjectsFilepath,
        addObjectToWhere
      );
    }
    case 'setupTeardown': {
      return createSetupTeardownObject(
        newObjectsKey,
        newObjectsFilepath,
        addObjectToWhere
      );
    }
    case 'render': {
      return createRender(newObjectsKey, newObjectsFilepath, addObjectToWhere);
    }
    case 'action': {
      return createAction(newObjectsKey, newObjectsFilepath, addObjectToWhere);
    }
    case 'assertion': {
      return createAssertion(
        newObjectsKey,
        newObjectsFilepath,
        addObjectToWhere
      );
    }
    case 'prop': {
      return createProp(newObjectsKey, newObjectsFilepath, addObjectToWhere);
    }
  }
};
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
  switch (action.type) {
    case actionTypes.ADD_OBJECT_TO_STATE_OBJECT: {
      const { objectType, addObjectToWhere, newObjectsKey } = action.payload;
      const deepCopyOfObject = makeDeepCopyOfObject(state);
      let targetObject = deepCopyOfObject;
      targetObject = traverseObject(deepCopyOfObject, addObjectToWhere);
      const newFilepath = addObjectToWhere
        ? `${addObjectToWhere}/${newObjectsKey}`
        : newObjectsKey;
      targetObject.children[newObjectsKey] = pickAndCreateObjectToAdd(
        objectType,
        newObjectsKey,
        newFilepath,
        addObjectToWhere
      );

      return deepCopyOfObject;
    }

    case actionTypes.UPDATE_OBJECT_IN_STATE_OBJECT: {
      const { filepathToObject, key, value } = action.payload;
      const deepCopyOfObject = makeDeepCopyOfObject(state);
      let objectToUpdate = traverseObject(deepCopyOfObject, filepathToObject);
      objectToUpdate[key] = value;
      return deepCopyOfObject;
    }
    case actionTypes.DELETE_OBJECT_FROM_STATE_OBJECT: {
      const { parentsFilepath, targetsKey } = action.payload;
      const deepCopyOfObject = makeDeepCopyOfObject(state);
      let objectToDeleteFrom = parentsFilepath
        ? traverseObject(deepCopyOfObject, parentsFilepath)
        : deepCopyOfObject;

      delete objectToDeleteFrom.children[targetsKey];
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
    case actionTypes.RESET_TESTS: {
      return state;
    }
    default:
      return state;
  }
};
