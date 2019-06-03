export const actionTypes = {
  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  UPDATE_TEST_STATEMENT: 'UPDATE_TEST_STATEMENT',

  ADD_ACTION: 'ADD_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
  UPDATE_ACTION: 'UPDATE_ACTION',

  ADD_ASSERTION: 'ADD_ASSERTION',
  DELETE_ASSERTION: 'DELETE_ASSERTION',
  UPDATE_ASSERTION: 'UPDATE_ASSERTION',

  ADD_RENDER: 'ADD_RENDER',
  DELETE_RENDER: 'DELETE_RENDER',
  UPDATE_RENDER: 'UPDATE_RENDER',

  ADD_RENDER_PROP: 'ADD_RENDER_PROP',
  DELETE_RENDER_PROP: 'DELETE_RENDER_PROP',
  UPDATE_RENDER_PROP: 'UPDATE_RENDER_PROPS',
};

export const updateStatementsOrder = statements => ({
  type: actionTypes.UPDATE_STATEMENTS_ORDER,
  statements,
});

export const updateTestStatement = testStatement => ({
  type: actionTypes.UPDATE_TEST_STATEMENT,
  testStatement,
});

export const addAction = () => ({
  type: actionTypes.ADD_ACTION,
});

export const deleteAction = id => ({
  type: actionTypes.DELETE_ACTION,
  id,
});

export const updateAction = ({
  id,
  eventType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
}) => ({
  type: actionTypes.UPDATE_ACTION,
  id,
  eventType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
});

export const addAssertion = () => ({
  type: actionTypes.ADD_ASSERTION,
});

export const deleteAssertion = id => ({
  type: actionTypes.DELETE_ASSERTION,
  id,
});

export const updateAssertion = ({
  id,
  queryVariant,
  querySelector,
  assertionValue,
  matcher,
  matcherValue,
}) => ({
  type: actionTypes.UPDATE_ASSERTION,
  id,
  queryVariant,
  querySelector,
  assertionValue,
  matcher,
  matcherValue,
});

export const addRender = () => ({
  type: actionTypes.ADD_RENDER,
});

export const deleteRender = id => ({
  type: actionTypes.DELETE_RENDER,
  id,
});

export const updateRender = (id, componentName, filePath) => ({
  type: actionTypes.UPDATE_RENDER,
  id,
  componentName,
  filePath,
});

export const addRenderProp = id => ({
  type: actionTypes.ADD_RENDER_PROP,
  id,
});

export const deleteRenderProp = id => ({
  type: actionTypes.DELETE_RENDER_PROP,
  id,
});

export const updateRenderProp = (renderId, propId, propKey, propValue) => ({
  type: actionTypes.UPDATE_RENDER_PROP,
  renderId,
  propId,
  propKey,
  propValue,
});
