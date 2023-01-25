import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReactTestCaseContext } from '../context/reducers/reactTestCaseReducer';
import { MockDataContext } from '../context/reducers/mockDataReducer';
import Action from '../components/ReactTestComponent/Action/Action';

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
    type: 'action',
    eventType: '',
    eventValue: null,
    queryVariant: '',
    querySelector: '',
    queryValue: '',
    suggestions: [],
  },
};

const mockDataState = {
  mockData: [],
  hasMockData: false,
};

xdescribe('Assertion ', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(
      <ReactTestCaseContext.Provider value={[reactTestCaseState, dispatchToReactTextCase]}>
        <MockDataContext.Provider value={[mockDataState, dispatchToMockData]}>
          <Action {...reactTestCaseState} />
        </MockDataContext.Provider>
      </ReactTestCaseContext.Provider>
    );
  });
});
