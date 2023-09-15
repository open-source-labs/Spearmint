/* ------------------------------ Action Types ------------------------------ */

export const actionTypes = {
  ADD_DESCRIBE_BLOCK: 'ADD_DESCRIBE_BLOCK',
  DELETE_DESCRIBE_BLOCK: 'DELETE_DESCRIBE_BLOCK',
  UPDATE_DESCRIBE_TEXT: 'UPDATE_DESCRIBE_TEXT',
  UPDATE_DESCRIBE_ORDER: 'UPDATE_DESCRIBE_ORDER',
  UPDATE_DESCRIBE_STANDARD_TAG: 'UPDATE_DESCRIBE_STANDARD_TAG',

  ADD_ITSTATEMENT: 'ADD_ITSTATEMENT',
  DELETE_ITSTATEMENT: 'DELETE_ITSTATEMENT',
  UPDATE_ITSTATEMENT_TEXT: 'UPDATE_ITSTATEMENT_TEXT',
  UPDATE_ITSTATEMENT_ORDER: 'UPDATE_ITSTATEMENT_ORDER',
  UPDATE_IT_CAT_TAG: 'UPDATE_IT_CAT_TAG',

  CREATE_NEW_TEST: 'CREATE_NEW_TEST',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',

  UPDATE_FILE_PATH: 'UPDATE_FILE_PATH',
  UPDATE_TEST_TYPE: 'UPDATE_TEST_TYPE',
  CREATE_PUPPETEER_URL: 'CREATE_PUPPETEER_URL',

  REPLACE_TEST: 'REPLACE_TEST',
  RESET_TESTS: 'RESET_TESTS',
};

/* --------------------------------- Actions -------------------------------- */

export const addDescribeBlock = () => ({
  type: actionTypes.ADD_DESCRIBE_BLOCK,
});

export const deleteDescribeBlock = (describeId: string) => ({
  type: actionTypes.DELETE_DESCRIBE_BLOCK,
  describeId,
});

export const updateDescribeText = (text: string, describeId: string) => ({
  type: actionTypes.UPDATE_DESCRIBE_TEXT,
  text,
  describeId,
});

export const updateDescribeOrder = (reorderedDescribe: Array<string>) => ({
  type: actionTypes.UPDATE_DESCRIBE_ORDER,
  reorderedDescribe,
});

export const updateDescribeStandardTag = (describeId: string, standardTag: string) => ({
  type: actionTypes.UPDATE_DESCRIBE_STANDARD_TAG,
  describeId,
  standardTag,
});

export const addItStatement = (describeId: string) => ({
  type: actionTypes.ADD_ITSTATEMENT,
  describeId,
});

export const deleteItStatement = (describeId: string, itId: string) => ({
  type: actionTypes.DELETE_ITSTATEMENT,
  describeId,
  itId,
});

export const updateItStatementText = (text: string, itId: string) => ({
  type: actionTypes.UPDATE_ITSTATEMENT_TEXT,
  itId,
  text,
});

export const updateItStatementOrder = (reorderedIt: Array<string>, describeId: string) => ({
  type: actionTypes.UPDATE_ITSTATEMENT_ORDER,
  reorderedIt,
  describeId,
});

export const updateItCatTag = (itId: string, catTag: string) => ({
  type: actionTypes.UPDATE_IT_CAT_TAG,
  itId,
  catTag,
});

export const createNewTest = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});

export const openInfoModal = () => ({
  type: actionTypes.OPEN_INFO_MODAL,
});

export const closeInfoModal = () => ({
  type: actionTypes.CLOSE_INFO_MODAL,
});

export const updateFilePath = (fileName: string, filePath: string) => ({
  type: actionTypes.UPDATE_FILE_PATH,
  fileName,
  filePath,
});

export const updateTestType = (testType: string) => ({
  type: actionTypes.UPDATE_TEST_TYPE,
  testType,
});

export const createPuppeteerUrl = (puppeteerUrl: string) => ({
  type: actionTypes.CREATE_PUPPETEER_URL,
  puppeteerUrl,
});

export const accReplaceTest = (testState: object) => ({
  type: actionTypes.REPLACE_TEST,
  testState,
});

export const resetTests = () => ({
  type: actionTypes.RESET_TESTS
})
