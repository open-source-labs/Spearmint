import { puppeteerTestCaseReducer } from '../context/reducers/puppeteerTestCaseReducer';
import { PuppeteerTestCaseState, PuppeteerAction } from '../utils/puppeteerTypes';

describe('puppeteerTestCaseReducer', () => {
  let state: PuppeteerTestCaseState;

  beforeEach(() => {
    state = {
      puppeteerStatements: [
        {
          describe: 'Home page performance',
          firstPaintIt: 'should have its first paint in less than 100 ms',
          firstPaintTime: '100',
          hasBrowserOption: true,
          id: 0,
          type: 'paintTiming',
          url: 'http://localhost:8080/',
          browserOptions: [
            {
              id: 0,
              optionKey: 'headless',
              optionValue: 'false',
            },
          ],
          FCPIt: 'should have its first contentful paint in less than 200 ms',
          FCPtTime: '200',
          LCPIt: 'should have its largest contentful paint paint in less than 300 ms',
          LCPTime: '300',
          browserOptionId: 1,
        },
      ],

      statementId: 1,
    };
  });

  it('should handle TOGGLE_PUPPETEER', () => {
    const action: PuppeteerAction = { type: 'TOGGLE_PUPPETEER' };
    state = {
      puppeteerStatements: [],
      statementId: 0,
    };
    expect(puppeteerTestCaseReducer(state, action)).toEqual({
      puppeteerStatements: [],
      statementId: 0,
    });
  });

  it('should handle DELETE_PUPPETEER_TEST', () => {
    const action: PuppeteerAction = { type: 'DELETE_PUPPETEER_TEST', id: 0 };
    expect(puppeteerTestCaseReducer(state, action)).toEqual({
      puppeteerStatements: [],
      statementId: 1,
    });
  });

  it('should handle ADD_PUPPETEER_PAINT_TIMING', () => {
    const action: PuppeteerAction = { type: 'ADD_PUPPETEER_PAINT_TIMING' };
    expect(puppeteerTestCaseReducer(state, action)).toEqual({
      ...state,
      puppeteerStatements: [
        ...state.puppeteerStatements,
        {
          id: 1,
          type: 'paintTiming',
          describe: '',
          url: '',
          browserOptions: [],
          firstPaintIt: '',
          firstPaintTime: null,
          FCPIt: '',
          FCPtTime: null,
          LCPIt: '',
          LCPTime: null,
          hasBrowserOption: false,
          browserOptionId: 0,
        },
      ],
      statementId: 2,
    });
  });

  it('should handle DELETE_BROWSER_OPTION', () => {
    const action: PuppeteerAction = { type: 'DELETE_BROWSER_OPTION', id: 0, optionId: 0 };
    expect(puppeteerTestCaseReducer(state, action)).toEqual({
      ...state,
      puppeteerStatements: [
        {
          ...state.puppeteerStatements[0],
          hasBrowserOption: false,
          browserOptions: [],
        },
      ],
    });
  });
  it('should handle UPDATE_PAINT_TIMING', () => {
    const action: PuppeteerAction = {
      type: 'UPDATE_PAINT_TIMING',
      id: 0,
      field: 'describe',
      value: 'new description',
    };
    expect(puppeteerTestCaseReducer(state, action)).toEqual({
      ...state,
      puppeteerStatements: [
        {
          ...state.puppeteerStatements[0],
          describe: 'new description',
        },
      ],
    });
  });
  it('should handle ADD_BROWSER_OPTIONS', () => {
    const action: PuppeteerAction = { type: 'ADD_BROWSER_OPTIONS', id: 0 };
    expect(puppeteerTestCaseReducer(state, action)).toEqual({
      ...state,
      puppeteerStatements: [
        {
          ...state.puppeteerStatements[0],
          browserOptions: [
            {
              id: 0,
              optionKey: 'headless',
              optionValue: 'false',
            },
            {
              id: 1,
              optionKey: '',
              optionValue: '',
            },
          ],
          browserOptionId: 2,
        },
      ],
    });
  });

  it('should handle UPDATE_BROWSER_OPTION', () => {
    const action: PuppeteerAction = {
      type: 'UPDATE_BROWSER_OPTION',
      id: 0,
      field: 'optionValue',
      value: 'true',
      optionId: 0,
    };
    expect(puppeteerTestCaseReducer(state, action)).toEqual({
      ...state,
      puppeteerStatements: [
        {
          ...state.puppeteerStatements[0],
          browserOptions: [
            {
              id: 0,
              optionKey: 'headless',
              optionValue: 'true',
            },
          ],
        },
      ],
    });
  });
});
