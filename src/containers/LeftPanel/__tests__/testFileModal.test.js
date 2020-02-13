import React from 'react';
import ReactModal from 'react-modal';
import TestFile from '../TestFile/TestFile';
import { GlobalContext } from '../../../context/globalReducer';
import { TestFileModalContext } from '../../../context/testFileModalReducer';
import { HooksTestCaseContext } from '../../../context/hooksTestCaseReducer';
import { ReduxTestCaseContext } from '../../../context/reduxTestCaseReducer';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { EndpointTestCaseContext } from '../../../context/endpointTestCaseReducer';

import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let wrapper,
  globalM,
  dispatchToGlobal,
  hooksTestCase,
  dispatchToHooksTestCase,
  testFileModal,
  dispatchToTestFileModal,
  reduxTestCaseState,
  dispatchToReduxTestCase,
  testCase,
  dispatchToTestCase,
  endpointTestCaseState,
  dispatchToEndpointTestCase;

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

  testFileModal = {
    isTestModalOpen: true,
  };
  dispatchToTestFileModal = jest.fn();

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

  hooksTestCase = {
    hooksTestStatement: '',
    hooksStatements: [],
    hasHooks: 0,
  };
  dispatchToHooksTestCase = jest.fn();

  reduxTestCaseState = {
    reduxTestStatement: '',
    reduxStatements: [],
    hasRedux: 0,
  };
  dispatchToReduxTestCase = jest.fn();

  endpointTestCaseState = {
    endpointTestStatement: '',
    endpointStatements: [],
    hasEndpoint: 0,
  };
  dispatchToEndpointTestCase = jest.fn();

  wrapper = mount(
    <GlobalContext.Provider value={[globalM, dispatchToGlobal]}>
      <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
        <HooksTestCaseContext.Provider value={[hooksTestCase, dispatchToHooksTestCase]}>
          <ReduxTestCaseContext.Provider value={[reduxTestCaseState, dispatchToReduxTestCase]}>
            <TestCaseContext.Provider value={[testCase, dispatchToTestCase]}>
              <EndpointTestCaseContext.Provider
                value={[endpointTestCaseState, dispatchToEndpointTestCase]}
              >
                <TestFile />
              </EndpointTestCaseContext.Provider>
            </TestCaseContext.Provider>
          </ReduxTestCaseContext.Provider>
        </HooksTestCaseContext.Provider>
      </TestFileModalContext.Provider>
    </GlobalContext.Provider>
  );

  jest.resetModules();
});

it('app opens test file modal', () => {
  let testFileModal = wrapper.find(ReactModal);
  expect(testFileModal.length).toEqual(1);
  expect(testFileModal.prop('isOpen')).toEqual(true);
  expect(testFileModal.text()).toContain('What would you like to test?');
  expect(testFileModal.text()).toContain('React');
  expect(testFileModal.text()).toContain('Redux');
  expect(testFileModal.text()).toContain('Hooks/Context');
  expect(testFileModal.text()).toContain('Endpoint');
});
