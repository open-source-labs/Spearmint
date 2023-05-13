/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestFile from '../pages/TestFile/TestFile';

// Tests if all cards are displayed on the test option page when choosing
// a test after choosing a project folder
describe('TestFile', () => {

  describe('TestFile should render all test options', () => {

    test('should display React test option', () => {
      render(<TestFile />);
      const reactCard = screen.getByText('React');
      expect(reactCard).toBeVisible();
    });

    test('should display Redux test option', () => {
      render(<TestFile />);
      const reduxCard = screen.getByText('Redux');
      expect(reduxCard).toBeVisible();
    });

    test('should display Svelte test option', () => {
      render(<TestFile />);
      const svelteCard = screen.getByText('Svelte');
      expect(svelteCard).toBeVisible();
    });

    test('should display Solid test option', () => {
      render(<TestFile />);
      const solidCard = screen.getByText('Solid');
      expect(solidCard).toBeVisible();
    });

    test('should display Hooks test option', () => {
      render(<TestFile />);
      const hooksCard = screen.getByText('Hooks');
      expect(hooksCard).toBeVisible();
    });

    test('should display Vue test option', () => {
      render(<TestFile />);
      const vueCard = screen.getByText('Vue');
      expect(vueCard).toBeVisible();
    });

    test('should display Puppeteer test option', () => {
      render(<TestFile />);
      const puppeteerCard = screen.getByText('Puppeteer');
      expect(puppeteerCard).toBeVisible();
    });

    test('should display Endpoint test option', () => {
      render(<TestFile />);
      const endpointCard = screen.getByText('Endpoint');
      expect(endpointCard).toBeVisible();
    });

    test('should display Accessibility test option', () => {
      render(<TestFile />);
      const accCard = screen.getByText('Accessibility');
      expect(accCard).toBeVisible();
    });

    test('should display Security test option', () => {
      render(<TestFile />);
      const securityCard = screen.getByText('Security');
      expect(securityCard).toBeVisible();
    });

    test('should display GraphQL test option', () => {
      render(<TestFile />);
      const graphqlCard = screen.getByText('GraphQL');
      expect(graphqlCard).toBeVisible();
    });
  });
});