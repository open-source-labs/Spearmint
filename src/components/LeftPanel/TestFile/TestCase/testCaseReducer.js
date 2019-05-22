export const actionTypes = {
  UPDATE_TEST_STATEMENT: 'UPDATE_TEST_STATEMENT',
  
  TOGGLE_MOCK_DATA: 'TOGGLE_MOCK_DATA',
  ADD_MOCK_DATA: 'ADD_MOCK_DATA',
  DELETE_MOCK_DATA: 'DELETE_MOCK_DATA',
  UPDATE_MOCK_DATA_NAME: 'UPDATE_MOCK_DATA_NAME',
  
  ADD_MOCK_DATA_KEY: 'ADD_MOCK_DATA_KEY',
  DELETE_MOCK_DATA_KEY: 'DELETE_MOCK_DATA_KEY',
  UPDATE_MOCK_DATA_KEY: 'UPDATE_MOCK_DATA_KEY',
  
  ADD_ACTION: 'ADD_ACTION',
  ADD_ASSERTION: 'ADD_ASSERTION',
  ADD_RENDER: 'ADD_RENDER',
}

export const updateTestStatement = (testStatement) => ({
  type: actionTypes.UPDATE_TEST_STATEMENT,
  testStatement,
})

export const toggleMockData = () => ({
  type: actionTypes.TOGGLE_MOCK_DATA,
})

export const addMockData = () => ({
  type: actionTypes.ADD_MOCK_DATA,
})

export const deleteMockData = (id) => ({
  type: actionTypes.DELETE_MOCK_DATA,
  id,
})

export const updateMockDataName = (id, name) => ({
  type: actionTypes.UPDATE_MOCK_DATA_NAME,
  id,
  name,
})

export const addMockDataKey = (id) => ({
  type: actionTypes.ADD_MOCK_DATA_KEY,
  id,
})

export const deleteMockDataKey = (mockDatumId, mockDatumKeyId) => ({
  type: actionTypes.DELETE_MOCK_DATA_KEY,
  mockDatumId,
  mockDatumKeyId,
})

export const updateMockDataKey = (mockDatumId, mockDatumKeyId, fieldKey, fieldType) => ({
  type: actionTypes.UPDATE_MOCK_DATA_KEY,
  mockDatumId,
  mockDatumKeyId,
  fieldKey,
  fieldType,
})

export const initialState = {
  testStatement: '',
  mockData: [],
  statements: [],
  mockDataCheckBox: false,
}
const createMockDatum = (id) => ({
  id,
  name: '',
  fieldKeys: [],
  content: '',
  type: 'mockData'
})
const createFieldKeys = (id) => ({        
  id,
  fieldKey: '',
  fieldType: '',
})
let statementId = 0;
let mockDatumId = 0;
let mockDatumKeyId = 0;

export const testCaseReducer = (state, action) => {
  Object.freeze(state);

  let statements = state.statements;
  let mockData = state.mockData;
  
  switch (action.type) {
    case actionTypes.UPDATE_TEST_STATEMENT:
      let testStatement = action.testStatement;
      return {
          ...state,
          testStatement,
        } 
    case actionTypes.TOGGLE_MOCK_DATA:
      if (!state.mockDataCheckBox) {
        mockData.push(createMockDatum(mockDatumId++));
      }
      return {
        ...state,
        mockData,
        mockDataCheckBox: !state.mockDataCheckBox
      } 
    case actionTypes.ADD_MOCK_DATA:
      mockData.push(createMockDatum(mockDatumId++))
      return {
        ...state,
        mockData,
      }
    case actionTypes.DELETE_MOCK_DATA:
      mockData = mockData.filter(mockDatum => mockDatum.id !== action.id)
      return {
        ...state,
        mockData,
      }
    case actionTypes.UPDATE_MOCK_DATA_NAME:
      mockData = mockData.map(mockDatum => {
        if (mockDatum.id === action.id) {
          mockDatum.name = action.name;
        }
        return mockDatum;
      })
      return {
        ...state,
        mockData,
      }
    case actionTypes.ADD_MOCK_DATA_KEY:
      mockData = mockData.map(mockDatum => { 
        if (mockDatum.id === action.id) {
          mockDatum.fieldKeys.push(createFieldKeys(mockDatumKeyId++));
        } 
        return mockDatum;
      })
      return {
        ...state,
        mockData,
      }
      case actionTypes.DELETE_MOCK_DATA_KEY:
        mockData = mockData.map(mockDatum => { 
          if (mockDatum.id === action.mockDatumId) {
            mockDatum.fieldKeys = mockDatum.fieldKeys.filter((key) => key.id !== action.mockDatumKeyId)
          } 
          return mockDatum;
        })
        return {
          ...state,
          mockData,
        }
      case actionTypes.UPDATE_MOCK_DATA_KEY:
        mockData = mockData.map(mockDatum => { 
          if (mockDatum.id === action.mockDatumId) {
            mockDatum.fieldKeys.map(fieldKey => {
              if (fieldKey.id === action.mockDatumKeyId) {
                // console.log(fieldKey);
                // console.log(`fieldKey: ${fieldKey.fieldKey}`);
                // console.log(`action: ${action.fieldKey}`)
                fieldKey.fieldKey = action.fieldKey;
                fieldKey.fieldType = action.fieldType;
              }
              console.log(fieldKey);
              return fieldKey;
            })
          } 
          return mockDatum;
        })
        return {
          ...state,
          mockData,
        }
    default: 
      return state;
  }
}

