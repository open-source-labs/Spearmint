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

  beforeEach(() => {
    render(<ReduxTestMenu/>);
    let state = {
      reduxTestStatement: '',
      reduxStatements: [],
    };
  })

  it('handles resetting the tests', () => {
    const mock = jest.fn();

  })
})

describe('should render the TestMenuButtons component', () => {
  beforeEach(() => {
    render(<TestMenuButtons/>);
  })

  it('displays the test menu component', () => {
    screen.debug();
  });

  it('displays all five test menu buttons', () => {
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(5);
    expect(buttons).not.toBeNull();

    buttons.forEach(button => {
     const icon = within(button).getByTestId(/icon/i);
     expect(icon).toBeInTheDocument();
    })
  });

  //needs work
  xit('opens the redux testing docs on click', () => {
    const openDocs = jest.fn();
    render(<TestMenuButtons onClick={openDocs}/>)

    const helpButton = screen.getByTitle('Need Help?');

    fireEvent.click(helpButton);
    expect(openDocs).toHaveBeenCalled();
  })
})