/* ------------------------------ Action Types ------------------------------ */

export const actionTypes = {
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
  CREATE_NEW_SEC_TEST: 'CREATE_NEW_SEC_TEST',
  REPLACE_TEST: 'REPLACE_TEST'
};

/* --------------------------------- Actions -------------------------------- */

export const openInfoModal = () => ({
  type: actionTypes.OPEN_INFO_MODAL,
});

export const closeInfoModal = () => ({
  type: actionTypes.CLOSE_INFO_MODAL,
});

export const createNewSecTest = () => ({
  type: actionTypes.CREATE_NEW_SEC_TEST,
});

export const secReplaceTest = (testState: object) => ({
  type: actionTypes.REPLACE_TEST,
  testState,
});
