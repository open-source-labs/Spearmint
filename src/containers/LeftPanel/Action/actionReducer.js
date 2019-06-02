import { createContext } from 'react';
import { actionTypes } from './actionActions';

export const ActionContext = createContext(null);

export const actionState = {
  eventType: '',
  eventValue: '',
  eventName: '',
  queryVariant: '',
  querySelector: '',
  queryValue: '',
  suggestions: [],
};

export const actionReducer = (state, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actionTypes.SET_EVENT_TYPE:
      return {
        ...state,
      };
    case actionTypes.SET_EVENT_VALUE:
      return {
        ...state,
      };
    case actionTypes.SET_EVENT_NAME:
      return {
        ...state,
      };
    case actionTypes.SET_QUERY_VARIANT:
      return {
        ...state,
      };
    case actionTypes.SET_QUERY_SELECTOR:
      return {
        ...state,
      };
    case actionTypes.SET_QUERY_VALUE:
      return {
        ...state,
      };
    case actionTypes.GENERATE_SUGGESTIONS:
      return {
        ...state,
      };
 
    default:
      return state;
  }
};
