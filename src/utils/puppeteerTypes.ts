export interface PuppeteerTestMenuProps {
  dispatchToPuppeteerTestCase: (action: object) => void;
}

export interface PuppeteerTestModalProps extends PuppeteerTestMenuProps {
  isPuppeteerModalOpen: boolean;
  closePuppeteerModal: () => void;
}

export interface PuppeteerTestStatementsProps extends PuppeteerTestMenuProps {
  puppeteerStatements: Array<PuppeteerStatements>;
}

export interface PuppeteerTestCaseState {
  puppeteerStatements: Array<PuppeteerStatements>;
  statementId: number;
  modalOpen: boolean;
}

export interface PuppeteerStatements {
  id: number;
  type: string;
  describe: string;
  url: string;
  browserOptions: Array<BrowserOptions>;
  hasBrowserOption: boolean;
  browserOptionId: number;
  [key: string]: any;
}

export interface BrowserOptions {
  id: number;
  optionKey: string;
  optionValue: string;
  [key: string]: any;
}

export type PuppeteerAction =
  | {
      type:
        | 'TOGGLE_PUPPETEER'
        | 'CREATE_NEW_PUPPETEER_TEST'
        | 'ADD_PUPPETEER_PAINT_TIMING'
        | 'ADD_HOOK_UPDATES'
        | 'ADD_HOOKRENDER'
        | 'CREATE_NEW_HOOKS_TEST'
        | 'OPEN_INFO_MODAL'
        | 'CLOSE_INFO_MODAL';
    }
  | { type: 'DELETE_PUPPETEER_TEST' | 'ADD_BROWSER_OPTIONS'; id: number }
  | { type: 'DELETE_BROWSER_OPTION'; id: number; optionId: number }
  | { type: 'UPDATE_PAINT_TIMING'; id: number; field: string; value: string }
  | { type: 'UPDATE_BROWSER_OPTION'; id: number; field: string; value: string; optionId: number }
  | { type: 'UPDATE_STATEMENTS_ORDER'; draggableStatements: Array<object> };
