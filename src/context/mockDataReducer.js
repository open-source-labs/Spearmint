import { createContext } from 'react';
import { actionTypes } from './mockDataActions';

export const MockDataContext = createContext(null);

export const mockDataState = {
  mockData: [],
  mockDataCheckBox: false,
};

let mockDatumId = 0;
let mockDatumKeyId = 0;

const createMockDatum = id => ({
  id: mockDatumId++,
  name: '',
  fieldKeys: [],
  content: '',
  type: 'mockData',
});

const createFieldKeys = id => ({
  id: mockDatumKeyId++,
  fieldKey: '',
  fieldType: '',
});

export const mockDataReducer = (state, action) => {
  Object.freeze(state);
  let mockData = state.mockData;

  switch (action.type) {
    case actionTypes.TOGGLE_MOCK_DATA:
      if (!state.mockDataCheckBox) {
        mockData.push(createMockDatum());
      }
      return {
        ...state,
        mockData,
        mockDataCheckBox: !state.mockDataCheckBox,
      };
    case actionTypes.ADD_MOCK_DATA:
      mockData.push(createMockDatum());
      return {
        ...state,
        mockData,
      };
    case actionTypes.DELETE_MOCK_DATA:
      mockData = mockData.filter(mockDatum => mockDatum.id !== action.id);
      return {
        ...state,
        mockData,
      };
    case actionTypes.UPDATE_MOCK_DATA_NAME:
      mockData = mockData.map(mockDatum => {
        if (mockDatum.id === action.id) {
          mockDatum.name = action.name;
        }
        return mockDatum;
      });
      return {
        ...state,
        mockData,
      };
    case actionTypes.ADD_MOCK_DATA_KEY:
      mockData = mockData.map(mockDatum => {
        if (mockDatum.id === action.id) {
          mockDatum.fieldKeys.push(createFieldKeys());
        }
        return mockDatum;
      });
      return {
        ...state,
        mockData,
      };
    case actionTypes.DELETE_MOCK_DATA_KEY:
      mockData = mockData.map(mockDatum => {
        if (mockDatum.id === action.mockDatumId) {
          mockDatum.fieldKeys = mockDatum.fieldKeys.filter(key => key.id !== action.mockDatumKeyId);
        }
        return mockDatum;
      });
      return {
        ...state,
        mockData,
      };
    case actionTypes.UPDATE_MOCK_DATA_KEY:
      mockData = mockData.map(mockDatum => {
        if (mockDatum.id === action.mockDatumId) {
          mockDatum.fieldKeys.map(fieldKey => {
            if (fieldKey.id === action.mockDatumKeyId) {
              fieldKey.fieldKey = action.fieldKey;
              fieldKey.fieldType = action.fieldType;
            }
            return fieldKey;
          });
        }
        return mockDatum;
      });
      return {
        ...state,
        mockData,
      };
    default:
      return state;
  }
};
