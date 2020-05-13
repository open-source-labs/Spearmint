import { createContext } from 'react';
import { actionTypes } from './reactTestCaseActions';

export const ReactTestCaseContext = createContext(null);

export const reactTestCaseState = {
  // TODO: Make Boolean
  hasReact: 0,
  describeId: 2,
  itId: 2,
  statementId: 2,
  propId: 1,
  describeBlocks: {
    byId: {
      describe0: {
        id: 'describe0',
        text: 'this is describe block 0',
      },
      describe1: {
        id: 'describe1',
        text: 'this is describe block 1',
      },
    },
    allIds: ['describe0', 'describe1'],
  },
  itStatements: {
    byId: {
      it0: {
        id: 'it0',
        describeId: 'describe0',
        text: 'This is itStatement 0',
      },
      it1: {
        id: 'it1',
        describeId: 'describe1',
        text: 'This is itStatement 1',
      },
    },
    allIds: ['it0', 'it1'],
  },
  statements: {
    byId: {
     
      // statement0: {
      //   id: 'statement0',
      //   itId: 'it0',
      //   describeId: 'describe0',
      //   type: 'render',
      //   componentName: '',
      //   filePath: '',
      //   props: [
      //     {
      //       id: 0,
      //       propKey: 'PROP KEY!',
      //       propValue: 'PROP VALUE!',
      //     },
      //   ],
      //   hasProp: false,
      // },
      // statement1: {
      //   id: 'statement1',
      //   itId: 'it1',
      //   describeId: 'describe1',
      //   type: 'render',
      //   componentName: '',
      //   filePath: '',
      //   props: [],
      //   hasProp: false,
      // },
      statement0: {
        id: 'statement0',
        itId: 'it0',
        describeId: 'describe0',
        type: 'action',
        eventType: 'submit',
        eventValue: 'click',
        queryVariant: 'getBy',
        querySelector: 'LabelText',
        queryValue: 'hello',
        suggestions: []
      },
      statement1: {
        id: 'statement1',
        itId: 'it1',
        describeId: 'describe1',
        type: 'assertion',
        queryVariant: 'getBy',
        querySelector: 'Role',
        queryValue: 'hello1',
        isNot: false,
        matcherType: 'toHaveTextValue',
        matcherValue: 'texter',
        suggestions: [],
      },
    },
    allIds: ['statement0', 'statement1'],
    componentPath: '',
    componentName: '',
  },
};

/* ---------------------------- Helper Functions ---------------------------- */

const createDescribeBlock = (describeId) => {
  return {
    id: describeId,
    text: ''
  }
}

const createItStatement = (describeId, itId) => ({
  id: itId,
  describeId: describeId,
  text: ''
})

const createAction = (describeId, itId, statementId) => ({
  id: statementId,
  itId: itId,
  describeId: describeId,
  type: 'action',
  eventType: '',
  eventValue: null,
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  suggestions: [],
});

const createAssertion = (describeId, itId, statementId) => ({
  id: statementId,
  itId: itId,
  describeId: describeId,
  type: 'assertion',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  isNot: false,
  matcherType: '',
  matcherValue: '',
  suggestions: [],
});

const createRender = (describeId, itId, statementId, componentName, filePath) => ({
  id: statementId,
  itId: itId,
  describeId: describeId,
  type: 'render',
  componentName,
  filePath,
  props: [],
});

const createProp = (propId, statementId) => ({
  id: propId,
  statementId: statementId,
  propKey: '',
  propValue: '',
});

const deleteChildren = (object, deletionId, lookup) => {

  const allIdCopy = object.allIds.filter((id) => object.byId[id][lookup] !== deletionId);

  object.allIds.forEach((id) => {
    if (object.byId[id][lookup] === deletionId) {
      delete object.byId[id];
    }
  });

  return allIdCopy;
};

/* ------------------------- React Test Case Reducer ------------------------ */

