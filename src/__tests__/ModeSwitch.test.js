/**
 *  @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ModeSwitch from '../components/ModeSwitch/ModeSwitch';


describe('ModeSwitch testing', () => {

  test('ModeSwitch should render without crashing', () => {
    expect(render(<ModeSwitch/>)).not.toBe(null);
  });

  test('ModeSwitch should render a dark mode icon', () => {
    render(<ModeSwitch/>);
    expect(screen.getByTitle('Dark Mode')).toBeVisible();
  });

  test('ModeSwitch should render a light mode icon', () => {
    render(<ModeSwitch/>);
    expect(screen.getByTitle('Light Mode')).toBeVisible();
  });

  // theme default is 'light' and should be changed to 'dark'
  // after user toggles mode switch
  test('User toggling mode switch should change theme', async() => {
    const user = userEvent.setup();
    render(<ModeSwitch/>);
    expect(localStorage.getItem("theme")).toEqual('light');
    const toggle = screen.getByRole('checkbox');
    // toggle is checked by default
    expect(toggle).toBeChecked();
    await user.click(toggle);
    expect(localStorage.getItem("theme")).toEqual('dark');
  });
});