export type allIdsType = {
  [key: string]: string[],
}

export interface AccTestCaseState {
  modalOpen: boolean;
  describeId: number;
  itId: number;
  statementId: number;
  propId: number;
  describeBlocks: DescribeBlocks
  itStatements: ItStatements;
  fileName: string;
  filePath: string;
  puppeteerUrl: string;
}

export type ByIdType = {
  [key: string | number]: Object,
  
}

export interface DescribeBlocks {
  byId: ByIdType;
  allIds: Array<string>;
}
export interface ItStatements {
  byId: ByIdType;
  allIds: allIdsType;
}
export interface Action {
  type: string;
  id?: string;
  draggableStatements?: Array<string>;
  index?: number;
  text?: string;
  itId: number;
  describeId: number | string;
  reorderedDescribe?: Array<string>;
  reorderedIt?: Array<string>;
  fileName?: string;
  filePath?: string;
  describeBlocks: any[];
  standardTag: string;
  catTag: string;
  puppeteerUrl?: string,
  testState?: string,
}
