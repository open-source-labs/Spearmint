/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Middleware from '../components/ReduxTestComponent/Middleware/Middleware';

const props = {
  middleware: {
    id: 1,
    type: 'middleware',
    middlewaresFileName: '',
    middlewaresFilePath: '',
    field: '',
    eventType: '',
    eventValue: null,
    queryType: '',
    queryVariant: '',
    querySelector: '',
    queryValue: '',
    queryFunction: '',
    suggestions: '',
  },
  index: 0
}

describe('Redux Middleware', () => {

  it('displays the Middleware component', () => {
    render(<Middleware {...props}/>);
    screen.debug();
    const middleware = screen.getByRole('heading');
    expect(middleware).toHaveTextContent('Middleware');

    const middlewareLabel = screen.getAllByText('Middleware');
    expect(middlewareLabel).toHaveLength(1);
  });

  it('displays all of the labels', () => {
    render(<Middleware {...props}/>);
    
    const dropdownLabels = screen.getAllByRole('combobox');
    expect(dropdownLabels).toHaveLength(3);

    const middlewareFunctionLabel = screen.getByRole('textbox', {name: 'Middleware Function'});
    expect(middlewareFunctionLabel).toBeInTheDocument();
  })

  it('displays the image to delete the middleware block', () => {
    render(<Middleware {...props}/>);

    const close = screen.getByRole('img', {name: 'close'});
    expect(close).toBeInTheDocument();
  })

  it('should correctly displays the options on Query Value dropdown', () => {
    render(<Middleware {...props}/>);

    const queryValueOption = screen.getByRole('combobox', {name: 'Query Value'});
    const options = queryValueOption.querySelectorAll('option');
    expect(options).toHaveLength(4);
    expect(options[0].value).toBe('');
    expect(options[1].value).toBe('passes_non_functional_arguments');
    expect(options[2].value).toBe('calls_the_function');
    expect(options[3].value).toBe('passes_functional_arguments');
  })

  it('should correctly displays the options on Query Variant dropdown', () => {
    render(<Middleware {...props}/>);

    const queryVariantOption = screen.getByRole('combobox', {name: 'Query Variant'});
    const options = queryVariantOption.querySelectorAll('option');
    expect(options).toHaveLength(6);
    expect(options[0].value).toBe('');
    expect(options[1].value).toBe('toBe');
    expect(options[2].value).toBe('toBeCalled');
    expect(options[3].value).toBe('toHaveBeenCalled');
    expect(options[4].value).toBe('toHaveBeenCalledWith');
    expect(options[5].value).toBe('toHaveBeenLastCalledWith');
  })

  it('should correctly displays the options on Query Selector dropdown', () => {
    render(<Middleware {...props}/>);

    const querySelectorOption = screen.getByRole('combobox', {name: 'Query Selector'});
    const options = querySelectorOption.querySelectorAll('option');
    expect(options).toHaveLength(5);
    expect(options[0].value).toBe('');
    expect(options[1].value).toBe('next');
    expect(options[2].value).toBe('function');
    expect(options[3].value).toBe('store.Dispatch');
    expect(options[4].value).toBe('store.GetState');
  })

  it('should correctly display default input value on Middleware fields', () => {
    render(<Middleware {...props}/>);

    const middlewareBox = screen.getByRole('textbox', {name: 'Middleware Function'});
    expect(middlewareBox.placeholder).toBe('e.g. thunk');
    expect(middlewareBox.value).toBe('');
  })
})

describe('User Events on Redux Middleware', () => {

  it('updates the Query Value dropdown option on user input', async () => {
    const user = userEvent.setup();
    render(<Middleware {...props}/>);

    const queryValueOption = screen.getByRole('combobox', {name: 'Query Value'});
    const options = queryValueOption.querySelector('option', {name: ''});
    expect(options.selected).toBe(true);

    const userSelection = queryValueOption.querySelector('option', {name: 'calls_the_function'})
    await user.selectOptions(queryValueOption, userSelection);
    expect(userSelection.selected).toBe(true);
  })

  it('updates the Query Variant dropdown option on user input', async () => {
    const user = userEvent.setup();
    render(<Middleware {...props}/>);

    const queryVariantOption = screen.getByRole('combobox', {name: 'Query Variant'});
    const options = queryVariantOption.querySelector('option', {name: ''});
    expect(options.selected).toBe(true);

    const userSelection = queryVariantOption.querySelector('option', {name: 'toHaveBeenCalled'})
    await user.selectOptions(queryVariantOption, userSelection);
    expect(userSelection.selected).toBe(true);
  })

  it('updates the Query Selector dropdown option on user input', async () => {
    const user = userEvent.setup();
    render(<Middleware {...props}/>);

    const querySelectorOption = screen.getByRole('combobox', {name: 'Query Selector'});
    const options = querySelectorOption.querySelector('option', {name: ''});
    expect(options.selected).toBe(true);

    const userSelection = querySelectorOption.querySelector('option', {name: 'store.GetState'})
    await user.selectOptions(querySelectorOption, userSelection);
    expect(userSelection.selected).toBe(true);
  })
})