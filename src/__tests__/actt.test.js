import '@testing-library/jest-dom/extend-expect';
import { fake } from 'test-data-bot';
import * as actions from '../context/actions/globalActions.js';
import { actionTypes } from '../context/actions/globalActions.js';

describe('The global action creatos should return expected actions', () => {
  it('return action with url as its payload', () => {
    const url = fake((f) => f.random.words());
    const expectedAction = {
      type: actionTypes.SET_PROJECT_URL,
      url,
    };
    expect(actions.setProjectUrl(url)).toEqual(expectedAction);
  });
  it('return action withthout a payload', () => {
    const expectedAction = {
      type: actionTypes.TOGGLE_FILE_DIRECTORY,
    };
    expect(actions.toggleFileDirectory()).toEqual(expectedAction);
  });
});
