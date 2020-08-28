window.require = jest.fn();

import { actionTypes, ReduxTestCaseState } from '../utils/reduxTypes';

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReduxTestCaseContext } from '../context/reducers/reduxTestCaseReducer';
import { MockDataContext } from '../context/reducers/mockDataReducer';
import ReduxTestMenu from '../components/TestMenu/ReduxTestMenu';

const dispatchToReduxTextCase = jest.fn();
const dispatchToMockData = jest.fn();

export const reduxTestCaseState: ReduxTestCaseState = {
  reduxTestStatement: '' /* the test description */,
  reduxStatements: [] /* both of the cards on the page at open. Each card gets an id */,
};

const mockDataState = {
  mockData: [],
  hasMockData: false,
};

describe('should render ReduxTestCase component', () => {
  it('renders Test Menu', () => {
    const { getByText, debug } = render();
    <ReduxTestCaseContext.Provider value={(reduxTestCaseState, dispatchToReduxTextCase)}>
      <MockDataContext.Provider value={(mockDataState, dispatchToMockData)}>
        <ReduxTestMenu />;
      </MockDataContext.Provider>
    </ReduxTestCaseContext.Provider>;
    expect(getByText('test'));
    screen.debug();
  });
});
