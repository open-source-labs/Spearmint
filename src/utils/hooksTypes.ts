export interface HooksStatements {
  id: number;
  type: string;
  [key: string]: any;
}

export interface HooksTestCaseState {
  hookFileName: string;
  hookFilePath: string;
  hooksTestStatement: string;
  hooksStatements: Hooks[];
  statementId: number;
}

export interface Assertion {
  id: number;
  expectedState: string;
  matcher: string;
  expectedValue: string;
  not: boolean;
}
export interface Callback {
  id: number;
  callbackFunc: string;
}

export interface Hooks {
  id: number;
  type: string;
  testName: string;
  hook: string;
  hookParams: string;
  assertions: Assertion[];
  callbackFunc: Callback[];
  typeof: boolean;
  hookFileName: string;
  hookFilePath: string;
}

export interface Action {
  type: string;
  id?: number;
  serverFileName?: string;
  serverFilePath?: string;
  draggableStatements?: Array<HooksStatements>;
  index?: number;
  text?: string;
  assertion?: Assertion;
  db?: string | boolean;
  dbFilePath?: string;
  dbFileName?: string;
  testState?: object;
}
/* ---------------------------- Actions In Reducer coming from hooksTestCaseActions ---------------------- */

export type HooksAction =
  | {
      type:
        | 'TOGGLE_HOOKS'
        | 'ADD_CONTEXT'
        | 'ADD_HOOK_UPDATES'
        | 'CREATE_NEW_HOOKS_TEST'
        | 'OPEN_INFO_MODAL'
        | 'CLOSE_INFO_MODAL'
        | 'REPLACE_TEST'
        | 'RESET_TESTS';
    }
  | { type: 'UPDATE_HOOKS_TEST_STATEMENT'; hooksTestStatement: string }
  | { type: 'DELETE_CONTEXT' | 'DELETE_HOOK_UPDATES' | 'TOGGLE_TYPEOF' | 'ADD_CALLBACKFUNC'; id: number }
  | {
      type: 'UPDATE_CONTEXT';
      id: number;
      queryVariant: string;
      querySelector: string;
      queryValue: string;
      values: string;
      textNodes: string;
      providerComponent: string;
      consumerComponent: string;
      context: string;
    }
  | {
      type: 'UPDATE_HOOK_UPDATES';
      id: number;
      hook: string;
      hookFileName: string;
      hookFilePath: string;
      callbackFunc: string;
      managedState: string;
      updatedState: string;
    }
  | { type: 'UPDATE_HOOKS_FILEPATH'; hookFileName: string; hookFilePath: string }
  | { type: 'UPDATE_CONTEXT_FILEPATH'; contextFileName: string; contextFilePath: string }
  | { type: 'UPDATE_STATEMENTS_ORDER'; draggableStatements: Array<object> }
  | { type: 'ADD_ASSERTION'; index: number }
  | { 
      type: 'UPDATE_ASSERTION'; 
      index: number;
      id: number;
      assertion: Assertion 
    }
  | { type: 'DELETE_ASSERTION'; index: number; id: number }
  | { type: 'UPDATE_CALLBACKFUNC'; index: number; id: number; callbackFunc: Callback }
  | { type: 'DELETE_CALLBACKFUNC'; index: number; id: number; };

export interface HooksTestMenuProps {
  dispatchToHooksTestCase: (action: object) => void;
}

export interface HooksTestModalProps {
  isHooksModalOpen: boolean;
  closeHooksModal: () => void;
}

export interface HooksTestStatementsProps extends HooksTestMenuProps {
  hooksStatements: Array<HooksStatements>;
}
