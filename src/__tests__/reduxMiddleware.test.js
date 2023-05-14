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

  it('should correctly display default option on QueryValue', () => {
    render(<Middleware {...props}/>);

    const queryValue = screen.getByRole('combobox', {name: 'Query Value'});
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(15);
  })
})