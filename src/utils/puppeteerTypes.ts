export interface PuppeteerTestMenuProps {
  dispatchToPuppeteerTestCase: (action: object) => void;
}

export interface PuppeteerTestModalProps {
  isPuppeteerModalOpen: boolean;
  closePuppeteerModal: () => void;
}

export interface PuppeteerTestStatementsProps extends PuppeteerTestMenuProps {
  puppeteerStatements: Array<PuppeteerStatements>;
}

export interface PuppeteerTestCaseState {
  puppeteerStatements: Array<PuppeteerStatements>;
  statementId: number;
}

export interface PuppeteerStatements {
  id: number;
  type: string;
  // paintTiming: PuppeteerStatements;
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

export interface paintTimingType {
  id: number,
  firstPaintIt?: string,
  firstPaintTime?: number,
  FCPIt?: string,
  FCPTime?: number,
  LCPIt?: string,
  LCPTime?: number,
}

export type PuppeteerAction =
  | {
      type:
        | 'TOGGLE_PUPPETEER'
        | 'CREATE_NEW_PUPPETEER_TEST'
        | 'ADD_PUPPETEER_PAINT_TIMING'
        | 'OPEN_INFO_MODAL'
        | 'CLOSE_INFO_MODAL'
        | 'REPLACE_TEST'; testState: any
    }
  | { type: 'DELETE_PUPPETEER_TEST' | 'ADD_BROWSER_OPTIONS'; id: number }
  | { type: 'DELETE_BROWSER_OPTION'; id: number; optionId: number }
  | { type: 'UPDATE_PAINT_TIMING'; id: number; field: string; value: string }
  | { type: 'UPDATE_BROWSER_OPTION'; id: number; field: string; value: string; optionId: number }
  | { type: 'UPDATE_STATEMENTS_ORDER'; draggableStatements: Array<object> }
