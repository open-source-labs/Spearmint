/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReduxTestCase from '../components/TestCase/ReduxTestCase';
import userEvent from '@testing-library/user-event'
import Reducer from '../components/ReduxTestComponent/Reducer/Reducer';

describe('should render ReduxTestCase component', () => {
  beforeEach(() => {
    render(<ReduxTestCase/>);
  });

  it('displays the component', () => {
    expect(<ReduxTestCase/>).not.toBe(null);
  })

  it('displays the name of the test component to be at the top of the page', () => {
    const testName = screen.getByText(/redux testing/i);
    expect(testName).toBeInTheDocument();
  })

  it('displays the input describe field.', () => {
    const input = screen.getByLabelText(/describe block/i);
    expect(input).toBeInTheDocument();
  })

  it('displays all nine button options on the page', () => {
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(9);
    expect(buttons).not.toBeNull();
  });

  it('displays the correct text for the buttons', () => {
    const reducer = screen.getByTestId('reducerButton');
    expect(reducer).toBeInTheDocument();
    expect(reducer.textContent).toBe('Reducer');

    const actionCreator = screen.getByTestId('actionCreatorButton');
    expect(actionCreator).toBeInTheDocument();
    expect(actionCreator.textContent).toBe('Action Creator');

    const asyncButton = screen.getByTestId('asyncButton');
    expect(asyncButton).toBeInTheDocument();
    expect(asyncButton.textContent).toBe('Async Action Creator');

    const middleware = screen.getByTestId('middlewareButton');
    expect(middleware).toBeInTheDocument();
    expect(middleware.textContent).toBe('Middleware');
  })
});

describe('handles user interaction on input/buttons', () => {

  xit('displays the new reducer block in the DOM on click', async () => {
    const handleAddReducer = jest.fn(() => {<Reducer/>});
    render(<ReduxTestCase handleAddReducer={handleAddReducer}/>);
    // const reducer = screen.getByRole('button', {name: 'Reducer'});
    // await userEvent.click(reducer);
    // expect(<Reducer/>).toBeInTheDocument();
    const reducer = screen.getByRole('button', { name: 'Reducer' });
    await userEvent.click(reducer);
    expect(handleAddReducer).toHaveBeenCalled();
  })
})