import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { PuppeteerTestCaseContext } from '../../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestCase from '../../../components/TestCase/PuppeteerTestCase';
import { TestFileModalContext } from '../../../context/reducers/testFileModalReducer';
import "@testing-library/jest-dom/extend-expect";

const testFileModal = {
  isTestModalOpen: false,
};

const dispatchToPuppeteerTestCase = jest.fn();
const dispatchToTestFileModal = jest.fn();

afterEach(cleanup);

describe('Puppeteer Left Panel', () => {
  it('should render the puppeteer test menu with two buttons: [New Test +] and [Paint Timing]', () => {
    const puppeteerTestCase = {
      puppeteerStatements: [],
      hasPuppeteer: 1,
      statementId: 0,
    };
    const { getByTestId } = render(
      <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
        <PuppeteerTestCaseContext.Provider value={[puppeteerTestCase, dispatchToPuppeteerTestCase]}>
          <PuppeteerTestCase />
        </PuppeteerTestCaseContext.Provider>
      </TestFileModalContext.Provider>,
    );
    expect(getByTestId('puppeteerNewTestButton')).toHaveTextContent('New Test +');
    expect(getByTestId('puppeteerPaintTimingButton')).toHaveTextContent('Paint Timing');
  });

  it('should render a paint timing form with corresponding fields if a paint timing test statement has been created', () => {
    const puppeteerTestCase = {
      puppeteerStatements: [{
        describe: 'Home page performance',
        firstPaintIt: 'should have its first paint in less than 100 ms',
        firstPaintTime: '100',
        hasBrowserOption: true,
        id: 0,
        type: 'paintTiming',
        url: 'http://localhost:8080/',
        browserOptions: [
          {
            id: 0,
            optionKey: 'headless',
            optionValue: 'false',
          },
        ],
        FCPIt: 'should have its first contentful paint in less than 200 ms',
        FCPtTime: '200',
        LCPIt: 'should have its largest contentful paint paint in less than 300 ms',
        LCPTime: '300',
        browserOptionId: 1,
      }],
      hasPuppeteer: 1,
      statementId: 1,
    };
    const { getByText } = render(
      <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
        <PuppeteerTestCaseContext.Provider value={[puppeteerTestCase, dispatchToPuppeteerTestCase]}>
          <PuppeteerTestCase />
        </PuppeteerTestCaseContext.Provider>
      </TestFileModalContext.Provider>,
    );

    expect(getByText('Describe')).toBeInTheDocument();
    expect(getByText('URL')).toBeInTheDocument();
    expect(getByText('First Paint')).toBeInTheDocument();
    expect(getByText('First Contentful Paint')).toBeInTheDocument();
    expect(getByText('Largest Contentful Paint')).toBeInTheDocument();
  });
});
