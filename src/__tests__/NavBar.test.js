/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../components/NavBar/NavBar';

describe('NavBar', () => {

  describe('initial render', () => {

    test('should render without crashing', () => {
      expect(render(<NavBar inAboutPage={false}/>)).not.toBe(null);
    });

    test('should render home button', () => {
      render(<NavBar inAboutPage={false}/>);
      const homeBtn = screen.getByTitle(/Home/i);
      expect(homeBtn).toBeVisible();
    });

    test('should render file explorer button', () => {
      render(<NavBar inAboutPage={false}/>);
      const fileExplrBtn = screen.getByTitle(/Expand file explorer/i);
      expect(fileExplrBtn).toBeVisible();
    });

    test('should render export file button', () => {
      render(<NavBar inAboutPage={false}/>);
      const exportBtn = screen.getByTitle(/Export test file/i);
      expect(exportBtn).toBeVisible();
    });

    test('should render mode switch', () => {
      render(<NavBar inAboutPage={false}/>);
      const modeSwitch = screen.getByTitle(/Change theme/i);
      expect(modeSwitch).toBeVisible();
    });

    test('should not display new test modal on first render', () => {
      render(<NavBar inAboutPage={false}/>);
      const newTestModal = screen.queryByTitle(/New Test Modal/i);
      expect(newTestModal).toBe(null);
    });

    test('should not display export file modal on first render', () => {
      render(<NavBar inAboutPage={false}/>);
      const exportFileModal = screen.queryByTitle(/Export File Modal/i);
      expect(exportFileModal).toBe(null);
    });
  });

  describe('user interactions', () => {

    test('clicking home button should open new test modal', () => {
      render(<NavBar inAboutPage={false}/>);
      const homeBtn = screen.getByTitle(/Home/i);
      fireEvent.click(homeBtn);
      const newTestModal = screen.queryByTitle(/New Test Modal/i);
      expect(newTestModal).toBeVisible();
    });

    test('clicking export file button should open export file modal', () => {
      render(<NavBar inAboutPage={false}/>);
      const exportBtn = screen.getByTitle(/Export test file/i);
      fireEvent.click(exportBtn);
      const exportFileModal = screen.queryByTitle(/Export File Modal/i);
      expect(exportFileModal).toBeVisible();
    });
  });
});