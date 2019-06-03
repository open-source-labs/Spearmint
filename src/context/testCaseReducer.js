import { createContext } from 'react';
import { actionTypes } from './testCaseActions';

export const TestCaseContext = createContext(null);

export const testCaseState = {
  testStatement: '',
  statements: [],
  hasRerender: false,
};

let statementId = 0;
let renderPropsId = 0;

const createAction = () => ({
  id: statementId++,
  type: 'action',
  event: {
    type: '',
    value: null,
  },
  queryVariant: '',
  querySelector: '',
  queryValue: '',
});

const createAssertion = () => ({
  id: statementId++,
  type: 'assertion',
  queryVariant: '',
  querySelector: '',
  assertionValue: '',
  matcher: '',
  matcherValue: '',
});

const createRender = (isRerender) => ({
  id: statementId++,
  type: 'render',
  isRerender,
  componentName: '',
  filePath: '',
  props: [],
});

const createRenderProp = () => ({
  id: renderPropsId++,
  propKey: '',
  propValue: '',
});

export const testCaseReducer = (state, action) => {
  Object.freeze(state);
  let statements = state.statements;

  switch (action.type) {
    case actionTypes.UPDATE_TEST_STATEMENT:
      let testStatement = action.testStatement;
      return {
        ...state,
        testStatement,
      };
    case actionTypes.ADD_ACTION:
      statements.push(createAction());
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ACTION:
      statements = statements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ACTION:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.event.type = action.eventType;
          statement.event.value = action.eventValue;
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_ASSERTION:
      statements.push(createAssertion());
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ASSERTION:
      statements = statements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ASSERTION:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.assertionValue = action.assertionValue;
          statement.matcher = action.matcher;
          statement.matcherValue = action.matcherValue;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_RENDER:
      statements.push(createRender(state.hasRerender));
      const hasRerender = true;
      return {
        ...state,
        statements,
        hasRerender,
      };
    case actionTypes.DELETE_RENDER:
      statements = statements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_RENDER:
      statements = statements.map(statement => {
        if (statement.type === 'render') {
          statement.componentName = action.componentName;
          statement.filePath = action.filePath;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.props.push(createRenderProp());
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
          statement = statement.props.filter(statement => statement.id !== action.propId);
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.props.map(prop => {
            if (prop.id === action.propId) {
              prop.propKey = action.propKey;
              prop.propValue = action.propValue;
            }
            return prop;
          });
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    default:
      return state;
  }
};