export const reactTestCaseReducer = (state, action) => {
  Object.freeze(state);

  let describeBlocks = { ...state.describeBlocks };
  let itStatements = { ...state.itStatements };
  let statements = { ...state.statements };

  switch (action.type) {
    case actionTypes.TOGGLE_REACT: {
      return {
        ...state,
        hasReact: state.hasReact + 1,
      };
    }
    case actionTypes.UPDATE_STATEMENTS_ORDER: {
      // TODO
      return {
        ...state,
      };
    }
    case actionTypes.ADD_DESCRIBE_BLOCK: {
      let updatedDescribeId = state.describeId
      const describeId = `describe${state.describeId}`

      return {
        ...state,
        describeId: ++updatedDescribeId,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...describeBlocks.byId,
            [describeId]: createDescribeBlock(describeId)  
          },
          allIds: [...describeBlocks.allIds, describeId]
        }
      };
    }

    case actionTypes.DELETE_DESCRIBE_BLOCK: {
      console.log('reducer called')
      const {describeId} = action;
      const byId = {...describeBlocks.byId};
      delete byId[describeId]
      const allIds = describeBlocks.allIds.filter(id => id !== describeId)

      const itStatementAllIds = deleteChildren(itStatements, describeId, 'describeId')
      const statementAllIds = deleteChildren(statements, describeId, 'describeId')

      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...byId
          },
          allIds: [...allIds]
        },
        itStatements: {
          byId: {
            ...itStatements.byId
          },
          allIds: [...itStatementAllIds]
        },
        statements: {
          byId: {
            ...statements.byId
          },
          allIds: [...statementAllIds]
        },
      };
    }

    case actionTypes.ADD_ITSTATEMENT: {
      const { describeId } = action
      const itId = `it${state.itId}`
       let updatedItId = state.itId
     

      return {
        ...state,
        itId: ++updatedItId,
        itStatements: {
          ...itStatements,
          byId: {
            ...itStatements.byId,
            [itId]: createItStatement(describeId, itId)
          },
          allIds: [...itStatements.allIds, itId]
        }
      };
    }
    case actionTypes.DELETE_ITSTATEMENT: {
      const {itId} = action;
      const byId = {...itStatements.byId};
      delete byId[itId]
      const allIds = itStatements.allIds.filter(id => id !== itId)
      const statementAllIds = deleteChildren(statements, itId, 'itId')


      return {
        ...state,
        itStatements: {
          ...itStatements,
          byId: {
            ...byId
          },
          allIds: [...allIds]
        },
        statements: {
          byId: {
            ...statements.byId
          },
          allIds: [...statementAllIds]
        },
      };
    }
    case actionTypes.UPDATE_DESCRIBE_TEXT: {
      const { describeId, text } = action;
      const byIds = { ...describeBlocks.byId };
      const block = { ...describeBlocks.byId[describeId] };
      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...byIds,
            [describeId]: {
              ...block,
              text: text,
            },
          },
        },
      };
    }
    case actionTypes.UPDATE_ITSTATEMENT_TEXT: {
      const { itId, text } = action;
      const byIds = { ...itStatements.byId };
      const block = { ...itStatements.byId[itId] };
      return {
        ...state,
        itStatements: {
          ...itStatements,
          byId: {
            ...byIds,
            [itId]: {
              ...block,
              text: text,
            },
          },
        },
      };
    }
    case actionTypes.ADD_ACTION: {
      const { describeId, itId } = action;
      const byIds = { ...statements.byId };
      const allIds = [...statements.allIds];
      const statementId = `statement${state.statementId}`;
      let updatedStatementId = state.statementId;

      return {
        ...state,
        statementId: ++updatedStatementId,
        statements: {
          ...statements,
          byId: {
            ...byIds,
            [statementId]: createAction(describeId, itId, statementId),
          },
          allIds: [...allIds, statementId],
        },
      };
    }
    case actionTypes.DELETE_ACTION: {
      const { statementId } = action;
      const byId = { ...statements.byId };
      delete byId[statementId];
      const allIds = [...statements.allIds].filter((statement) => statement !== statementId);
      return {
        ...state,
        statements: {
          ...statements,
          byId: {
            ...byId,
          },
          allIds: [...allIds],
        },
      };
    }
    case actionTypes.UPDATE_ACTION: {
      const {
        id,
        eventType,
        eventValue,
        queryVariant,
        querySelector,
        queryValue,
        suggestions,
      } = action;
      const byId = { ...statements.byId };
      const oldStatement = { ...statements.byId[id] };
      const newStatement = {
        ...oldStatement,
        eventType: eventType,
        eventValue: eventValue,
        queryVariant: queryVariant,
        querySelector: querySelector,
        queryValue: queryValue,
        suggestions: suggestions,
      };
      return {
        ...state,
        statements: {
          ...statements,
          byId: {
            ...byId,
            [id]: {
              ...newStatement,
            },
          },
        },
      };
    }
    case actionTypes.ADD_ASSERTION: {
      const { describeId, itId } = action;
      const byIds = { ...statements.byId };
      const allIds = [...statements.allIds];
      const statementId = `statement${state.statementId}`;
      let updatedStatementId = state.statementId;

      return {
        ...state,
        statementId: ++updatedStatementId,
        statements: {
          ...statements,
          byId: {
            ...byIds,
            [statementId]: createAssertion(describeId, itId, statementId),
          },
          allIds: [...allIds, statementId],
        },
      };
    }
    case actionTypes.DELETE_ASSERTION: {
      const { statementId } = action;
      const byId = { ...statements.byId };
      delete byId[statementId];
      const allIds = [...statements.allIds].filter((statement) => statement !== statementId);
      return {
        ...state,
        statements: {
          ...statements,
          byId: {
            ...byId,
          },
          allIds: [...allIds],
        },
      };
    }
    case actionTypes.UPDATE_ASSERTION: {
      const {
        id,
        queryVariant,
        querySelector,
        queryValue,
        isNot,
        matcherType,
        matcherValue,
        suggestions,
      } = action;
      const oldStatement = { ...statements.byId[id] };
      const byId = { ...statements.byId };
      const newStatement = {
        ...oldStatement,
        queryVariant: queryVariant,
        querySelector: querySelector,
        queryValue: queryValue,
        isNot: isNot,
        matcherType: matcherType,
        matcherValue: matcherValue,
        suggestions: suggestions,
      };
      return {
        ...state,
        statements: {
          ...statements,
          byId: {
            ...byId,
            [id]: {
              ...newStatement,
            },
          },
        },
      };
    }
    case actionTypes.ADD_RENDER: {
      const { describeId, itId } = action;
      const byIds = { ...statements.byId };
      const allIds = [...statements.allIds];
      const statementId = `statement${state.statementId}`;
      let updatedStatementId = state.statementId;

      return {
        ...state,
        statementId: ++updatedStatementId,
        statements: {
          ...statements,
          byId: {
            ...byIds,
            [statementId]: createRender(describeId, itId, statementId),
          },
          allIds: [...allIds, statementId],
        },
      };
    }
    case actionTypes.DELETE_RENDER: {
      const { statementId } = action;
      const byId = { ...statements.byId };
      delete byId[statementId];
      const allIds = [...statements.allIds].filter((statement) => statement !== statementId);
      return {
        ...state,
        statements: {
          ...statements,
          byId: {
            ...byId,
          },
          allIds: [...allIds],
        },
      };
    }
    case actionTypes.UPDATE_RENDER_COMPONENT: {
      const { componentName, filePath } = action;
      statements.componentName = componentName;
      statements.componentPath = filePath;
      return {
        ...state,
        statements,
      };
    }
    case actionTypes.ADD_PROP: {
      const { statementId } = action;
      const propId = `prop${state.propId}`;
      const byId = statements.byId;
      let updatedPropId = state.propId;

      return {
        ...state,
        propId: ++updatedPropId,
        statements: {
          ...statements,
          byId: {
            ...byId,
            [statementId]: {
              ...statements.byId[statementId],
              props: [...statements.byId[statementId].props, createProp(propId, statementId)],
              hasProp: true,
            },
          },
        },
      };
    }
    case actionTypes.DELETE_PROP: {
      const { id, statementId } = action;
      const props = statements.byId[statementId].props.filter((prop) => prop.id !== id);
      return {
        ...state,
        statements: {
          ...statements,
          byId: {
            ...statements.byId,
            [statementId]: {
              ...statements.byId[statementId],
              props: props,
            },
          },
        },
      };
    }
    case actionTypes.UPDATE_PROP: {
      const { id, statementId, propKey, propValue } = action;
      console.log(statementId);
      const updatedProps = [...statements.byId[statementId].props]
      
      updatedProps.forEach(prop => {
        if(prop.id === id) {
          prop.propKey = propKey
          prop.propValue = propValue
        }
      })

      return {
        ...state,
        statements: {
          ...statements,
          byId: {
            ...statements.byId,
            [statementId]: {
              ...statements.byId[statementId],
              props: updatedProps,
            },
          },
        },
      };
    }

    case actionTypes.CREATE_NEW_TEST: {
      return {
        ...state,
        describeBlocks: {
          byId: {},
          allIds: []
        },
        itStatements: {
          byId: {},
          allIds: []
        },
        statements: {
          byId: {},
          allIds: []
        },
        hasReact: 0
      };
    }
    default:
      return state;
  }
};

