import { actionTypes } from './actionActions';

export const actionState = {
  eventType: '',
  eventValue: '',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  suggestions: [],
};

export const actionReducer = (state, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actionTypes.SET_EVENT_TYPE:
      const eventType = action.eventType;
      return {
        ...state,
        eventType,
      };
    case actionTypes.SET_EVENT_VALUE:
      const eventValue = action.eventValue;
      return {
        ...state,
        eventValue,
      };
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
    case actionTypes.SET_SUGGESTIONS:
      let suggestions = action.suggestions;
      return {
        ...state,
        suggestions,
      };
    default:
      return state;
  }
};
