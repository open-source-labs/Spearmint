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
export interface DescribeBlocks {
  byId: Object;
  allIds: Array<string>;
}
export interface ItStatements {
  byId: Object;
  allIds: Object;
}
export interface Action {
  type: string;
  id?: string;
  draggableStatements?: Array<string>;
  index?: number;
  text?: string;
  itId?: number;
  describeId?: number | string;
  reorderedDescribe?: Array<string>;
  reorderedIt?: Array<string>;
  fileName?: string;
  filePath?: string;
  describeBlocks: any[];
  standardTag: string;
  catTag: string;
}
