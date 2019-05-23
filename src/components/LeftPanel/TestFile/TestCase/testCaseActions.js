export const actionTypes = {
  UPDATE_TEST_STATEMENT: "UPDATE_TEST_STATEMENT",

  ADD_ACTION: "ADD_ACTION",
  DELETE_ACTION: "DELETE_ACTION",

  ADD_ASSERTION: "ADD_ASSERTION",
  ADD_RENDER: "ADD_RENDER"
};

export const updateTestStatement = testStatement => ({
  type: actionTypes.UPDATE_TEST_STATEMENT,
  testStatement
});

export const addAction = () => ({
  type: actionTypes.ADD_ACTION
});

export const deleteAction = (
  id,
  eventType,
  queryVariant,
  queryOption,
  queryValue
) => ({
  type: actionTypes.DELETE_ACTION,
  id,
  eventType,
  queryVariant,
  queryOption,
  queryValue
});

export const addRender = () => ({
  type: actionTypes.ADD_RENDER
});
