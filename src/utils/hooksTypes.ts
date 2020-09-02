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

export interface Action {
  type: string;
  id?: number;
  context?: string;
  hook?: string;
  parameters?: any;
  expectedState?: any;
  expectedValue?: any;
  textNodes?: string;
  queryVariant?: string;
  querySelector?: string;
  queryValue?: string;
  values?: string;
  providerComponent?: string;
  consumerComponent?: string;
  draggableStatements?: Array<HooksStatements>;
  index?: number;
  text?: string;
  contextFileName?: string;
  contextFilePath?: string;
  assertions?: Assertion;
}

export interface Hooks {
  id: number;
  type: string;
  testName: string;
  hook: string;
  hookParams: string;
  assertions: Assertion[];
  typeof: boolean;
  callbackFunc: string;
}
/* ---------------------------- Actions In Reducer coming from hooksTestCaseActions ---------------------- */

// export type HooksAction =
//   | {
//       type:
//         | 'TOGGLE_HOOKS'
//         | 'ADD_CONTEXT'
//         | 'ADD_HOOKRENDER'
//         | 'ADD_HOOK_UPDATES'
//         | 'ADD_HOOKRENDER'
//         | 'CREATE_NEW_HOOKS_TEST';
//     }
//   | { type: 'UPDATE_HOOKS_TEST_STATEMENT'; hooksTestStatement: string }
//   | { type: 'DELETE_CONTEXT' | 'DELETE_HOOKRENDER' | 'DELETE_HOOK_UPDATES'; id: number }
//   | {
//       type: 'UPDATE_CONTEXT';
//       id: number;
//       queryVariant: string;
//       querySelector: string;
//       queryValue: string;
//       values: string;
//       textNodes: string;
//       providerComponent: string;
//       consumerComponent: string;
//       context: string;
//     }
//   | {
//       type: 'UPDATE_HOOKRENDER';
//       id: number;
//       hook: string;
//       parameterOne: string;
//       expectedReturnValue: string;
//       returnValue: string;
//     }
//   | {
//       type: 'UPDATE_HOOK_UPDATES';
//       id: number;
//       hook: string;
//       hookFileName: string;
//       hookFilePath: string;
//       callbackFunc: string;
//       managedState: string;
//       updatedState: string;
//     }
//   | { type: 'UPDATE_HOOKS_FILEPATH'; hookFileName: string; hookFilePath: string }
//   | { type: 'UPDATE_CONTEXT_FILEPATH'; contextFileName: string; contextFilePath: string }
//   | { type: 'UPDATE_STATEMENTS_ORDER'; draggableStatements: Array<object> };

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
