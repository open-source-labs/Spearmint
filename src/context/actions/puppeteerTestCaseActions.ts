import { PuppeteerStatements } from '../../utils/puppeteerTypes';

export const actionTypes = {
  TOGGLE_PUPPETEER: 'TOGGLE_PUPPETEER',
  CREATE_NEW_PUPPETEER_TEST: 'CREATE_NEW_PUPPETEER_TEST',
  DELETE_PUPPETEER_TEST: 'DELETE_PUPPETEER_TEST',
  ADD_PUPPETEER_PAINT_TIMING: 'ADD_PUPPETEER_PAINT_TIMING',
  DELETE_PUPPETEER_PAINT_TIMING: 'DELETE_PUPPETEER_PAINT_TIMING',
  ADD_BROWSER_OPTIONS: 'ADD_BROWSER_OPTIONS',
  UPDATE_PAINT_TIMING: 'UPDATE_PAINT_TIMING',
  DELETE_BROWSER_OPTION: 'DELETE_BROWSER_OPTION',
  UPDATE_BROWSER_OPTION: 'UPDATE_BROWSER_OPTION',
  UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
  REPLACE_TEST: 'REPLACE_TEST',
};

export const togglePuppeteer = () => ({
  type: actionTypes.TOGGLE_PUPPETEER,
});

export const createNewPuppeteerTest = () => ({
  type: actionTypes.CREATE_NEW_PUPPETEER_TEST,
});

export const deletePuppeteerTest = (id: number) => ({
  type: actionTypes.DELETE_PUPPETEER_TEST,
  id,
});

export const addPuppeteerPaintTiming = () => ({
  type: actionTypes.ADD_PUPPETEER_PAINT_TIMING,
});

export const addBrowserOption = (id: number) => ({
  type: actionTypes.ADD_BROWSER_OPTIONS,
  id,
});

export const deleteBrowserOption = (id: number, optionId: number) => ({
  type: actionTypes.DELETE_BROWSER_OPTION,
  id,
  optionId,
});

export const updatePaintTiming = (id: number, field: string, value: string) => ({
  type: actionTypes.UPDATE_PAINT_TIMING,
  id,
  field,
  value,
});

export const updateBrowserOption = (
  id: number,
  field: string,
  value: string,
  optionId: number
) => ({
  type: actionTypes.UPDATE_BROWSER_OPTION,
  id,
  field,
  value,
  optionId,
});

export const updateStatementsOrder = (draggableStatements: Array<PuppeteerStatements>) => ({
  type: actionTypes.UPDATE_STATEMENTS_ORDER,
  draggableStatements,
});

export const openInfoModal = () => {
  return { type: actionTypes.OPEN_INFO_MODAL };
};

export const closeInfoModal = () => {
  return { type: actionTypes.CLOSE_INFO_MODAL };
};

export const puppeteerReplaceTest = (testState: object) => ({
  type: actionTypes.REPLACE_TEST,
  testState,
});
