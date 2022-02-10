export interface EndpointStatements {
  id: number;
  type: string;
  [key: string]: any;
}

export interface EndpointTestCaseState {
  modalOpen: boolean;
  serverFilePath: string;
  serverFileName: string;
  endpointStatements: EndpointObj[];
  dbFilePath: string;
  dbFileName: string;
  addDB: boolean | string;
}

export interface Action {
  type: string;
  id?: number;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<EndpointStatements>;
  index?: number;
  text?: string;
  assertion?: Assertion;
  db?: string | boolean;
  dbFilePath?: string;
  dbFileName?: string;
  testState?: object;
}

type EndpointKeyValues = number | string | boolean | Assertion[] | Header[];

interface forEndpoint {
  [index: string]: EndpointKeyValues;
}

export interface EndpointObj extends forEndpoint {
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
export interface EndpointTestMenuProps {
  dispatchToEndpointTestCase: (action: object) => void;
}
export interface EndpointTestStatementsProps extends EndpointTestMenuProps {
  endpointStatements: Array<EndpointStatements>;
}
