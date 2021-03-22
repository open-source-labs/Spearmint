
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
}
export interface DescribeBlocks {
  byId: Object; 
  allIds: Array<any>;
}
export interface ItStatements {
  byId: Object;
  allIds: Object;
}
export interface CustomInput {
  id: number;
  type: string;
  name: string;
  placeholder: string;
  defaultValue: string;
  label: string;
  bold: boolean;
}

export interface Action {
  type: string;
  id?: string;
  draggableStatements?: Array<string>;
  index?: number;
  text?: string;
  itId?: number;
  describeId?: number;
  reorderedDescribe?: Object;
  fileName?: string;
  filePath?: string;
  describeBlocks: DescribeBlocks;
  reorderedIt?: Array;

}





