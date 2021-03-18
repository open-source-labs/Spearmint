import { createContext } from 'react';
import { actionTypes } from '../actions/reactTestCaseActions';

export const ReactTestCaseContext = createContext([]);

export const reactTestCaseState = {
  modalOpen: false,

  describeId: 1,
  itId: 1,
  statementId: 1,
  propId: 1,
  describeBlocks: {
    byId: {
      describe0: {
        id: 'describe0',
        text: '',
      },
    },
    allIds: ['describe0'],
  },
  itStatements: {
    byId: {
      it0: {
        id: 'it0',
        describeId: 'describe0',
        text: '',
      },
    },
    allIds: {
      describe0: ['it0'],
    },
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

/* ---------------------------- Helper Functions ---------------------------- */

const createDescribeBlock = (describeId) => {
  return {
    id: describeId,
    text: '',
  };
};

const createItStatement = (describeId, itId) => ({
  id: itId,
  describeId,
  text: '',
});

const createAction = (describeId, itId, statementId) => ({
  id: statementId,
  itId,
  describeId,
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
  itId,
  describeId,
  type: 'assertion',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  isNot: false,
  matcherType: '',
  matcherValue: '',
  suggestions: [],
});

const createRender = (describeId, itId, statementId) => ({
  id: statementId,
  itId,
  describeId,
  type: 'render',
  props: [],
});

const createProp = (propId, statementId) => ({
  id: propId,
  statementId,
  propKey: '',
  propValue: '',
});

const deleteChildren = (object, deletionId, lookup, it) => {
  let allIdCopy;
  if (it) {
    // delete everything appropriate in itStatements.byId object
    object.allIds[deletionId].forEach((id) => {
      delete object.byId[id];
    });
    // delete everything appropriate in itStatements.allIds object
    delete object.allIds[deletionId];
    allIdCopy = object.allIds;
  } else {
    // use .filter to delete from statements.allIds array
    allIdCopy = object.allIds.filter((id) => object.byId[id][lookup] !== deletionId);
    // delete from statements.byId object
    object.allIds.forEach((id) => {
      if (object.byId[id][lookup] === deletionId) {
        delete object.byId[id];
      }
    });
  }

  return allIdCopy;
};

/* ------------------------- React Test Case Reducer ------------------------ */

export const reactTestCaseReducer = (state, action) => {
  Object.freeze(state);

  let describeBlocks;
  let itStatements;
  let statements;

  if (state && action) {
    describeBlocks = { ...state.describeBlocks };
    itStatements = { ...state.itStatements };
    statements = { ...state.statements };
  }

  switch (action.type) {
    case actionTypes.ADD_DESCRIBE_BLOCK: {
      let updatedDescribeId = state.describeId;
      const describeId = `describe${state.describeId}`;

      return {
        ...state,
        describeId: ++updatedDescribeId,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...describeBlocks.byId,
            [describeId]: createDescribeBlock(describeId),
          },
          allIds: [...(describeBlocks.allIds || []), describeId],
        },
        itStatements: {
          ...itStatements,
          allIds: {
            ...itStatements.allIds,
            [describeId]: [],
          },
        },
      };
    }
    case actionTypes.DELETE_DESCRIBE_BLOCK: {
      const { describeId } = action;
      const byId = { ...describeBlocks.byId };
      delete byId[describeId];
      const allIds = describeBlocks.allIds.filter((id) => id !== describeId);

      const itStatementAllIds = deleteChildren(itStatements, describeId, 'describeId', 'it');
      const statementAllIds = deleteChildren(statements, describeId, 'describeId');

      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...byId,
          },
          allIds: [...allIds],
        },
        itStatements: {
          ...itStatements,
          byId: {
            ...itStatements.byId,
          },
          allIds: itStatementAllIds,
        },
        statements: {
          ...statements,
          byId: {
            ...statements.byId,
          },
          allIds: [...statementAllIds],
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
              text,
            },
          },
        },
      };
    }
    case actionTypes.UPDATE_DESCRIBE_ORDER: {
      const { reorderedDescribe } = action;
      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          allIds: reorderedDescribe,
        },
      };
    }

    case actionTypes.ADD_ITSTATEMENT: {
      const { describeId } = action;
      const itId = `it${state.itId}`;
      let updatedItId = state.itId;

      return {
        ...state,
        itId: ++updatedItId,
        itStatements: {
          ...itStatements,
          byId: {
            ...itStatements.byId,
            [itId]: createItStatement(describeId, itId),
          },
          allIds: {
            ...itStatements.allIds,
            [describeId]: [...itStatements.allIds[describeId], itId],
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
              text,
            },
          },
        },
      };
    }
    case actionTypes.DELETE_ITSTATEMENT: {
      const { itId } = action;
      const { describeId } = itStatements.byId[itId];
      const byId = { ...itStatements.byId };
      delete byId[itId];
      const allIds = itStatements.allIds[describeId].filter((id) => id !== itId);
      const statementAllIds = deleteChildren(statements, itId, 'itId');

      return {
        ...state,
        itStatements: {
          ...itStatements,
          byId: {
            ...byId,
          },
          allIds: {
            ...itStatements.allIds,
            [describeId]: [...allIds],
          },
        },
        statements: {
          ...statements,
          byId: {
            ...statements.byId,
          },
          allIds: [...statementAllIds],
        },
      };
    }
    case actionTypes.UPDATE_ITSTATEMENT_ORDER: {
      const { reorderedIt, describeId } = action;
      return {
        ...state,
        itStatements: {
          ...itStatements,
          allIds: {
            ...itStatements.allIds,
            [describeId]: reorderedIt,
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
        eventType,
        eventValue,
        queryVariant,
        querySelector,
        queryValue,
        suggestions,
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
        queryVariant,
        querySelector,
        queryValue,
        isNot,
        matcherType,
        matcherValue,
        suggestions,
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
      const { byId } = statements;
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
              props,
            },
          },
        },
      };
    }
    case actionTypes.UPDATE_PROP: {
      const { id, statementId, propKey, propValue } = action;
      const updatedProps = [...statements.byId[statementId].props];

      updatedProps.forEach((prop) => {
        if (prop.id === id) {
          prop.propKey = propKey;
          prop.propValue = propValue;
        }
      });

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
    default:
      return state;
  }
};
