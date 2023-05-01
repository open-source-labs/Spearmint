export const actionTypes = {
  TOGGLE_MOCK_DATA: 'TOGGLE_MOCK_DATA',
  ADD_MOCK_DATA: 'ADD_MOCK_DATA',
  DELETE_MOCK_DATA: 'DELETE_MOCK_DATA',
  UPDATE_MOCK_DATA_NAME: 'UPDATE_MOCK_DATA_NAME',

  ADD_MOCK_DATA_KEY: 'ADD_MOCK_DATA_KEY',
  DELETE_MOCK_DATA_KEY: 'DELETE_MOCK_DATA_KEY',
  UPDATE_MOCK_DATA_KEY: 'UPDATE_MOCK_DATA_KEY',

  CLEAR_MOCK_DATA: 'CLEAR_MOCK_DATA',
  REPLACE_TEST: 'REPLACE_TEST',
};

export const toggleMockData = () => ({
  type: actionTypes.TOGGLE_MOCK_DATA,
});

export const createMockData = () => ({
  type: actionTypes.ADD_MOCK_DATA,
});

export const deleteMockData = (id: number) => ({
  type: actionTypes.DELETE_MOCK_DATA,
  id,
});

export const updateMockDataName = (id: number, name: string) => ({
  type: actionTypes.UPDATE_MOCK_DATA_NAME,
  id,
  name,
});

export const addMockDataKey = (id: number) => ({
  type: actionTypes.ADD_MOCK_DATA_KEY,
  id,
});

export const deleteMockDataKey = (mockDatumId: number, mockDatumKeyId: number) => ({
  type: actionTypes.DELETE_MOCK_DATA_KEY,
  mockDatumId,
  mockDatumKeyId,
});

export const updateMockDataKey = (mockDatumId: number, mockDatumKeyId: number, fieldKey: string, fieldType: string) => ({
  type: actionTypes.UPDATE_MOCK_DATA_KEY,
  mockDatumId,
  mockDatumKeyId,
  fieldKey,
  fieldType,
});

export const clearMockData = () => ({
  type: actionTypes.CLEAR_MOCK_DATA,
});

export const mockReplaceTest = (testState: object) => ({
  type: actionTypes.REPLACE_TEST,
  testState,
});
