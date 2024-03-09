import { createContext } from 'react';
import { PuppeteerTestCaseState, PuppeteerAction } from '../../utils/puppeteerTypes';

export const PuppeteerTestCaseContext = createContext<any>([]);

export const puppeteerTestCaseState = {
  puppeteerStatements: [
    {
      id: 0,
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
  statementId: 1,
  modalOpen: false,
};

const createPuppeteerPaintTiming = (statementId: number) => ({
  id: statementId,
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
});

const createBrowserOption = (browserOptionId: number) => ({
  id: browserOptionId,
  optionKey: '',
  optionValue: '',
});

export const puppeteerTestCaseReducer = (
  state: PuppeteerTestCaseState,
  action: PuppeteerAction
) => {
  Object.freeze(state);
  let puppeteerStatements = [...state.puppeteerStatements];

  switch (action.type) {
    case 'DELETE_PUPPETEER_TEST':
      puppeteerStatements.splice(action.id, 1);
      puppeteerStatements.forEach((statement) => {
        if (statement.id > action.id) statement.id -= 1;
      });
      return {
        ...state,
        puppeteerStatements,
        statementId: state.statementId - 1,
      };

    case 'ADD_PUPPETEER_PAINT_TIMING': {
      const newPuppeteerPaintTiming = createPuppeteerPaintTiming(state.statementId);
      return {
        ...state,
        puppeteerStatements: [...puppeteerStatements, newPuppeteerPaintTiming],
        statementId: state.statementId + 1,
      };
    }

    case 'CREATE_NEW_PUPPETEER_TEST':
      return {
        puppeteerStatements: [
          {
            id: 0,
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
        statementId: 1,
      };

    case 'DELETE_BROWSER_OPTION':
      puppeteerStatements = puppeteerStatements.map((statement) => {
        if (statement.id === action.id) {
          const newBrowserOptions = statement.browserOptions.filter(
            (option) => option.id !== action.optionId
          );
          if (newBrowserOptions.length === 0) {
            return {
              ...statement,
              browserOptions: newBrowserOptions,
              hasBrowserOption: false,
            };
          }
          return {
            ...statement,
            browserOptions: newBrowserOptions,
          };
        }
        return statement;
      });
      return {
        ...state,
        puppeteerStatements,
      };

    case 'UPDATE_PAINT_TIMING':
      puppeteerStatements = puppeteerStatements.map((statement) => {
        if (statement.id === action.id) {
          statement[action.field] = action.value;
        }
        return statement;
      });
      return {
        ...state,
        puppeteerStatements,
      };

    case 'ADD_BROWSER_OPTIONS':
      puppeteerStatements = puppeteerStatements.map((statement) => {
        if (statement.id === action.id) {
          const newBrowserOption = createBrowserOption(statement.browserOptionId);
          return {
            ...statement,
            hasBrowserOption: true,
            browserOptions: [...statement.browserOptions, newBrowserOption],
            browserOptionId: statement.browserOptionId + 1,
          };
        }
        return statement;
      });
      return {
        ...state,
        puppeteerStatements,
      };

    case 'UPDATE_BROWSER_OPTION':
      puppeteerStatements = puppeteerStatements.map((statement) => {
        if (statement.id === action.id) {
          statement.browserOptions.map((option) => {
            if (option.id === action.optionId) {
              option[action.field] = action.value;
            }
            return option;
          });
        }
        return statement;
      });
      return {
        ...state,
        puppeteerStatements,
      };

    case 'UPDATE_STATEMENTS_ORDER':
      return {
        ...state,
        puppeteerStatements: [...action.draggableStatements],
      };
    case 'OPEN_INFO_MODAL':
      return {
        ...state,
        modalOpen: true,
      };
    case 'CLOSE_INFO_MODAL':
      return {
        ...state,
        modalOpen: false,
      };
    case 'REPLACE_TEST': {
      return action.testState;
    }
    default:
      return state;
  }
};
