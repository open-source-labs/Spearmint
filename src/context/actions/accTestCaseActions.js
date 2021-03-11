/* ------------------------------ Action Types ------------------------------ */

export const actionTypes = {
  TOGGLE_ACC: 'TOGGLE_ACC',

  ADD_DESCRIBE_BLOCK: 'ADD_DESCRIBE_BLOCK',
  DELETE_DESCRIBE_BLOCK: 'DELETE_DESCRIBE_BLOCK',

  ADD_ITSTATEMENT: 'ADD_ITSTATEMENT',

  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  UPDATE_DESCRIBE_TEXT: 'UPDATE_DESCRIBE_TEXT',

  UPDATE_ITSTATEMENT_TEXT: 'UPDATE_ITSTATEMENT_TEXT',
  DELETE_ITSTATEMENT: 'DELETE_ITSTATEMENT',

  CREATE_NEW_TEST: 'CREATE_NEW_TEST',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
};

/* --------------------------------- Actions -------------------------------- */

export const addDescribeBlock = () => {
  return {
    type: actionTypes.ADD_DESCRIBE_BLOCK,
  };
};
 
export const deleteDescribeBlock = (describeId) => {
  return {
    type: actionTypes.DELETE_DESCRIBE_BLOCK,
    describeId,
  };
};
 
export const addItStatement = (describeId) => ({
  type: actionTypes.ADD_ITSTATEMENT,
  describeId,
});
 
export const deleteItStatement = (describeId, itId) => ({
  type: actionTypes.DELETE_ITSTATEMENT,
  describeId,
  itId,
});
 
export const toggleAcc = () => ({
  type: actionTypes.TOGGLE_ACC,
});
  
export const updateStatementsOrder = (draggableStatements) => ({
  type: actionTypes.UPDATE_STATEMENTS_ORDER,
  draggableStatements,
});
 
export const updateDescribeText = (text, describeId) => ({
  type: actionTypes.UPDATE_DESCRIBE_TEXT,
  text,
  describeId,
});

export const updateItStatementText = (text, itId) => ({
  type: actionTypes.UPDATE_ITSTATEMENT_TEXT,
  itId,
  text,
});

export const createNewTest = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});
 
export const openInfoModal = () => {
  return { type: actionTypes.OPEN_INFO_MODAL };
};
 
export const closeInfoModal = () => {
  return { type: actionTypes.CLOSE_INFO_MODAL };
};
