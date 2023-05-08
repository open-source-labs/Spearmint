/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReduxTestCase from '../components/TestCase/ReduxTestCase';
import { act } from 'react-dom/test-utils'
import ReduxTestMenu from '../components/TestMenu/ReduxTestMenu';
import TestMenuButtons from '../components/TestMenu/TestMenuButtons';
import { ReduxTestCaseState } from '../utils/reduxTypes';

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

})