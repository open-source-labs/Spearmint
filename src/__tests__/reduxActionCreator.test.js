/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import ActionCreator from '../components/ReduxTestComponent/ActionCreator/ActionCreator'

/* 
A note on testing in React Testing Library: 
  In order for user interaction to work and to persist through the state of your test you need to remember four things:
    1) The state defined in your component when it is rendered in the test MUST match the type and value found on every property (see below)
    2) Often the property types defined in the reducer may not reflect the actual values and types when the application is compiled from TS and rendered
      i.e. The properties below of actionType and payloadKey must be null as the value associated with them before any text is entered in their input field is null
    3) userEvent is best practice over fireEvent, and must always be used asynchronously (await userEvent)
    4) Do not attempt to test the functionality of the components, rather test the user interaction and what is displayed in the DOM
  
  More reading: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

-Spearmint V.14
*/

const props = {
  actionCreator: {
    id: 1,
    actionsFileName: '',
    filePath: '',
    typesFileName: '',
    typesFilePath: '',
    type: 'action-creator',
    actionCreatorFunc: null,
    actionType: null,
    payloadKey: null,
    payloadType: null,
    it: null, 
    },
  index: 0
}

describe('Action Creator', () => {

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

  it('should correctly display default input value on It statement', () => {
    render(<ActionCreator {...props}/>);

    const it = screen.getByRole('textbox', {name: 'It should...'});
    expect(it).toBeInTheDocument();
    expect(it.placeholder).toBe('e.g.should return expected action');
    expect(it.value).toBe('');
  })

  it('should correctly display default input value on Action Creator', () => {
    render(<ActionCreator {...props}/>);

    const actionCreator = screen.getByRole('textbox', {name: 'Action Creator'});
    expect(actionCreator).toBeInTheDocument();
    expect(actionCreator.placeholder).toBe('e.g. addTodo');
    expect(actionCreator.value).toBe('');
  })

  it('should correctly display default input value on Action Type', () => {
    render(<ActionCreator {...props}/>);

    const actionType = screen.getByRole('textbox', {name: 'Action Type'});
    expect(actionType).toBeInTheDocument();
    expect(actionType.placeholder).toBe('e.g. ADD_TODO');
    expect(actionType.value).toBe('');
  })

  it('should correctly display default input value on Payload Key', () => {
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


describe('User Events on Action Creator', () => {

  it('updates the It should... input field value on user input', async () => {
    const user = userEvent.setup();
    render(<ActionCreator {...props}/>);

    const it = screen.getByRole('textbox', {name: 'It should...'});
    expect(it.value).toBe('');

    await user.type(it, 'Testing');
    expect(it.value).toBe('Testing');
  })

  it('updates the Action Creator input field value on user input', async () => {
    const user = userEvent.setup();
    render(<ActionCreator {...props}/>);

    const actionCreator = screen.getByRole('textbox', {name: 'Action Creator'});
    expect(actionCreator.value).toBe('');
    
    await user.type(actionCreator, 'Testing');
    expect(actionCreator.value).toBe('Testing');
  })

  it('updates the Action Type input field value on user input', async () => {
    const user = userEvent.setup();
    render(<ActionCreator {...props}/>);

    const actionType = screen.getByRole('textbox', {name: 'Action Type'});
    expect(actionType.value).toBe('');
    
    await user.type(actionType, 'Testing');
    expect(actionType.value).toBe('Testing');
  })

  it('updates the Payload Key input field value on user input', async () => {
    const user = userEvent.setup();
    render(<ActionCreator {...props}/>);

    const payloadKey = screen.getByRole('textbox', {name: 'Payload Key'});
    expect(payloadKey.value).toBe('');
    
    await user.type(payloadKey, 'Testing');
    expect(payloadKey.value).toBe('Testing');
  })

  it('updates the Payload Type dropdown option on user input', async () => {
    const user = userEvent.setup();
    render(<ActionCreator {...props}/>);
    expect(screen.getByRole('option', { name: '' }).selected).toBe(true);

    await user.selectOptions(screen.getByRole('combobox'), screen.getByRole('option', { name: 'number' }));
    expect(screen.getByRole('option', { name: 'number' }).selected).toBe(true);
  })
})