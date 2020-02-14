import React from 'react';
import TestCase from '../TestCase/TestCase';
import { GlobalContext } from '../../../context/globalReducer';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { MockDataContext } from '../../../context/mockDataReducer';
import { TestFileModalContext } from '../../../context/testFileModalReducer'
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let wrapper, globalM, dispatchToGlobal, testCase, dispatchToTestCase, mockData, dispatchToMockData, testFileModal, dispatchToTestFileModal;

beforeEach(() => {
  globalM = {
    url: null,
    isProjectLoaded: false,
    fileTree: null,
    componentName: '',
    isFileDirectoryOpen: true,
    rightPanelDisplay: 'browserView',
    displayedFileCode: '',
    isFolderOpen: {},
    isFileHighlighted: '',
    projectFilePath: '',
    filePathMap: {},
  };

  dispatchToGlobal = jest.fn();

  testCase = {
    testStatement: '',
    statements: [
      {
        id: 0,
        type: 'render',
        componentName: '',
        filePath: '',
        props: [],
        hasProp: false,
      },
      {
        id: 1,
        type: 'assertion',
        queryVariant: '',
        querySelector: '',
        queryValue: '',
        isNot: false,
        matcherType: '',
        matcherValue: '',
        suggestions: [],
      },
    ],
  };

  dispatchToTestCase = jest.fn();
  
  mockData = {
    mockData: [],
    hasMockData: false,
  };

  dispatchToMockData = jest.fn();
  testFileModal = {}
  dispatchToTestFileModal = jest.fn();

  wrapper = mount(
    <GlobalContext.Provider value={[globalM, dispatchToGlobal]}>
      <TestCaseContext.Provider value={[testCase, dispatchToTestCase]}>
        <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
          <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
            <TestCase />
          </TestFileModalContext.Provider>
        </MockDataContext.Provider>
      </TestCaseContext.Provider>
    </GlobalContext.Provider>
  );

  jest.resetModules();
});

describe('testing left panel react test menu', () => {
  it('renders the react menu with initial buttons and first render boxes', () => {
    expect(wrapper.text()).toContain('Do you need mock data?');
    expect(wrapper.text()).toContain('Do you need props?');
    expect(wrapper.text()).toContain('Action');
    expect(wrapper.text()).toContain('Assertion');
    expect(wrapper.text()).toContain('Rerender');
    expect(wrapper.text()).toContain('New Test +');
  });

  it('onclick function is invoked when assertion button is clicked', () => {
    const btn = wrapper.find('button[data-testid="assertionButton"]');
    btn.simulate('click');
    expect(dispatchToTestCase).toHaveBeenCalled();
  });

  it('onclick function is invoked when action button is clicked', () => {
    const btn = wrapper.find('button[data-testid="actionButton"]');
    btn.simulate('click');
    expect(dispatchToTestCase).toHaveBeenCalled();
  });

  it('onclick function is invoked when rerender button is clicked', () => {
    const btn = wrapper.find('button[data-testid="rerenderButton"]');
    btn.simulate('click');
    expect(dispatchToTestCase).toHaveBeenCalled();
  });

  it('there should be 4 buttons', () => {
    expect(wrapper.find('button').length).toEqual(4)
  });
});
