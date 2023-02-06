import { createContext } from 'react';
import { actionTypes } from '../actions/mockDataActions';
import { Action } from '../../utils/ReactTypes';

interface MockDataArrayType {
  id: number,
  fieldKeys: Array<number>,
}

interface MockDataTypes {
  mockData: Array<MockDataArrayType>,
  hasMockData: boolean,
}

export const mockDataState: MockDataTypes = {
  mockData: [],
  hasMockData: false,
};

let mockDatumId = 0;
let mockDatumKeyId = 0;

const createMockDatum = (id) => ({
  id: mockDatumId++,
  name: '',
  fieldKeys: [],
  content: '',
  type: 'mockData',
});

const createFieldKeys = (id) => ({
  id: mockDatumKeyId++,
  fieldKey: '',
  fieldType: '',
});

export const mockDataReducer = (state, action) => {
  Object.freeze(state);
  let mockData = state.mockData;

  switch (action.type) {
    case actionTypes.TOGGLE_MOCK_DATA:
      if (!state.hasMockData) {
        mockData.push(createMockDatum());
      }
      return {
        ...state,
        mockData,
        hasMockData: !state.hasMockData,
      };
    case actionTypes.ADD_MOCK_DATA:
      mockData.push(createMockDatum());
      return {
        ...state,
        mockData,
      };
    case actionTypes.DELETE_MOCK_DATA:
      mockData = mockData.filter((mockDatum) => mockDatum.id !== action.id);
      return {
        ...state,
        mockData,
      };
    case actionTypes.UPDATE_MOCK_DATA_NAME:
      mockData = mockData.map((mockDatum) => {
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
      mockData = mockData.map((mockDatum) => {
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
      mockData = mockData.map((mockDatum) => {
        if (mockDatum.id === action.mockDatumId) {
          mockDatum.fieldKeys = mockDatum.fieldKeys.filter(
            (key) => key.id !== action.mockDatumKeyId
          );
        }
        return mockDatum;
      });
      return {
        ...state,
        mockData,
      };
    case actionTypes.UPDATE_MOCK_DATA_KEY:
      mockData = mockData.map((mockDatum) => {
        if (mockDatum.id === action.mockDatumId) {
          mockDatum.fieldKeys.map((fieldKey) => {
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
    case actionTypes.CLEAR_MOCK_DATA:
      return {
        mockData: [],
        hasMockData: false,
      };
    case actionTypes.REPLACE_TEST: {
      const { testState } = action;
      return testState;
    }
    default:
      return state;
  }
};

const dispatchToMockData = () => null;
const mockDataArr: [MockDataTypes, (action: Action) => void] = [mockDataState, dispatchToMockData]
export const MockDataContext = createContext(mockDataArr);
