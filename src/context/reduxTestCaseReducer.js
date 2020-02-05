import { createContext } from 'react';
//import { actionTypes } from './testCaseActions';
import { actionTypes } from './reduxTestCaseActions'

export const ReduxTestCaseContext = createContext(null); /* here we create context for the redux test case. Dont provide it a default value (only used when you dont hve a provider for it), use null instead */

/* initial state for testCase */  
export const reduxTestCaseState = {
    reduxTestStatement: '', /* the test description */
    reduxStatements: [],   /* both of the cards on the page at open. Each card gets an id */
    hasRedux: false
};

let statementId = 0; 

/* add all the "helper functions" */
const createMiddleware = () => ({ /* renders the action card when the "action" button is clicked */
  id: statementId++,  
  type: 'middleware',  
  queryType: '', 
  eventValue: null,  
  queryVariant: '', 
  querySelector: '', 
  queryValue: '', 
  queryFunction: '', 
  suggestions: [],
});


export const reduxTestCaseReducer = (state, action) => { 
Object.freeze(state); 
let reduxStatements = [...state.reduxStatements];  /* getting all elements in states statement array */

    switch (action.type) {  
        case actionTypes.ADD_MIDDLEWARE:
        reduxStatements.push(createMiddleware());   /* pushing the new middlewaew the user created into the statements array and then adding back the last render */
        return {
            ...state,
            reduxStatements,
        };
        case actionTypes.DELETE_MIDDLEWARE:
        reduxStatements = reduxStatements.filter(statement => statement.id !== action.id);  /* if statement id !== acion id, then what?? */
        return {
            ...state,
            reduxStatements,
        };
        case actionTypes.UPDATE_MIDDLEWARE:
        reduxStatements = reduxStatements.map(statement => {  /* update statements if statement id === action id */
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
            reduxStatements,
        };


        case actionTypes.TOGGLE_REDUX:
            if (!state.hasRedux) {
                reduxStatements.push(createMiddleware());
            }
            return {
                ...state,
                reduxStatements,
                hasRedux: !state.hasRedux,
        };

        case actionTypes.CREATE_NEW_REDUX_TEST:  /* renders the new test card */
        return {
        reduxTestStatement: '',
        reduxStatements: [],
      };
        default:
        return state;
    }
}

