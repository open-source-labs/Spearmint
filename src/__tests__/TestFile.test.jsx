/**
 * Author: Gary Balogh
 * Date: 05/06/2023
 * 
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen, mount } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestFile from '../pages/TestFile/TestFile';

// Tests if all cards are displayed on the test option page when choosing
// a test after choosing a project
describe('TestFile options display unit tests', () => {
 
  // before each test make sure TestFile is rendered
  beforeEach(() => {
    render(<TestFile />);
  });

  test('should display React card option', async () => {
    const reactCard = screen.getByText('React');
    expect(reactCard).toBeVisible();
    // fireEvent.click(reactCard);
    // rerender(<TestFile/>);
    // const reactHeading = await screen.findByText('React Testing');
    // expect(reactHeading).toBeVisible();
  });

  test('should display Redux card option', () => {
    const reduxCard = screen.getByText('Redux');
    expect(reduxCard).toBeVisible();
  });

  test('should display Svelte card option', () => {
    const svelteCard = screen.getByText('Svelte');
    expect(svelteCard).toBeVisible();
  });

  test('should display Solid card option', () => {
    const solidCard = screen.getByText('Solid');
    expect(solidCard).toBeVisible();
  });

  test('should display Hooks card option', () => {
    const hooksCard = screen.getByText('Hooks');
    expect(hooksCard).toBeVisible();
  });

  test('should display Vue card option', () => {
    const vueCard = screen.getByText('Vue');
    expect(vueCard).toBeVisible();
  });

  test('should display Puppeteer card option', () => {
    const puppeteerCard = screen.getByText('Puppeteer');
    expect(puppeteerCard).toBeVisible();
  });

  test('should display Endpoint card option', () => {
    const endpointCard = screen.getByText('Endpoint');
    expect(endpointCard).toBeVisible();
  });

  test('should display Accessibility card option', () => {
    const accCard = screen.getByText('Accessibility');
    expect(accCard).toBeVisible();
  });

  test('should display Security card option', () => {
    const securityCard = screen.getByText('Security');
    expect(securityCard).toBeVisible();
  });

  test('should display GraphQL card option', () => {
    const graphqlCard = screen.getByText('GraphQL');
    expect(graphqlCard).toBeVisible();
  });
});