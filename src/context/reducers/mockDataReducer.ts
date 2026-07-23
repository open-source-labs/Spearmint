import { createContext } from 'react';
import { actionTypes } from '../actions/mockDataActions';
import { Action } from '../../utils/reactTestCase';
import { MockDataTypes, KeyType, MockDatumType } from '../../utils/mockTypes';

export const mockDataState: MockDataTypes = {
  mockData: [],
  hasMockData: false,
};

let mockDatumId = 0;
let mockDatumKeyId = 0;

const createMockDatum = (): MockDatumType => ({
  id: mockDatumId++,
  name: '',
  fieldKeys: [],
  content: '',
  type: 'mockData',
});

const createFieldKeys = (): KeyType => ({
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
      mockData = mockData.filter(
        (mockDatum: MockDatumType) => mockDatum.id !== action.id
      );
      return {
        ...state,
        mockData,
      };
    case actionTypes.UPDATE_MOCK_DATA_NAME:
      mockData = mockData.map((mockDatum: MockDatumType) => {
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
      mockData = mockData.map((mockDatum: MockDatumType) => {
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
      mockData = mockData.map((mockDatum: MockDatumType) => {
        if (mockDatum.id === action.mockDatumId) {
          mockDatum.fieldKeys = mockDatum.fieldKeys.filter(
            (key: KeyType) => key.id !== action.mockDatumKeyId
          );
        }
        return mockDatum;
      });
      return {
        ...state,
        mockData,
      };
    case actionTypes.UPDATE_MOCK_DATA_KEY:
      mockData = mockData.map((mockDatum: MockDatumType) => {
        if (mockDatum.id === action.mockDatumId) {
          mockDatum.fieldKeys.map((key: KeyType) => {
            if (key.id === action.mockDatumKeyId) {
              key.fieldKey = action.fieldKey;
              key.fieldType = action.fieldType;
            }
            return key;
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
const mockDataArr: [MockDataTypes, (action: Action) => void] = [
  mockDataState,
  dispatchToMockData,
];
export const MockDataContext = createContext(mockDataArr);
