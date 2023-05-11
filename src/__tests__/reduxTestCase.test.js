/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReduxTestCase from '../components/TestCase/ReduxTestCase';
import { act } from 'react-dom/test-utils'

xdescribe('should render ReduxTestCase component', () => {
  // const { getByRole, debug } = act(() => { render(<ReduxTestCase />) });

  it('displays the component', () => {
    act(() => { render(<ReduxTestCase />) });
    screen.debug()
  })
});
