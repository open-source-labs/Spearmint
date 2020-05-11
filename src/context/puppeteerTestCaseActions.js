export const actionTypes = {
  TOGGLE_PUPPETEER: 'TOGGLE_PUPPETEER',
  CREATE_NEW_PUPPETEER_TEST: 'CREATE_NEW_PUPPETEER_TEST',
  ADD_PUPPETEERFORM: 'ADD_PUPPETEERFORM',
  DELETE_PUPPETEER_TEST: 'DELETE_PUPPETEER_TEST',
  ADD_PUPPETEER_PAINT_TIMING: 'ADD_PUPPETEER_PAINT_TIMING',
  DELETE_PUPPETEER_PAINT_TIMING: 'DELETE_PUPPETEER_PAINT_TIMING',
};

export const togglePuppeteer = () => ({
  type: actionTypes.TOGGLE_PUPPETEER,
});

export const createNewPuppeteerTest = () => ({
  type: actionTypes.CREATE_NEW_PUPPETEER_TEST,
});

export const addPuppeteerForm = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});

export const deletePuppeteerTest = id => ({
  type: actionTypes.DELETE_PUPPETEER_TEST,
  id,
});

export const addPuppeteerPaintTiming = () => ({
  type: actionTypes.ADD_PUPPETEER_PAINT_TIMING
});

