/**
 *  @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  // mode switch is checked by default
  test('User toggling mode switch should check or uncheck switch', async() => {
    render(<ModeSwitch/>);
    const toggle = screen.getByRole('checkbox');
    expect(toggle.checked).toEqual(true);
    fireEvent.change(toggle, {target: {checked: false}});
    expect(toggle.checked).toEqual(false);
  });
});