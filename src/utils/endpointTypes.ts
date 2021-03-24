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

// export type EndpointAction =
//    {
//       type:
//         | 'TOGGLE_ENDPOINT'
//         | 'CREATE_NEW_ENDPOINT_TEST'
//         | 'ADD_ENDPOINT'
//         | 'OPEN_INFO_MODAL'
//         | 'CLOSE_INFO_MODAL';
//     }
//   | { type: 'TOGGLE_POST'; index: number }
//   | { type: 'UPDATE_ENDPOINT_STATEMENTS_ORDER'; draggableStatements: string }
//   | { type: 'UPDATE_SERVER_FILEPATH'; serverFilePath: string; serverFileName: string }
//   | { type: 'DELETE_ENDPOINT' | 'ADD_HEADER' | 'ADD_ASSERTION'; id: number}
//   | { type: 'UPDATE_ENDPOINT'; endpoint: object; id: number}
//   | { type: 'UPDATE_STATEMENTS_ORDER'; draggableStatements: Array<EndpointStatements> }
//   | { type: 'DELETE_HEADER' | 'DELETE_ASSERTION'; index: number; id: number }
  
//   | { type: 'UPDATE_POST'; text: string; index: number }
//   | { type: 'UPDATE_ASSERTION'; id: number; index: number; assertion: Assertion }
//   | { type: 'TOGGLE_DB'; db: string | boolean }
//   | { type: 'UPDATE_DB_FILEPATH'; dbFilePath: string };
