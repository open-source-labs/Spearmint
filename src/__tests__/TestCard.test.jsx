/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestCard from '../pages/TestFile/TestCard';

const mockChooseTest = jest.fn();

describe('TestCard', () => {

  test('should render with correct text', () => {
    render(<TestCard type={'React'} onClick={mockChooseTest}/>);
    expect(screen.getByText(/React/i)).toBeVisible();
  });

  test('should call choose test function after user click', () => {
    render(<TestCard type={'React'} onClick={mockChooseTest}/>);
    const reactCard = screen.getByText(/React/i);
    fireEvent.click(reactCard);
    expect(mockChooseTest).toBeCalledTimes(1);
  });
});