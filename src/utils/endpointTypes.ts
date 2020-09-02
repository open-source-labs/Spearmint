export interface EndpointStatements {
  id: number;
  type: string;
  [key: string]: any;
}

export interface EndpointTestCaseState {
  modalOpen: boolean;
  serverFilePath: string;
  serverFileName: string;
  endpointStatements: Endpoint[];
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
}

export interface Endpoint {
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

// export type HooksAction =
// | { type: 'TOGGLE_HOOKS' | 'ADD_CONTEXT' | 'ADD_HOOKRENDER' | 'ADD_HOOK_UPDATES' | 'ADD_HOOKRENDER' | 'CREATE_NEW_HOOKS_TEST' }
// | { type: 'UPDATE_HOOKS_TEST_STATEMENT'; hooksTestStatement: string }
// | { type: 'DELETE_CONTEXT' | 'DELETE_HOOKRENDER' | 'DELETE_HOOK_UPDATES'; id: number }
// | { type: 'UPDATE_CONTEXT'; id: number; queryVariant: string; querySelector: string; queryValue: string; values: string; textNodes: string; providerComponent: string; consumerComponent: string; context: string; }
// | { type: 'UPDATE_HOOKRENDER'; id: number; hook: string; parameterOne: string; expectedReturnValue: string; returnValue: string; }
// | { type: 'UPDATE_HOOK_UPDATES'; id: number; hook: string; hookFileName: string; hookFilePath: string; callbackFunc: string; managedState: string; updatedState: string;}
// | { type: 'UPDATE_HOOKS_FILEPATH'; hookFileName: string; hookFilePath: string }
// | { type: 'UPDATE_CONTEXT_FILEPATH'; contextFileName: string; contextFilePath: string }
// | { type: 'UPDATE_STATEMENTS_ORDER'; draggableStatements: Array<object> };

export interface EndpointTestMenuProps {
  dispatchToEndpointTestCase: (action: object) => void;
}

// export interface HooksTestModalProps extends HooksTestMenuProps {
//   isHooksModalOpen: boolean;
//   closeHooksModal: () => void;
// }

export interface EndpointTestStatementsProps extends EndpointTestMenuProps {
  endpointStatements: Array<EndpointStatements>;
}
