
export interface AccTestCaseState {
  modalOpen: boolean;
  describeId: number;
  itId: number;
  statementId: number;
  propId: number;
  describeBlocks: DescribeBlocks
  itStatements: ItStatements;
  statements: Statements;
  id: number
}
export interface DescribeBlocks {
  byId: Object; 
  allIds: Array<any>
}
export interface ItStatements {
  byId: Object;
  allIds: Array<any>
}
export interface Statements {
  byId: Object;
  allIds: Array<any>;
  fileName: string;
  filePath: string;
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
  id?: number;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<Statements>;
  index?: number;
  text?: string;
  db?: string | boolean;
  dbFilePath?: string;
}

// type AccKeyValues = number | string | boolean | Assertion[] | Header[];

// interface forAcc {
//   [index: string]: AccKeyValues;
// }

export interface AccObj extends forAcc {
  id: number;
  type: string;
  testName: string;
  method: string;
  route: string;
  headers: Header[];
  post: boolean;
  postData: string;
}

// ### is this needed for acc?
// export interface Assertion {
// id: number;
// expectedResponse: string;
// value: string;
// matcher: string;
// not: boolean;
// }

export interface Header {
  id: number;
  headerName: string;
  headerValue: string;
}

export type EventTarget = {
target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
};

export interface AccTestMenuProps {
  dispatchToAccTestCase: (action: object) => void;
}

export interface AccTestStatementsProps extends AccTestMenuProps {
  accStatements: Array<AccStatements>;
}
