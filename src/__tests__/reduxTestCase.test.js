/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReduxTestCase from '../components/TestCase/ReduxTestCase';
import ReduxTestMenu from '../components/TestMenu/ReduxTestMenu';
import TestMenuButtons from '../components/TestMenu/TestMenuButtons';
import userEvent from '@testing-library/user-event'

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

  it('should pass openDocs function as prop to TestMenuButtons', () => {
    const openDocs = jest.fn();

    render(<ReduxTestMenu openDocs={openDocs} dispatchToGlobal={dispatchToGlobal}/>);
    expect(TestMenuButtons).toHaveBeenCalled();
    // Assert that the openDocs function was called
    // expect(screen.getByText(/openDocs/i).toBeInTheDocument());
  });

  xit('checks that openDocs prop is a function on TestMenuButtons', async () => {
    const { getByDisplayName } = render(<ReduxTestMenu />);
    const TestMenuButtonsComponent = await getByDisplayName('TestMenuButtons');
    const openDocsProp = TestMenuButtonsComponent.props.openDocs;

    expect(typeof openDocsProp).toBe('function');
  });
})