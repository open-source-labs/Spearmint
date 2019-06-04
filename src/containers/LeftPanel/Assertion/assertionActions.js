export const actionTypes = {
  SET_QUERY_VARIANT: 'SET_QUERY_VARIANT',
  SET_QUERY_SELECTOR: 'SET_QUERY_SELECTOR',
  SET_QUERY_VALUE: 'SET_QUERY_VALUE',
  SET_MATCHER_TYPE: 'SET_MATCHER_TYPE',
  SET_MATCHER_VALUE: 'SET_MATCHER_VALUE',
  SET_ASSERTION_SUGGESTIONS: 'SET_ASSERTION_SUGGESTIONS',
};

export const setQueryVariant = queryVariant => ({
  type: actionTypes.SET_QUERY_VARIANT,
  queryVariant,
});

export const setQuerySelector = querySelector => ({
  type: actionTypes.SET_QUERY_SELECTOR,
  querySelector,
});

export const setQueryValue = queryValue => ({
  type: actionTypes.SET_QUERY_VALUE,
  queryValue,
});

export const setMatcherType = matcherType => ({
  type: actionTypes.SET_MATCHER_TYPE,
  matcherType,
});

export const setMatcherValue = matcherValue => ({
  type: actionTypes.SET_MATCHER_VALUE,
  matcherValue,
});

export const setAssertionSuggestions = assertionSuggestions => ({
  type: actionTypes.SET_ASSERTION_SUGGESTIONS,
  assertionSuggestions,
});
