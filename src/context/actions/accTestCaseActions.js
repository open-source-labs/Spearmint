/* ------------------------------ Action Types ------------------------------ */

export const actionTypes = {
  ADD_DESCRIBE_BLOCK: 'ADD_DESCRIBE_BLOCK',
  DELETE_DESCRIBE_BLOCK: 'DELETE_DESCRIBE_BLOCK',
  UPDATE_DESCRIBE_TEXT: 'UPDATE_DESCRIBE_TEXT',
  UPDATE_DESCRIBE_ORDER: 'UPDATE_DESCRIBE_ORDER',

  ADD_ITSTATEMENT: 'ADD_ITSTATEMENT',
  DELETE_ITSTATEMENT: 'DELETE_ITSTATEMENT',
  UPDATE_ITSTATEMENT_TEXT: 'UPDATE_ITSTATEMENT_TEXT',
  UPDATE_ITSTATEMENT_ORDER: 'UPDATE_ITSTATEMENT_ORDER',

  CREATE_NEW_TEST: 'CREATE_NEW_TEST',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',

  UPDATE_FILE_PATH: 'UPDATE_FILE_PATH',

  // not yet implemented:
  TOGGLE_ACC: 'TOGGLE_ACC',
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

export const updateDescribeText = (text, describeId) => ({
  type: actionTypes.UPDATE_DESCRIBE_TEXT,
  text,
  describeId,
});

export const updateDescribeOrder = (reorderedDescribe) => {
  return {
    type: actionTypes.UPDATE_DESCRIBE_ORDER,
    reorderedDescribe,
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

export const updateItStatementText = (text, itId) => ({
  type: actionTypes.UPDATE_ITSTATEMENT_TEXT,
  itId,
  text,
});

export const updateItStatementOrder = (reorderedIt) => {
  return {
    type: actionTypes.UPDATE_ITSTATEMENT_ORDER,
    reorderedIt,
  };
};

export const createNewTest = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});

export const openInfoModal = () => {
  return { type: actionTypes.OPEN_INFO_MODAL };
};

export const closeInfoModal = () => {
  return { type: actionTypes.CLOSE_INFO_MODAL };
};

export const updateImportFilePath = (fileName, filePath) => ({
  type: actionTypes.UPDATE_FILE_PATH,
  fileName,
  filePath,
});

// the below have no corresponding functions in Reducer
export const toggleAcc = () => ({
  type: actionTypes.TOGGLE_ACC,
});
