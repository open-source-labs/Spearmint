// mimicking reactTestCaseReducer.ts but slimmed down for MVP (simple login)

import { createContext } from 'react';
import { actionTypes } from '../actions/frontendFrameworkTestCaseActions';
import { CypressReactTestCaseTypes, ReactReducerAction } from '../../utils/reactTestCase/cypress';


//*****! INITIAL EMPTY REACT STATE !*******//
export const initialCypressReactTestCaseState: CypressReactTestCaseTypes = {
  modalOpen: false,
  describeId: 1,
  itId: 1,
  statementId: 1,
  propId: 1,

  describeBlock: {
    byId: {  // byId will order the describe blocks
      describe0: { id: 'describe0', text: '' }, // text -> initial test lable
    },
    allIds: ['describe0'],
  },
  itStatements: {
    byId: {
      it0: { id: 'it0', describeId: 'describe0', text: '' },
    },
    allIds: { describe0: ['it0'] },
  },
  statements: {
    byId: {
      statement0: {
        id: 'statement0',
        itId: 'it0',
        describeId: 'describe0',
        type: 'render',
        props: [],
      },
    },
    allIds: ['statement0'],
    componentPath: '',
    componentName: '',
  },
};



// Handle all actions related to building a Cypress React test

// Store and update:
// describeBlocks
// itStatements
// statements (render, assertion, optional actions)

export const cypressReactTestCaseReducer = (
  state: CypressReactTestCaseTypes, // initail state
  action: ReactReducerAction // dispatched action
): CypressReactTestCaseTypes => {
  const describeBlock = { ...state.describeBlock };
  const itStatements = { ...state.itStatements };
  const statements = { ...state.statements };

  switch (action.type) {
    case actionTypes.ADD_DESCRIBE_BLOCK: { // Creates a new describe block using state.describeId
      const newId = `describe${state.describeId}`; // 'describe0' initial id
      return {
        ...state, // return new state with updated describe
        describeId: state.describeId + 1, // increment describeId
        describeBlock: {
          byId: {
            ...describeBlock.byId, // spreads all describe blocks 'describe0', 'describe1','describe2'...
            [newId]: { id: newId, text: '' },// new describe block with incremented id, 'describe1'
          },
          allIds: [...describeBlock.allIds, newId], // add newest describe block to pool
        },
        itStatements: { // keep everything else the same, keep itStatments from pool
          ...itStatements,
          allIds: {
            ...itStatements.allIds,
            [newId]: [], // new descibe block starts with no itStatment
          },
        },
      };
    }

    case actionTypes.ADD_ITSTATEMENT: { // could be 'describe1' 
      const { describeId } = action; // object destructuring taking describeId from ReactReducerAction type
      const newItId = `it${state.itId}`; // it1 initial id
      return {
        ...state,
        itId: state.itId + 1, // incrementing to 'it2'
        itStatements: {
          byId: {
            ...itStatements.byId, // spreads previous it statement pool
            [newItId]: { id: newItId, describeId, text: '' }, // so we know what describeBlock this itstatment is atatched to 
          },
          allIds: { // allIds is a map of describe block IDs pointing to arrays of it statement IDs
            ...itStatements.allIds, // spread pool of it statment ids
            [describeId]: [...itStatements.allIds[describeId], newItId], // describe1: ['it0', 'it1'], describe2: ['it2',]
          },
        },
      };
    }

    case actionTypes.ADD_RENDER: {
      const { describeId, itId } = action;
      const newStatementId = `statement${state.statementId}`;
      return {
        ...state,
        statementId: state.statementId + 1,
        statements: {
          ...statements,
          byId: {
            ...statements.byId,
            [newStatementId]: {
              id: newStatementId,
              describeId,
              itId,
              type: 'render',
              props: [],
            },
          },
          allIds: [...statements.allIds, newStatementId],
        },
      };
    }

    case actionTypes.UPDATE_RENDER_COMPONENT: {
      const { componentName, filePath } = action;
      return {
        ...state,
        statements: {
          ...statements,
          componentName,
          componentPath: filePath,
        },
      };
    }

    case actionTypes.ADD_ASSERTION: {
      const { describeId, itId } = action;
      const newStatementId = `statement${state.statementId}`;
      return {
        ...state,
        statementId: state.statementId + 1,
        statements: {
          ...statements,
          byId: {
            ...statements.byId,
            [newStatementId]: {
              id: newStatementId,
              describeId,
              itId,
              type: 'assertion',
              querySelector: '',
              queryValue: '',
              matcherType: '',
              matcherValue: '',
            },
          },
          allIds: [...statements.allIds, newStatementId],
        },
      };
    }

    default:
      return state; // if the action type doesn’t match any known, return state unchanged
  }
};


// dummy function to satisfy the type requirement of the context before it's actually used.
// We don’t know the real dispatch function yet, but we'll plug it in later when the context is used inside a real component.
const dispatchToCypressReactTestCase = () => null;

//
const cypressReactTestCaseArr: [CypressReactTestCaseTypes, (action: ReactReducerAction) => void] = [
  initialCypressReactTestCaseState, // initail state
  dispatchToCypressReactTestCase, // invoke dummy function
];
// using reacts createContext, which will be used to do 2 things
// components can use it to get current Cypress React test case state
// and to dispatch function to update that state
export const CypressReactTestCaseContext = createContext(cypressReactTestCaseArr);


//note: to use useReducer, React’s API reverses the order of arguments!
// const [state, dispatch] = useReducer(reducerFunction, initialState);
