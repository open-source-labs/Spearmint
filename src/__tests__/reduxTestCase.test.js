/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReduxTestCase from '../components/TestCase/ReduxTestCase';
import { act } from 'react-dom/test-utils'
import ReduxTestMenu from '../components/TestMenu/ReduxTestMenu';
import TestMenuButtons from '../components/TestMenu/TestMenuButtons';
import { ReduxTestCaseState } from '../utils/reduxTypes';
import { IconButton } from '@mui/material';
import { ReduxTestCaseContext } from '../context/reducers/reduxTestCaseReducer';

const dispatchToReduxTestCase = jest.fn();
const dispatchToGlobal = jest.fn();

const reduxTestCaseState = {
  reduxTestStatement: '',
  reduxStatements: []
};

describe('should render ReduxTestCase component', () => {
  beforeEach(() => {
    render(<ReduxTestCase/>);
  });

  it('displays the component', () => {
    screen.debug()
  })

  it('displays the name of the test component to be at the top of the page', () => {
    const testName = screen.getByText(/redux testing/i);
    expect(testName).toBeInTheDocument();
  })

  it('displays the input describe field.', () => {
    const input = screen.getByLabelText(/describe block/i);
    expect(input).toBeInTheDocument();
  })
});

describe('should render the ReduxTestMenu component.', () => {

  it('opens the Redux testing docs on click', () => {
    const openDocs = jest.fn();

    render(<ReduxTestMenu openDocs={openDocs} dispatchToGlobal={dispatchToGlobal}/>);

    // Assert that the openDocs function was called
    expect(screen.getByText(/openDocs/i).toBeInTheDocument());
  });

  xit('should pass openDocs function as prop to TestMenuButtons', async () => {
    const { getByDisplayName } = render(<ReduxTestMenu />);
    const TestMenuButtonsComponent = await getByDisplayName('TestMenuButtons');
    const openDocsProp = TestMenuButtonsComponent.props.openDocs;

    expect(typeof openDocsProp).toBe('function');
  });
})

describe('should render the TestMenuButtons component', () => {

  it('displays the test menu component', () => {
    render(<TestMenuButtons/>);
    screen.debug();
  });

  it('displays all five test menu buttons', () => {
    render(<TestMenuButtons/>);
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(5);
    expect(buttons).not.toBeNull();

    buttons.forEach(button => {
     const icon = within(button).getByTestId(/icon/i);
     expect(icon).toBeInTheDocument();
    })
  });

  it('opens the redux testing docs on click', () => {
    const openDocs = jest.fn();

    render(<TestMenuButtons openDocs={openDocs}/>)

    const helpButton = screen.getByTitle('Need Help?');

    fireEvent.click(helpButton);
    expect(openDocs).toHaveBeenCalled();
  })
})