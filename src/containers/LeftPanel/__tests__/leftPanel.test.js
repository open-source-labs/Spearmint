import React from 'react';
import LeftPanel from '../LeftPanel';
import TestCase from '../TestCase/TestCase';
import TestFile from '../TestFile/TestFile';
import TestMenu from '../../LeftPanel/TestMenu/TestMenu';
import { GlobalContext } from '../../../context/globalReducer';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { MockDataContext } from '../../../context/mockDataReducer';

import { render, fireEvent } from '@testing-library/react';
import { build, fake } from 'test-data-bot';
import '@testing-library/react/cleanup-after-each';
import 'jest-dom/extend-expect';

import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { exportAllDeclaration } from '@babel/types';
import Rerender from '../Render/Rerender';
import Assertion from '../Assertion/Assertion';
configure({ adapter: new Adapter() });

let wrapper, globalM, dispatchToGlobal, testCase, dispatchToTestCase, mockData, dispatchToMockData;

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

  wrapper = mount(
    <GlobalContext.Provider value={[globalM, dispatchToGlobal]}>
      <TestCaseContext.Provider value={[testCase, dispatchToTestCase]}>
        <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
          <TestCase />
        </MockDataContext.Provider>
      </TestCaseContext.Provider>
    </GlobalContext.Provider>
  );

  jest.resetModules();
});

describe('testing left panel', () => {
  it('renders the left panel with initial buttons and first render boxes', () => {
    expect(wrapper.text()).toContain('Do you need mock data?');
    expect(wrapper.text()).toContain('Do you need props?');
    expect(wrapper.text()).toContain('Action');
    expect(wrapper.text()).toContain('Assertion');
    expect(wrapper.text()).toContain('Rerender');
  });

  // Rachel's tests from here
  it('new assertion card is produced when assertion button is clicked', () => {
        const button = wrapper.find('.assertionButton')
    // button.simulate('click');
    expect(button.text()).toBe('Assertion');
    // expect(testCase.statements.length).toEqual(3);
  });

  it('action card is removed when delete button is clicked', () => {});

  it('clicking the mock data checkbox renders mock data input fields', () => {});

  it('props table displays when prop checkbox on Render card is clicked', () => {});

  it('wipes existing test statements when new test button is clicked ', () => {});
});
