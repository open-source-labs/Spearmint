import { actionTypes } from "./testCaseActions";

export const testCaseState = {
  testStatement: "",
  statements: []
};

let statementId = 0;

export const testCaseReducer = (state, action) => {
  Object.freeze(state);
  let statements = state.statements;

  const createAction = () => ({
    id: statementId++,
    type: "action",
    event: {
      type: "",
      value: null
    },
    queryVariant: "",
    queryOption: "",
    queryValue: ""
  });

  switch (action.type) {
    case actionTypes.UPDATE_TEST_STATEMENT:
      let testStatement = action.testStatement;
      return {
        ...state,
        testStatement
      };
    case actionTypes.ADD_ACTION:
      statements.push(createAction());
      console.log(statements);
      return {
        ...state,
        statements
      };
    default:
      return state;
  }
};
