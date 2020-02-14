import React from 'react';
import EndpointTestCase from '../TestCase/EndpointTestCase';
import { GlobalContext } from '../../../context/globalReducer';
import { EndpointTestCaseContext } from '../../../context/endpointTestCaseReducer';
import { TestFileModalContext } from '../../../context/testFileModalReducer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Endpoint from '../Endpoint/Endpoint';

configure({ adapter: new Adapter() });

let wrapper, globalM, dispatchToGlobal, endpointTestCase, dispatchToEndpointTestCase, testFileModal, dispatchToTestFileModal;

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
  endpointTestCase = {
    endpointTestStatement: '',
    endpointStatements: [],
    hasEndpoint: 1,
  };

  testFileModal = {}
  dispatchToTestFileModal = jest.fn();

  dispatchToEndpointTestCase = jest.fn();

  wrapper = mount(
    <GlobalContext.Provider value={[global, dispatchToGlobal]}>
      <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
        <EndpointTestCaseContext.Provider value={[endpointTestCase, dispatchToEndpointTestCase]}>
          <EndpointTestCase />
        </EndpointTestCaseContext.Provider>
      </TestFileModalContext.Provider>
    </GlobalContext.Provider>
  );

  jest.resetModules();
});

describe('testing left panel endpoint test menu', () => {
  it('renders the endpoint menu with initial buttons', () => {
    expect(wrapper.text()).toContain('Endpoint');
  });

  it('onclick function is invoked when endpoint button is clicked', () => {
    const button = wrapper.find('[data-testid="endPointButton"]')
    button.simulate('click');
    expect(dispatchToEndpointTestCase).toHaveBeenCalled();
  });

  it('there should be 2 buttons', () => {
    expect(wrapper.find('button').length).toEqual(2)
  });
});
