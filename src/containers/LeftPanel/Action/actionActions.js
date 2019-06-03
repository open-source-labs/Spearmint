export const actionTypes = {
  SET_EVENT_TYPE: 'SET_EVENT_TYPE',
  SET_EVENT_VALUE: 'SET_EVENT_VALUE',
  SET_QUERY_VARIANT: 'SET_QUERY_VARIANT',
  SET_QUERY_SELECTOR: 'SET_QUERY_SELECTOR',
  SET_QUERY_VALUE: 'SET_QUERY_VALUE',
  SET_SUGGESTIONS: 'SET_SUGGESTIONS',
};

export const setEventType = (eventType) => ({
  type: actionTypes.SET_EVENT_TYPE,
  eventType,
});

export const setEventValue = (eventValue) => ({
  type: actionTypes.SET_EVENT_VALUE,
  eventValue,
});

export const setQueryVariant = (queryVariant) => ({
  type: actionTypes.SET_QUERY_VARIANT,
  queryVariant,
});

export const setQuerySelector = (querySelector) => ({
  type: actionTypes.SET_QUERY_SELECTOR,
  querySelector,
});

export const setQueryValue = (queryValue) => ({
  type: actionTypes.SET_QUERY_VALUE,
  queryValue,
});

export const setSuggestions = (suggestions) => ({
  type: actionTypes.SET_SUGGESTIONS,
  suggestions,
});