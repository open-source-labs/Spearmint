import { actionTypes } from "./testCaseActions";

export const testCaseState = {
  testStatement: "",
  statements: []
};

let statementId = 0;
let renderPropsId = 0;

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

const createAssertion = () => ({
  id: statementId++,
  type: "assertion",
  queryVariant: "",
  querySelector: "",
  assertionValue: "",
  matcher: ""
});

const createRender = () => ({
  id: statementId++,
  type: "render",
  componentName: "",
  props: []
});

const createRenderProp = () => ({
  id: renderPropsId++,
  propKey: "",
  propValue: ""
});

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
      statements = statements.filter(action => action.id !== action.id);
      return {
        ...state,
        statements
      };
    case actionTypes.UPDATE_ACTION:
      statements = statements.map(action => {
        if (action.id === action.id) {
          action.event.type = action.eventType;
          action.event.value = action.eventValue;
          action.queryVariant = action.queryVariant;
          action.querySelector = action.querySelector;
          action.queryValue = action.queryValue;
        }
        return action;
      });
      return {
        ...state,
        statements
      };
    case actionTypes.ADD_ASSERTION:
      statements.push(createAssertion());
      return {
        ...state,
        statements
      };
    case actionTypes.DELETE_ASSERTION:
      statements = statements.filter(assertion => assertion.id !== action.id);
      return {
        ...state,
        statements
      };
    case actionTypes.UPDATE_ASSERTION:
      statements = statements.map(assertion => {
        if (assertion.id === action.id) {
          assertion.queryVariant = action.queryVariant;
          assertion.querySelector = action.querySelector;
          assertion.assertionValue = action.assertionValue;
          assertion.matcher = action.matcher;
        }
        return assertion;
      });
      return {
        ...state,
        statements
      };
    case actionTypes.ADD_RENDER:
      statements.push(createRender());
      return {
        ...state,
        statements
      };
    case actionTypes.DELETE_RENDER:
      statements = statements.filter(render => render.id !== action.id);
      return {
        ...state,
        statements
      };
    case actionTypes.UPDATE_RENDER:
      statements = statements.map(render => {
        if (render.id === action.id)
          render.componentName = action.componentName;
        return render;
      });
      console.log(statements);
      return {
        ...state,
        statements
      };
    case actionTypes.ADD_RENDER_PROP:
      statements = statements.map(render => {
        if (render.id === action.id) {
          render.props.push(createRenderProp());
        }
        return render;
      });
      return {
        ...state,
        statements
      };
    case actionTypes.DELETE_RENDER_PROP:
      statements = statements.map(render => {
        if (render.id === action.renderId) {
          render = render.props.filter(render => render.id !== action.propId);
          return render;
        }
      });
      return {
        ...state,
        statements
      };
    case actionTypes.UPDATE_RENDER_PROP:
      statements = statements.map(render => {
        if (render.id === action.id) {
          render.props.map(prop => {
            if (prop.id === action.propId) {
              prop.propKey = action.propKey;
              prop.propValue = action.propValue;
            }
            return prop;
          });
        }
        return render;
      });
    default:
      return state;
  }
};
