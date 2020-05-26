import React from 'react';
import ReactTestCase from '../../../components/TestCase/ReactTestCase';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { MockDataContext } from '../../../context/reducers/mockDataReducer';
import { TestFileModalContext } from '../../../context/reducers/testFileModalReducer';
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
    hasReact: 0,
    describeId: 1,
    itId: 1,
    statementId: 1,
    propId: 1,
    describeBlocks: {
      byId: {
        describe0: {
          id: 'describe0',
          text: '',
        },
      },
      allIds: ['describe0'],
    },
    itStatements: {
      byId: {
        it0: {
          id: 'it0',
          describeId: 'describe0',
          text: '',
        },
      },
      allIds: ['it0'],
    },
    statements: {
      byId: {
        statement0: {
          id: 'statement0',
          itId: 'it0',
          describeId: 'describe0',
          type: 'render',
          componentName: '',
          filePath: '',
          props: [],
          hasProp: false,
        },
      },
      allIds: ['statement0'],
      componentPath: '',
      componentName: '',
    },
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
      <ReactTestCaseContext.Provider value={[testCase, dispatchToTestCase]}>
        <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
          <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
            <ReactTestCase />
          </TestFileModalContext.Provider>
        </MockDataContext.Provider>
      </ReactTestCaseContext.Provider>
    </GlobalContext.Provider>
  );

  jest.resetModules();
});

describe('testing left panel react test menu', () => {
  it('renders the react menu with initial buttons, component input, first Describe Block', () => {
    expect(wrapper.text()).toContain('Enter Component Name:');
    expect(wrapper.text()).toContain('Mock Data');
    expect(wrapper.text()).toContain('+Describe Block');
    expect(wrapper.text()).toContain('New Test +');
  });

  it('onclick function is invoked when add Describe Block button is clicked', () => {
    const btn = wrapper.find("button[data-testid='addDescribeButton']");
    btn.simulate('click');
    expect(dispatchToTestCase).toHaveBeenCalled();
  });
});
