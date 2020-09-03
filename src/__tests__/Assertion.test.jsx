import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReactTestCaseContext } from '../context/reducers/reactTestCaseReducer';
import { MockDataContext } from '../context/reducers/mockDataReducer';
import Assertion from '../components/ReactTestComponent/Assertion/Assertion';
import userEvent from '@testing-library/user-event';

const dispatchToReactTextCase = jest.fn();
const dispatchToMockData = jest.fn();

const reactTestCaseState = {
  describeId: 'describe0',
  itId: 'it0',
  statementId: 'statement0',
  statement: {
    id: 'statement0',
    itId: 'it0',
    describeId: 'describe0',
    type: 'assertion',
    queryVariant: '',
    querySelector: '',
    queryValue: '',
    isNot: false,
    matcherType: '',
    matcherValue: '',
    suggestions: [],
  },
};

const mockDataState = {
  mockData: [],
  hasMockData: false,
};

describe('Assertion ', () => {
  it('renders without crashing', () => {
    // const div = document.createElement('div');

    const { getByText, getAllByRole, debug } = render(
      <ReactTestCaseContext.Provider value={[reactTestCaseState, dispatchToReactTextCase]}>
        <MockDataContext.Provider value={[mockDataState, dispatchToMockData]}>
          <Assertion {...reactTestCaseState} />
        </MockDataContext.Provider>
      </ReactTestCaseContext.Provider>
    );
    expect(getByText('Assertion')).toBeInTheDocument;

    expect(getAllByRole('textbox')).toBeInTheDocument;
    // expect()
    // expect(screen.getAllByRole('Query', { name: 'Query' })).toHaveValue('Hello,\nWorld!');

    debug();
  });
});
