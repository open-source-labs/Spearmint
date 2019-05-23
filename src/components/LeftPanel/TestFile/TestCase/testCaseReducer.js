import { actionTypes } from "./testCaseActions";

export const testCaseState = {
  testStatement: "",
  statements: []
};

const createAction = () => ({
  id: statementId++,
  type: "action",
  event: {
    type: "",
    value: null
  },
  queryVariant: "",
  querySelector: "",
  queryValue: ""
});

let statementId = 0;

export const testCaseReducer = (state, action) => {
  Object.freeze(state);
  let statements = state.statements;

  switch (action.type) {
    case actionTypes.UPDATE_TEST_STATEMENT:
      let testStatement = action.testStatement;
      return {
        ...state,
        testStatement
      };
    case actionTypes.ADD_ACTION:
      statements.push(createAction());
      return {
        ...state,
        statements
      };
    case actionTypes.DELETE_ACTION:
      statements = statements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        statements
      };
    case actionTypes.UPDATE_ACTION:
      statements = statements.map(statement => {
        if (statement.id === action.id) {
          statement.event.type = action.eventType;
          // statement.event.value = action.eve
          statement.queryVariant = action.queryVariant;
          statement.querySelector = action.querySelector;
          statement.queryValue = action.queryValue;
        }
        return statement;
      });
      return {
        ...state,
        statements
      };
    default:
      return state;
  }
};
