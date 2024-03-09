/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestFile from '../pages/TestFile/TestFile';
import { GlobalContext } from '../context/reducers/globalReducer';


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

  describe('should render correct pages based on test selection', () => {
    
    const mockDispatchToGlobal = jest.fn();
    const mockGlobalState = {
      url: 'http://www.google.com/',
      projectUrl: null,
      isProjectLoaded: false,
      fileTree: null,
      isFileDirectoryOpen: false,
      isRightPanelOpen: true,
      rightPanelDisplay: 'browserView',
      isFolderOpen: {},
      isFileHighlighted: '',
      projectFilePath: '',
      filePathMap: {},
      file: '',
      testCase: '',
      docsOpen: false,
      isTestModalOpen: true,
      exportBool: false,
      fileName: '',
      filePath: 'TEST INITIAL FILE PATH',
      validCode: true,
      tabIndex: 0,
      isGuest: false,
      theme: window.localStorage.theme ?? 'light',
    };

    test('clicking React should send user to React page', () => {
      mockGlobalState.testCase = 'react';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('React Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Redux should send user to Redux page', () => {
      mockGlobalState.testCase = 'redux';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Redux Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Svelte should send user to Svelte page', () => {
      mockGlobalState.testCase = 'svelte';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Svelte Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Solid should send user to Solid page', () => {
      mockGlobalState.testCase = 'solid';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Solid Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Hooks should send user to Hooks page', () => {
      mockGlobalState.testCase = 'hooks';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Hooks Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Vue should send user to Vue page', () => {
      mockGlobalState.testCase = 'vue';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Vue Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Puppeteer should send user to Puppeteer page', () => {
      mockGlobalState.testCase = 'puppeteer';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Puppeteer Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Endpoint should send user to Endpoint page', () => {
      mockGlobalState.testCase = 'endpoint';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Endpoint Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Accessibility should send user to Accessibility page', () => {
      mockGlobalState.testCase = 'acc';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Accessibility Testing');
      expect(heading).toBeVisible();
    });

    test('clicking Security should send user to Security page', () => {
      mockGlobalState.testCase = 'sec';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('Security Testing');
      expect(heading).toBeVisible();
    });

    test('clicking GraphQL should send user to GraphQL page', () => {
      mockGlobalState.testCase = 'graphQL';
      render(
        <GlobalContext.Provider value ={[mockGlobalState, mockDispatchToGlobal]}>
          <TestFile/>
        </GlobalContext.Provider>
      )
      const heading = screen.getByText('GraphQL Testing');
      expect(heading).toBeVisible();
    });
  });
});