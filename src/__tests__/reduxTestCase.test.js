/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReduxTestCase from '../components/TestCase/ReduxTestCase';
import { act } from 'react-dom/test-utils'
import ReduxTestMenu from '../components/TestMenu/ReduxTestMenu';

describe('should render ReduxTestCase component', () => {
  // const { getByRole, debug } = act(() => { render(<ReduxTestCase />) });
  
  it('displays the component', () => {
    act(() => { render(<ReduxTestCase />) });
    screen.debug()
  })

  it('displays the name of the test component to be at the top of the page', () => {
    render(<ReduxTestCase/>);
    const testName = screen.getByText(/redux testing/i);
    expect(testName).toBeInTheDocument();
  })
});

describe('should render the ReduxTestMenu component', () => {
  render(<ReduxTestMenu/>)
  it('displays the test menu component', () => {
    
  })
})
