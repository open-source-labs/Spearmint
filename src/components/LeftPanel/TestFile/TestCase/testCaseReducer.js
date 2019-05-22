export const actionTypes = {
  UPDATE_TEST_STATEMENT: 'UPDATE_TEST_STATEMENT',
  TOGGLE_MOCK_DATA: 'TOGGLE_MOCK_DATA',
  ADD_MOCK_DATA: 'ADD_MOCK_DATA',
  DELETE_MOCK_DATA: 'DELETE_MOCK_DATA',
  ADD_MOCK_DATA_KEY: 'ADD_MOCK_DATA_KEY',
  DELETE_MOCK_DATA_KEY: 'DELETE_MOCK_DATA_KEY',
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

export const addMockDataKey = (id) => ({
  type: actionTypes.ADD_MOCK_DATA_KEY,
  id,
})

export const deleteMockDataKey = (mockDatumId, mockDatumKeyId) => ({
  type: actionTypes.DELETE_MOCK_DATA_KEY,
  mockDatumId,
  mockDatumKeyId,
})


export const initialState = {
  testStatement: '',
  mockData: [],
  statements: [],
  mockDataCheckBox: false,
}

let statementId = 0;
let mockDataId = 0;
let mockDatumKeyId = 0;
const createMockDatum = (id) => ({
  id: id,
  keys: [],
  content: '',
  type: 'mockData'
})

export const testCaseReducer = (state, action) => {
  Object.freeze(state);

  let statements = state.statements;
  let mockData = state.mockData;
  
  switch (action.type) {
    case actionTypes.UPDATE_TEST_STATEMENT:
      let testStatement = `test ('${action.testStatement}', () => {`
      return {
          ...state,
          testStatement,
        } 
    case actionTypes.TOGGLE_MOCK_DATA:
      if (!state.mockDataCheckBox) {
        mockData.push(createMockDatum(mockDatumKeyId++));
      }
      return {
        ...state,
        mockData,
        mockDataCheckBox: !state.mockDataCheckBox
      } 
    case actionTypes.ADD_MOCK_DATA:
      mockData.push(createMockDatum(mockDatumKeyId++))
    return {
        ...state,
        mockData,
      }
    case actionTypes.DELETE_MOCK_DATA:
      mockData = mockData.filter((mockDatum) => mockDatum.id !== action.id)
      return {
        ...state,
        mockData,
      }
    case actionTypes.ADD_MOCK_DATA_KEY:
      mockData = mockData.map((mockDatum) => { 
        if (mockDatum.id === action.id) {
          mockDatum.keys.push({        
            id: mockDatumKeyId++,
            fieldKey: '',
            type: '',
          });
          console.log(mockDatum.keys);
        } 
        return mockDatum;
      })
      return {
        ...state,
        mockData,
      }
      case actionTypes.DELETE_MOCK_DATA_KEY:
        mockData = mockData.map((mockDatum) => { 
          if (mockDatum.id === action.mockDatumId) {
            console.log('hihi');

            mockDatum.keys = mockDatum.keys.filter((key) => key.id !== action.mockDatumKeyId)
            console.log(mockDatum.keys);
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

