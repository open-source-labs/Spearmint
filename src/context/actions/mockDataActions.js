export const actionTypes = {
  TOGGLE_MOCK_DATA: 'TOGGLE_MOCK_DATA',
  ADD_MOCK_DATA: 'ADD_MOCK_DATA',
  DELETE_MOCK_DATA: 'DELETE_MOCK_DATA',
  UPDATE_MOCK_DATA_NAME: 'UPDATE_MOCK_DATA_NAME',

  ADD_MOCK_DATA_KEY: 'ADD_MOCK_DATA_KEY',
  DELETE_MOCK_DATA_KEY: 'DELETE_MOCK_DATA_KEY',
  UPDATE_MOCK_DATA_KEY: 'UPDATE_MOCK_DATA_KEY',

  CLEAR_MOCK_DATA: 'CLEAR_MOCK_DATA',
};

export const toggleMockData = () => ({
  type: actionTypes.TOGGLE_MOCK_DATA,
});

export const createMockData = () => ({
  type: actionTypes.ADD_MOCK_DATA,
});

export const deleteMockData = (id) => ({
  type: actionTypes.DELETE_MOCK_DATA,
  id,
});

export const updateMockDataName = (id, name) => ({
  type: actionTypes.UPDATE_MOCK_DATA_NAME,
  id,
  name,
});

export const addMockDataKey = (id) => ({
  type: actionTypes.ADD_MOCK_DATA_KEY,
  id,
});

export const deleteMockDataKey = (mockDatumId, mockDatumKeyId) => ({
  type: actionTypes.DELETE_MOCK_DATA_KEY,
  mockDatumId,
  mockDatumKeyId,
});

export const updateMockDataKey = (mockDatumId, mockDatumKeyId, fieldKey, fieldType) => ({
  type: actionTypes.UPDATE_MOCK_DATA_KEY,
  mockDatumId,
  mockDatumKeyId,
  fieldKey,
  fieldType,
});

export const clearMockData = () => ({
  type: actionTypes.CLEAR_MOCK_DATA,
});
