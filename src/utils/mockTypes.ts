export interface MockDataArrayType {
  id: number,
  fieldKeys: Array<number>,
}

export interface MockDatumType {
  id: number,
  name: string,
  fieldKeys: Array<KeyType>,
  content: string,
  type: string,
}

export interface MockDataProps {
  mockDatumId: number,
  dispatchToMockData: React.Dispatch<KeyDispatchMock | DispatchMock>,
  fieldKeys: Array<KeyType>
}

export interface DispatchMock {
  type: string,
  id: number,
  name?: string,
}

export interface MockDataTypes {
  mockData: Array<MockDataArrayType>,
  hasMockData: boolean,
}

export interface KeyType {
  id: number,
  fieldKey: string,
  fieldType: string,
}

export interface MockDataKeyProps {
  dispatchToMockData: React.Dispatch<KeyDispatchMock | DispatchMock>,
  mockDatumId: number,
  mockDatumKeyId: number,
  fieldKey: string,
  fieldType: string
}

export interface KeyDispatchMock {
  mockDatumId: number,
  mockDatumKeyId: number,
  fieldKey?: string,
  fieldType?: string,
}