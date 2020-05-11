import { createContext } from 'react';
import { actionTypes } from './reactTestCaseActions';

export const ReactTestCaseContext = createContext(null);

export const reactTestCaseState = {
  testStatement: '',
  // TODO: Make Boolean
  hasReact: 0,
  describeId: 2,
  itId: 2,
  statementId: 2,
  describeBlocks: {
    byId: {
      describe0: {
        id: 'describe0',
        text: '',
      },
      describe1: {
        id: 'describe1',
        text: '',
      },
    },
    allIds: ['describe0', 'describe1'],
  },
  itStatements: {
    byId: {
      it0: {
        id: 'it0',
        describeId: 'describe0',
        text: '',
      },
      it1: {
        id: 'it1',
        describeId: 'describe1',
        text: '',
      },
    },
    allIds: ['it0', 'it1'],
  },
  statements: {
    byId: {
      statement0: {
        id: 'statement0',
        itId: 'it0',
        describeId: 'describe0',
        type: 'render',
        componentName: '',
        filePath: '',
        props: [],
        hasProp: false,
      },
      statement1: {
        id: 'statement1',
        itId: 'it1',
        describeId: 'describe1',
        type: 'render',
        componentName: '',
        filePath: '',
        props: [],
        hasProp: false,
      },
    },
    allIds: ['statement0', 'statement1'],
    componentPath: '',
    componentName: ''
  },
};

// let statementId = 0;
let renderPropsId = 0;

/* ---------------------------- Helper Functions ---------------------------- */

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

// TODO
const createRenderProp = () => ({
  id: renderPropsId++,
  propKey: '',
  propValue: '',
});

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
      let updatedStatementId = state.statementId

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
          allIds: [...allIds]

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
      const byId = {...statements.byId}
      const  oldStatement = {...statements.byId[id]}
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
                ...newStatement
              }
            }
          }
        }
      };
    case actionTypes.ADD_ASSERTION: {
      const { describeId, itId } = action;
      const byIds = { ...statements.byId };
      const allIds = [...statements.allIds];
      const statementId = `statement${state.statementId}`;
      let updatedStatementId = state.statementId

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
        eventType,
        eventValue,
        queryVariant,
        querySelector,
        queryValue,
        isNot,
        matcherType,
        matcherValue,
        suggestions,
      } = action;
      const  oldStatement = {...statements.byId[id]}
      const byId = {...statements.byId}
      const newStatement = {
        ...oldStatement,
        eventType: eventType,
        eventValue: eventValue,
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
                ...newStatement
              }
            }
          }
        }
      };
    case actionTypes.ADD_RENDER: {
      const { describeId, itId } = action;
      const byIds = { ...statements.byId };
      const allIds = [...statements.allIds];
      const statementId = `statement${state.statementId}`;
      let updatedStatementId = state.statementId

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
          allIds: [...allIds]
        },
      };
    }
    case actionTypes.UPDATE_RENDER_COMPONENT: {
      const {
        componentName,
        filePath
      } = action;
      statements.componentName = componentName;
      statements.filePath = filePath;
      return {
        ...state,
        statements,
      };
    }
    case actionTypes.ADD_RENDER_PROP:
      // statements = statements.map((statement) => {
      //   if (statement.id === action.renderId) {
      //     statement.props.push(createRenderProp());
      //   }
      //   return statement;
      // });
      // return {
      //   ...state,
      //   statements,
      //   hasProp: !statements[0].hasProp,
      // };
      return {...state}
    case actionTypes.DELETE_RENDER_PROP:
      // statements = statements.map((statement) => {
      //   if (statement.id === action.renderId) {
      //     statement.props = statement.props.filter((prop) => prop.id !== action.propId);
      //   }
      //   return statement;
      // });
      // return {
      //   ...state,
      //   statements,
      // };
      return {...state}
    case actionTypes.UPDATE_RENDER_PROP:
      // statements = statements.map((statement) => {
      //   if (statement.id === action.renderId) {
      //     statement.props.map((prop) => {
      //       if (prop.id === action.propId) {
      //         prop.propKey = action.propKey;
      //         prop.propValue = action.propValue;
      //       }
      //       return prop;
      //     });
      //   }
      //   return statement;
      // });
      // return {
      //   ...state,
      //   statements,
      // };
      return {...state}

    case actionTypes.CREATE_NEW_TEST:
      // return {
      //   hasReact: 0,
      //   testStatement: '',
      //   statements: [
      //     {
      //       id: 0,
      //       type: 'render',
      //       componentName: '',
      //       filePath: '',
      //       props: [],
      //       hasProp: false,
      //     },
      //     {
      //       id: 1,
      //       type: 'assertion',
      //       queryVariant: '',
      //       querySelector: '',
      //       queryValue: '',
      //       isNot: false,
      //       matcherType: '',
      //       matcherValue: '',
      //       suggestions: [],
      //     },
      //   ],
      // };
      return {...state}
    default:
      return state;
  }
};
