/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import TestFile from '../pages/TestFile/TestFile';

// Tests if all cards are displayed on the test option page when choosing
// a test after choosing a project folder
describe('TestFile options display unit tests', () => {

  test('should display React card option', async () => {
    // const user = userEvent.setup();
    const { rerender } = render(<TestFile />);
    const reactCard = screen.getByText('React');
    expect(reactCard).toBeVisible();
    // user.click(reactCard);
    // const reactHeading = await screen.getByText('React Testing');
    // expect(reactHeading).toBeVisible();
  });

  test('should display Redux card option', () => {
    const { rerender } = render(<TestFile />);
    const reduxCard = screen.getByText('Redux');
    expect(reduxCard).toBeVisible();
  });

  test('should display Svelte card option', () => {
    const { rerender } = render(<TestFile />);
    const svelteCard = screen.getByText('Svelte');
    expect(svelteCard).toBeVisible();
  });

  test('should display Solid card option', () => {
    const { rerender } = render(<TestFile />);
    const solidCard = screen.getByText('Solid');
    expect(solidCard).toBeVisible();
  });

  test('should display Hooks card option', () => {
    const { rerender } = render(<TestFile />);
    const hooksCard = screen.getByText('Hooks');
    expect(hooksCard).toBeVisible();
  });

  test('should display Vue card option', () => {
    const { rerender } = render(<TestFile />);
    const vueCard = screen.getByText('Vue');
    expect(vueCard).toBeVisible();
  });

  test('should display Puppeteer card option', () => {
    const { rerender } = render(<TestFile />);
    const puppeteerCard = screen.getByText('Puppeteer');
    expect(puppeteerCard).toBeVisible();
  });

  test('should display Endpoint card option', () => {
    const { rerender } = render(<TestFile />);
    const endpointCard = screen.getByText('Endpoint');
    expect(endpointCard).toBeVisible();
  });

  test('should display Accessibility card option', () => {
    const { rerender } = render(<TestFile />);
    const accCard = screen.getByText('Accessibility');
    expect(accCard).toBeVisible();
  });

  test('should display Security card option', () => {
    const { rerender } = render(<TestFile />);
    const securityCard = screen.getByText('Security');
    expect(securityCard).toBeVisible();
  });

  test('should display GraphQL card option', () => {
    const { rerender } = render(<TestFile />);
    const graphqlCard = screen.getByText('GraphQL');
    expect(graphqlCard).toBeVisible();
  });
});