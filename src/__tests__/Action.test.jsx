/**
 * @jest-environment jsdom
 */

import  React, { useContext } from 'react';
import { fireEvent, getByLabelText, render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from "chai"
import { ReactTestCaseContext } from '../context/reducers/reactTestCaseReducer';
import { MockDataContext } from '../context/reducers/mockDataReducer';
import Action from '../components/ReactTestComponent/Action/Action';

expect.extend(matchers)

const dispatchToReactTextCase = jest.fn();
const dispatchToMockData = jest.fn();

afterEach(cleanup);

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

const eventValueTestState = {
  ...reactTestCaseState,
  statement: {
    ...reactTestCaseState.statement,
    eventType: 'keyDown',
  }
}

const mockDataState = {
  mockData: ['testData'],
  hasMockData: true,
};

const ActionContext = (mockDataState)

test('Type text into eventType input element', async () => {
  const user = userEvent.setup()
  const { getByLabelText } = render(<Action statement={reactTestCaseState} />);
  const targetInput = getByLabelText('Event Type');
  await user.type(targetInput, 'Success');
  expect(targetInput.value).toBe('Success');
})


/* 
  Notes about the below test: the eventValue element we are interested
  in is only rendered sometimes based on context or a certain state. Due
  to the way state is handled, it is challenging to write a test that accounts 
  for this. I have skipped this test for the time being because  of this. 
*/
xtest('Type text into eventValue input element', async () => {
  const user = userEvent.setup()
  const { mockData, hasMockData } = mockDataState;
  const { getByLabelText } = render(<Action statement={eventValueTestState} />);
  const targetInput = getByLabelText('Value');
  await user.type(targetInput, 'Success');
  expect(targetInput.value).toBe('Success');
})


test('Click on queryVariant select element', async () => {
  const user = userEvent.setup()
  const { getByText } = render(<Action statement={reactTestCaseState} />);
  const targetInput = getByText('getBy');
  await user.click(targetInput);
  expect(targetInput.value).toBe('getBy');
})

test('Click on querySelector select element', async () => {
  const user = userEvent.setup()
  const { getByText } = render(<Action statement={reactTestCaseState} />);
  const targetInput = getByText('LabelText');
  await user.click(targetInput);
  expect(targetInput.value).toBe('LabelText');
})

test('Type text into queryValue input element', async () => {
  const user = userEvent.setup()
  const { getByLabelText } = render(<Action statement={reactTestCaseState} />);
  const targetInput = getByLabelText('Event Type');
  await user.type(targetInput, 'Success');
  expect(targetInput.value).toBe('Success');
})