// is this needed?
export interface AccStatements {
  id: number;
  type: string;
  [key: string]: any;
}

export interface AccTestCaseState {
  modalOpen: boolean;
  serverFilePath: string;
  serverFileName: string;
  accStatements: AccObj[];
  dbFilePath: string;
  addDB: boolean | string;
}

// is this needed?
export interface Action {
  type: string;
  id?: number;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<AccStatements>;
  index?: number;
  text?: string;
  assertion?: Assertion;
  db?: string | boolean;
  dbFilePath?: string;
}

type AccKeyValues = number | string | boolean | Assertion[] | Header[];

interface forAcc {
  [index: string]: AccKeyValues;
}

export interface AccObj extends forAcc {
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

// export interface GlobalState {
//   url: string;
//   projectUrl: string;
//   isProjectLoaded: boolean;
//   fileTree: string;
//   componentName: string;
//   isFileDirectoryOpen: boolean;
//   isRightPanelOpen: boolean;
//   rightPanelDisplay: string;
//   isFolderOpen: object;
//   isFileHighlighted: string;
//   projectFilePath: string;
//   filePathMap: object;
//   file: string;
//   testCase: string;
//   docsOpen: boolean;
//   isTestModalOpen: boolean;
//   exportBool: boolean;
//   fileName: string;
//   filePath: string;
//   validCode: boolean;
// }

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

export interface AccTestMenuProps {
  dispatchToAccTestCase: (action: object) => void;
}

// export interface HooksTestModalProps extends HooksTestMenuProps {
//   isHooksModalOpen: boolean;
//   closeHooksModal: () => void;
// }

export interface AccTestStatementsProps extends AccTestMenuProps {
  accStatements: Array<AccStatements>;
}
