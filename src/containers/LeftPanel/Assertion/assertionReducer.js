import { actionTypes } from './assertionActions';

export const assertionState = {
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  matcherType: '',
  matcherValue: '',
  assertionSuggestions: [],
};

export const assertionReducer = (state, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actionTypes.SET_QUERY_VARIANT:
      const queryVariant = action.queryVariant;
      return {
        ...state,
        queryVariant,
      };
    case actionTypes.SET_QUERY_SELECTOR:
      const querySelector = action.querySelector;
      return {
        ...state,
        querySelector,
      };
    case actionTypes.SET_QUERY_VALUE:
      const queryValue = action.queryValue;
      return {
        ...state,
        queryValue,
      };
    case actionTypes.SET_MATCHER_TYPE:
      const matcherType = action.matcherType;
      return {
        ...state,
        matcherType,
      };
    case actionTypes.SET_MATCHER_VALUE:
      const matcherValue = action.matcherValue;
      return {
        ...state,
        matcherValue,
      };
    case actionTypes.SET_ASSERTION_SUGGESTIONS:
      let assertionSuggestions = action.assertionSuggestions;
      return {
        ...state,
        assertionSuggestions,
      };
    default:
      return state;
  }
};
