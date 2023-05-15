/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Reducer from '../components/ReduxTestComponent/Reducer/Reducer';

const props = {
  reducer: {
    id: 1,
    itStatement: '',
    reducerName: '',
    initialState: '',
    reducerAction: '',
    payloadKey: '',
    payloadValue: '',
    expectedKey: '',
    expectedValue: '',
  },
  index: 0
}

describe('Redux Test Component Reducer', () => {

  it('displays the Reducer component', () => {
    render(<Reducer {...props}/>);
    screen.debug();
    const reducer = screen.getByRole('heading');
    expect(reducer).toHaveTextContent('Reducer'); 
  })

  it('displays all of the labels', () => {
    render(<Reducer {...props}/>);
    
    const labels = screen.getAllByRole('textbox');
    expect(labels).toHaveLength(8);
  })

  it('should correctly display default input value on It Statement', () => {
    render(<Reducer {...props}/>);

    const it = screen.getByRole('textbox', {name: 'It Statement'});
    expect(it).toBeInTheDocument();
    expect(it.placeholder).toBe('e.g. handles ADD_TODO action properly');
    expect(it.value).toBe('');
  })

  it('should correctly display default input value on Reducer Name', () => {
    render(<Reducer {...props}/>);

    const reducerName = screen.getByRole('textbox', {name: 'Reducer Name'});
    expect(reducerName).toBeInTheDocument();
    expect(reducerName.placeholder).toBe('e.g. todoReducer');
    expect(reducerName.value).toBe('');
  })

  it('should correctly display default input value on Reducer Name', () => {
    render(<Reducer {...props}/>);

    const initialState = screen.getByRole('textbox', {name: 'Initial State'});
    expect(initialState).toBeInTheDocument();
    expect(initialState.placeholder).toBe('e.g. todosState');
    expect(initialState.value).toBe('');
  })

  it('should correctly display default input value on Reducer Name', () => {
    render(<Reducer {...props}/>);

    const action = screen.getByRole('textbox', {name: 'Action'});
    expect(action).toBeInTheDocument();
    expect(action.placeholder).toBe('e.g. ADD_TODO');
    expect(action.value).toBe('');
  })

  it('should correctly display default input values on Payload Key and Value', () => {
    render(<Reducer {...props}/>);

    const payloadKey = screen.getByRole('textbox', {name: 'Payload Key (optional)'});
    expect(payloadKey).toBeInTheDocument();
    expect(payloadKey.placeholder).toBe('Key');
    expect(payloadKey.value).toBe('');

    const payloadValue = screen.getByRole('textbox', {name: 'Payload Value (optional)'});
    expect(payloadValue).toBeInTheDocument();
    expect(payloadValue.placeholder).toBe('Value');
    expect(payloadValue.value).toBe('');
  })

  it('should correctly display default input values on Expected State Key and Value', () => {
    render(<Reducer {...props}/>);

    const stateKey = screen.getByRole('textbox', {name: 'Expected State (key)'});
    expect(stateKey).toBeInTheDocument();
    expect(stateKey.placeholder).toBe('Key');
    expect(stateKey.value).toBe('');

    const stateValue = screen.getByRole('textbox', {name: 'Expected State (value)'});
    expect(stateValue).toBeInTheDocument();
    expect(stateValue.placeholder).toBe('Value');
    expect(stateValue.value).toBe('');
  })
})