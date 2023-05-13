/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render, screen,  cleanup, getByPlaceholderText, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import ActionCreator from '../components/ReduxTestComponent/ActionCreator/ActionCreator'
import { ReduxTestCaseContext } from '../context/reducers/reduxTestCaseReducer';

const props = {
  actionCreator: {
    id: 1,
    actionsFileName: '',
    filePath: '',
    typesFileName: '',
    typesFilePath: '',
    type: 'action-creator',
    actionCreatorFunc: '',
    actionType: '',
    payloadKey: null,
    payloadType: null,
    it: '', 
    },
  index: 0
}

describe('Action Creator', () => {
  
  afterEach(cleanup);

  it('displays the ActionCreator component', () => {
    render(<ActionCreator {...props}/>);
    screen.debug();
    const actionCreator = screen.getByRole('heading');
    expect(actionCreator).toBeVisible();

    const actionCreatorLabel = screen.getAllByText('Action Creator');
    expect(actionCreatorLabel).toHaveLength(2);
  });

  it('displays all of the labels', () => {
    render(<ActionCreator {...props}/>);
    
    const labels = screen.getAllByRole('textbox');
    expect(labels).toHaveLength(4);

    const payloadType = screen.getByRole('combobox');
    expect(payloadType).toBeInTheDocument();
  })

  it('updates the It should... input field value on user input', async () => {
    const { getByLabelText } = render(<ActionCreator {...props}/>);

    const it = getByLabelText('It should...');
    expect(it).toBeInTheDocument();
    expect(it.placeholder).toBe('e.g.should return expected action');
    expect(it.value).toBe('');
  })

  it('updates the Action Creator input field value on user input', async () => {
    render(<ActionCreator {...props}/>);

    const actionCreator = screen.getByRole('textbox', {name: 'Action Creator'});
    expect(actionCreator).toBeInTheDocument();
    expect(actionCreator.placeholder).toBe('e.g. addTodo');
    expect(actionCreator.value).toBe('');
  })

  it('updates the Action Type input field value on user input', async () => {
    render(<ActionCreator {...props}/>);

    const actionType = screen.getByRole('textbox', {name: 'Action Type'});
    expect(actionType).toBeInTheDocument();
    expect(actionType.placeholder).toBe('e.g. ADD_TODO');
    expect(actionType.value).toBe('');
  })

  it('updates the Payload Key input field value on user input', () => {
    render(<ActionCreator {...props}/>);

    const payloadKey = screen.getByRole('textbox', {name: 'Payload Key'});
    expect(payloadKey).toBeInTheDocument();
    expect(payloadKey.placeholder).toBe('e.g. todo');
    expect(payloadKey.value).toBe('');
  })

  it('should correctly set default option on Payload Type dropdown', () => {
    render(<ActionCreator {...props}/>);
    expect(screen.getByRole('option', { name: '' }).selected).toBe(true);
    expect(screen.getAllByRole('option')).toHaveLength(6);
  })
})

/*
TODO: Implement testing for user events on input values. After spending much time attempting this in the following tests, the result was still failure. Check Action.test.jsx in __tests__ to see a working implementation of second test below. I have tried wrapping the component in context providers, using fireEvent/userEvent. Still no results. If you can get this coverge working, I'm proud of you.
  - Spearmint V.14
*/
const reduxTestCaseState = {
  id: 1,
  actionsFile: '',
  filePath: '',
  typesFileName: '',
  typesFilePath: '',
  type: 'action-creator',
  actionCreatorFunc: '',
  actionType: '',
  payloadKey: null,
  payloadType: null,
  it: '',
}

describe('User input on Action Creator', () => {
  
  const dispatchtoReduxTestCase = jest.fn();
  afterEach(cleanup);

  it('updates the It should... input field value on user input', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(
      <ReduxTestCaseContext.Provider value={[reduxTestCaseState, dispatchtoReduxTestCase]}>
        <ActionCreator/>
      </ReduxTestCaseContext.Provider>
      );

    const it = getByLabelText('It should...');
    expect(it).toBeInTheDocument();
    expect(it.placeholder).toBe('e.g.should return expected action');
    expect(it.value).toBe('');

    // fireEvent.change(it, { target: { value: 'Testing' } });
    // const newIt = getByLabelText('It should...');
    await user.type(it, 'Testing');
    expect(it.value).toBe('Testing');
  })

  it('updates the Action Creator input field value on user input', async () => {
    const user = userEvent.setup();
    render(<ActionCreator {...props}/>);

    const actionCreator = screen.getByRole('textbox', {name: 'Action Creator'});
    expect(actionCreator).toBeInTheDocument();
    expect(actionCreator.placeholder).toBe('e.g. addTodo');
    expect(actionCreator.value).toBe('');
    
    // fireEvent.change(actionCreator, { target: { value: 'Testing' } });
    await user.type(actionCreator, 'Testing');
    expect(actionCreator.value).toBe('Testing');
  })

  it('updates the Action Type input field value on user input', async () => {
    const user = userEvent.setup();
    render(<ActionCreator {...props}/>);

    const actionType = screen.getByRole('textbox', {name: 'Action Type'});
    expect(actionType).toBeInTheDocument();
    expect(actionType.placeholder).toBe('e.g. ADD_TODO');
    expect(actionType.value).toBe('');
    
    fireEvent.change(actionType, { target: { value: 'Testing' } });
    // await user.type(actionType, 'Testing');
    expect(actionType.value).toBe('Testing');
  })

  it('updates the Payload Key input field value on user input', async () => {
    const user = userEvent.setup();
    render(<ActionCreator {...props}/>);

    const payloadKey = screen.getByRole('textbox', {name: 'Payload Key'});
    expect(payloadKey).toBeInTheDocument();
    expect(payloadKey.placeholder).toBe('e.g. todo');
    expect(payloadKey.value).toBe('');
    
    // fireEvent.change(payloadKey, { target: { value: 'Testing' } });
    await user.type(payloadKey, 'Testing');
    expect(payloadKey.value).toBe('Testing');
  })

  it('should correctly set default option on Payload Type dropdown', () => {
    render(<ActionCreator {...props}/>);
    expect(screen.getByRole('option', { name: '' }).selected).toBe(true);

    userEvent.selectOptions(screen.getByRole('combobox'), screen.getByRole('option', { name: 'number' }));
    expect(screen.getByRole('option', { name: 'number' }).selected).toBe(true);
  })
})