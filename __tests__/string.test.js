const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fake
} from 'test-data-bot';
import React from "react";
import '@testing-library/jest-dom/extend-expect';

describe(' works properly', () => {
  let state = ;

  beforeEach(() => {
    state =
  });

  it('', () => {
    expect((state, {
      type: actionTypes.,
      :
    })).toEqual({
      ...state,
      :
    })
  })

  it('', () => {
    const = () => {
      const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
      }
      const next = jest.fn()
      const invoke = action => (store)(next)(action)
      return {
        store,
        next,
        invoke
      }
    }
  });


  it('', () => {
    const expectedAction = {
      type: types.
    };
    expect(actions.()).toEqual(expectedAction);
  });

  it('', () => {
    fetchMock.('', );
    const expectedActions = ;
    const store = mockStore();
    return store.dispatch(actions.()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });
});