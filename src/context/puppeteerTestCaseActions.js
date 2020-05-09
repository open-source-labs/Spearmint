export const actionTypes = {
  TOGGLE_PUPPETEER: 'TOGGLE_PUPPETEER',
  CREATE_NEW_PUPPETEER_TEST: 'CREATE_NEW_PUPPETEER_TEST',
  ADD_PUPPETEERFORM: 'ADD_PUPPETEERFORM',
  DELETE_PUPPETEERFORM: 'DELETE_PUPPETEERFORM',
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

export const deletePuppeteerForm = id => ({
  type: actionTypes.DELETE_PUPPETEERFOR,
  id,
});

