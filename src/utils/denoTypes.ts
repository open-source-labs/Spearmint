export interface DenoStatements {
  id: number;
  type: string;
  [key: string]: any;
}

export interface DenoTestCaseState {
  modalOpen: boolean;
  serverFilePath: string;
  serverFileName: string;
  denoStatements: DenoObj[];
  dbFilePath: string;
  dbFileName: string;
  addDB: boolean | string;
}

export interface Action {
  type: string;
  id?: number;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<DenoStatements>;
  index?: number;
  text?: string;
  assertion?: Assertion;
  db?: string | boolean;
  dbFilePath?: string;
  dbFileName?: string;
  testState?: object;
}

type DenoKeyValues = number | string | boolean | Assertion[] | Header[];

interface forDeno {
  [index: string]: DenoKeyValues;
}

export interface DenoObj extends forDeno {
  id: number;
  type: string;
  testName: string;
  method: string;
  route: string;
  assertions: Assertion[];
  headers: Header[];
  post: boolean;
  postData: string;
}

export interface Assertion {
  id: number;
  expectedResponse: string;
  value: string;
  matcher: string;
  not: boolean;
}

export interface Header {
  id: number;
  headerName: string;
  headerValue: string;
}

export type EventTarget = {
  target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
};
export interface DenoTestMenuProps {
  dispatchToDenoTestCase: (action: object) => void;
}
export interface DenoTestStatementsProps extends DenoTestMenuProps {
  denoStatements: Array<DenoStatements>;
}
