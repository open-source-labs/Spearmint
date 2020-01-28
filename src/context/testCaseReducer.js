/**
 * stores all state for user inputted action, render, and assertion statements
 * the state here is used to generate the test files that are exported using context
 * the components that use this reducer : testCase, Export File Modal. App is their only common parent component, so we pass the reducer there
 * 
 * 
 * ??'s : 
 *  - whats the file path
 *  - why do we reorder the statements? 
 *  - update testStatement question
 */

import { createContext } from 'react';
import { actionTypes } from './testCaseActions';

export const TestCaseContext = createContext(null); /* here we create context for the test case. Dont provide it a default value (only used when you dont hve a provider for it), use null instead */

/* initial state for testCase */  
export const testCaseState = {
  testStatement: '', /* the test description */
  statements: [    /* both of the cards on the page at open. Each card gets an id */
    {
      id: 0, 
      type: 'render',  /* card name */
      componentName: '',  /* input box */
      filePath: '',  /* ? */
      props: [], /* if props are added they are pushed here */
      hasProp: false,
    },
    {
      id: 1,
      type: 'assertion', /* card name */
      queryVariant: '',  /* drop down to choose a query variant */
      querySelector: '', /* drop down to choose an option */
      queryValue: '', /* input box for value of query */
      isNot: false, 
      matcherType: '',  /* inout box for  */
      matcherValue: '', /* ? */
      suggestions: [], /* auto complete suggestions? */
    },
  ],
};

let statementId = 2; /* to allow us to auto increment ids for other cards being added to the page */
let renderPropsId = 0; /* same */


/* these are "helper functions"?? */
const createMiddleware = () => ({ /* renders the action card when the "action" button is clicked */
  id: statementId++,  
  type: 'middleware',  
  queryType: '',  /* ex: onclick */
  eventValue: null,  
  queryVariant: '',  /* drop down to select a query variant */
  querySelector: '', /* to select an option */
  queryValue: '', 
  queryFunction: '', 
  suggestions: [],
});

const createAction = () => ({ /* renders the action card when the "action" button is clicked */
  id: statementId++,  
  type: 'action',  
  eventType: '',  /* ex: onclick */
  eventValue: null,  
  queryVariant: '',  /* drop down to select a query variant */
  querySelector: '', /* to select an option */
  queryValue: '',  
  suggestions: [],
});

const createAssertion = () => ({  /* renders a new assertion card  */
  id: statementId++,
  type: 'assertion',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  isNot: false,
  matcherType: '',
  matcherValue: '',
  suggestions: [],
});

const createRerender = (componentName, filePath) => ({ /* renders a rerender card */
  id: statementId++,
  type: 'render',
  componentName,
  filePath,
  props: [],
});

const createRenderProp = () => ({ /* to render prop form on render and rerender */
  id: renderPropsId++,
  propKey: '',
  propValue: '',
});

export const testCaseReducer = (state, action) => {  /* reducers only pass the state and the action to change that state */
  Object.freeze(state); /* cannot be changed.  properties can not be added or removed. values cannot be changed. */
  let statements = [...state.statements];  /* getting all elements in states statement array */
  let lastAssertionStatement; /* b.c we reorder the statements */

  /* all the different actions thatll be used to update state */
  switch (action.type) {  /* actions come from the acton creator file (testCaseActions) */
    case actionTypes.UPDATE_STATEMENTS_ORDER:
      const firstRenderStatement = statements[0]; 
      lastAssertionStatement = statements[statements.length - 1];
      statements = [firstRenderStatement, ...action.draggableStatements, lastAssertionStatement];
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_TEST_STATEMENT: 
      let testStatement = action.testStatement;  /* is this calling "testStatement from state? why not state.testStatement??" */
      return {
        ...state,
        testStatement,
      };

    case actionTypes.ADD_MIDDLEWARE:
      lastAssertionStatement = statements.pop();  /* popping off the last render */
      statements.push(createMiddleware(), lastAssertionStatement);   /* pushing the new middlewaew the user created into the statements array and then adding back the last render */
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_MIDDLEWARE:
      lastAssertionStatement = statements.pop();  
      statements = statements.filter(statement => statement.id !== action.id);  /* if statement id !== acion id, then what?? */
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_MIDDLEWARE:
      statements = statements.map(statement => {  /* update statements if statement id === action id */
        if (statement.id === action.id) {
          statement.queryType = action.queryType;
          statement.eventValue = action.eventValue;
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.queryFunction = action.queryFunction;
          statement.suggestions = action.suggestions;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };



    case actionTypes.ADD_ACTION:
      lastAssertionStatement = statements.pop();  /* popping off what?? */
      statements.push(createAction(), lastAssertionStatement);   /* pushing the new action the user created into the statements array */
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ACTION:
      lastAssertionStatement = statements.pop();  /* popping off what?? */
      statements = statements.filter(statement => statement.id !== action.id);  /* if statement id !== acion id, then what?? */
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ACTION:
      statements = statements.map(statement => {  /* update statements if statement id === action id */
        if (statement.id === action.id) {
          statement.eventType = action.eventType;
          statement.eventValue = action.eventValue;
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.suggestions = action.suggestions;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_ASSERTION: 
      lastAssertionStatement = statements.pop();
      statements.push(createAssertion(), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_ASSERTION:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_ASSERTION:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
          statement.isNot = action.isNot;
          statement.matcherType = action.matcherType;
          statement.matcherValue = action.matcherValue;
          statement.suggestions = action.suggestions;
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.ADD_RENDER:
      lastAssertionStatement = statements.pop();
      const renderComponentName = state.statements[0].componentName;
      const renderFilePath = state.statements[0].filePath;
      statements.push(createRerender(renderComponentName, renderFilePath), lastAssertionStatement);
      return {
        ...state,
        statements,
      };
    case actionTypes.DELETE_RENDER:
      lastAssertionStatement = statements.pop();
      statements = statements.filter(statement => statement.id !== action.id);
      statements.push(lastAssertionStatement);
      return {
        ...state,
        statements,
        lastAssertionStatement,
      };
    case actionTypes.UPDATE_RENDER_COMPONENT:
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
        if (statement.id === action.renderId) {
          statement.props.push(createRenderProp());
        }
        return statement;
      });
      return {
        ...state,
        statements,
        hasProp: !statements[0].hasProp,
      };
    case actionTypes.DELETE_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
          statement.props = statement.props.filter(prop => prop.id !== action.propId);
        }
        return statement;
      });
      return {
        ...state,
        statements,
      };
    case actionTypes.UPDATE_RENDER_PROP:
      statements = statements.map(statement => {
        if (statement.id === action.renderId) {
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
    case actionTypes.CREATE_NEW_TEST:  /* renders the new test card */
      return {
        testStatement: '',
        statements: [
          {
            id: 0,
            type: 'render',
            componentName: '',
            filePath: '',
            props: [],
            hasProp: false,
          },
          {
            id: 1,
            type: 'assertion',
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            isNot: false,
            matcherType: '',
            matcherValue: '',
            suggestions: [],
          },
        ],
      };
    default:
      return state;
  }
};
