/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Editor from '../components/EditorView/EditorView';
import '@testing-library/jest-dom'

describe('EditorView', () => {

  test('should render without crashing', () => {
    expect(render(<Editor/>)).not.toBe(null);
  });

  test('should render and display Code Editor', () => {
    render(<Editor/>);
    const codeEditor = screen.queryByTestId('Code Editor');
    expect(codeEditor).toBeVisible();
  });

  test('button should display "Save Changes" ', () => {
    render(<Editor/>);
    const saveBtn = screen.queryByRole('button', {name: 'Save Changes'});
    expect(saveBtn).toBeVisible();
  });

  test('button should display "Saved" after button click', () => {
    render(<Editor/>);
    const saveBtn = screen.queryByRole('button', {name: 'Save Changes'});
    expect(saveBtn).not.toBe(null);
    fireEvent.click(saveBtn);
    const saved = screen.findByRole('button', {name: 'Saved'});
  });
});