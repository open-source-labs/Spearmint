import { createContext } from 'react';
import { actionTypes } from './puppeteerTestCaseActions';

export const PuppeteerTestCaseContext = createContext(null);

export const puppeteerTestCaseState = {
  puppeteerTestStatement: '',
  puppeteerStatements: [],
  hasPuppeteer: 0,
};

let statementId = 0;

const createPuppeteerForm = () => ({
  id: statementId++,
  type: 'puppeteerForm',
});

const createPuppeteerPaintTiming = () => ({
  id: statementId++,
  type: 'paintTiming',
  describe: '',
  url: '',
  browserOptions: [],
  firstPaintIt: '',
  firstPaintTime: null,
  FCPIt: '',
  FCPtTime: null,
  LCPPaint: '',
  LCPTime: null,
  hasBrowserOption: false,
  browserOptionId: 0,
});


const createBrowserOption = browserOptionId => ({
  id: browserOptionId++,
  optionKey: '',
  optionValue: '',
})

export const puppeteerTestCaseReducer = (state, action) => {
  Object.freeze(state);
  let puppeteerStatements = [...state.puppeteerStatements];

  switch (action.type) {
    case actionTypes.TOGGLE_PUPPETEER:
      return {
        ...state,
        hasPuppeteer: state.hasPuppeteer + 1,
      };

    case actionTypes.ADD_PUPPETEERFORM:
      puppeteerStatements.push(createPuppeteerForm());
      return {
        ...state,
        puppeteerStatements,
      };
    case actionTypes.DELETE_PUPPETEER_TEST:
      puppeteerStatements = puppeteerStatements.filter(statement => statement.id !== action.id);
      return {
        ...state,
        puppeteerStatements,
      };

    case actionTypes.ADD_PUPPETEER_PAINT_TIMING:
      puppeteerStatements.push(createPuppeteerPaintTiming());
      return {
        ...state,
        puppeteerStatements,
      };

    case actionTypes.CREATE_NEW_PUPPETEER_TEST:
      return {
        puppeteerTestStatement: '',
        puppeteerStatements: [],
        hasPuppeteer: 0,
      };

    case actionTypes.DELETE_BROWSER_OPTION:
      puppeteerStatements = puppeteerStatements.map(statement => {
        if (statement.id === action.id) {
          statement.browserOptions = statement.browserOptions.filter(option => option.id !== action.optionId);
        }
        return statement;
      });
      return {
        ...state,
        puppeteerStatements,
      };

    case actionTypes.UPDATE_PAINT_TIMING: 
    puppeteerStatements = puppeteerStatements.map(statement => {
      if(statement.id === action.id) {
        statement[action.field] = action.value
      }
      return statement
    })
    return {
      ...state,
        puppeteerStatements,
    }

    case actionTypes.ADD_BROWSER_OPTIONS:
      puppeteerStatements = puppeteerStatements.map(statement => {
        if (statement.id === action.id) {
          statement.browserOptions.push(createBrowserOption(statement.browserOptionId));
        }
        statement.hasBrowserOption = true
        statement.browserOptionId++
        return statement;
      });
      return {
        ...state,
        puppeteerStatements,
      };  

    case actionTypes.UPDATE_BROWSER_OPTION:
      puppeteerStatements = puppeteerStatements.map(statement => {
        if (statement.id === action.id) {
          statement.browserOptions.map(option => {
            if (option.id === action.optionId) {
              option[action.field] = action.value
            }
            return option
          })
        }
        return {
          ...state,
          puppeteerStatements,
        }
      })
    default:
      return state;
  }
};
