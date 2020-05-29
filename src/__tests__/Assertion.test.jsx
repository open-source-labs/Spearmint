import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReactTestCaseContext } from '../context/reducers/reactTestCaseReducer';
import { MockDataContext } from '../context/reducers/mockDataReducer';
import Assertion from '../components/Assertion/Assertion';

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
    const div = document.createElement('div');
    ReactDOM.render(
      <ReactTestCaseContext.Provider value={[reactTestCaseState, dispatchToReactTextCase]}>
        <MockDataContext.Provider value={[mockDataState, dispatchToMockData]}>
          <Assertion {...reactTestCaseState} />
        </MockDataContext.Provider>
      </ReactTestCaseContext.Provider>, div,
    );
  });
});
