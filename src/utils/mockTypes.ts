export interface MockDataArrayType {
  id: number,
  fieldKeys: Array<number>,
}

export interface MockDataProps {
  mockDatumId: number,
  dispatchToMockData: React.Dispatch<{id: number, name?: string}>,
  fieldKeys: Array<KeyType>
}

export interface MockDataTypes {
  mockData: Array<MockDataArrayType>,
  hasMockData: boolean,
}

// ADDED KEY
export interface KeyType {
  id: number,
  fieldKey: string,
  fieldType: string,
}

export interface MockDatumType {
  id: number,
  name: string,
  fieldKeys: Array<KeyType>,
  content: string,
  type: string,
}