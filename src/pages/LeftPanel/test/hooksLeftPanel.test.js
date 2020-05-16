import React from 'react';
import HooksTestCase from '../TestCase/HooksTestCase';
import HookUpdates from '../HookUpdates/HookUpdates';
import HookRender from '../HookRender/HookRender';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { TestFileModalContext } from '../../../context/reducers/testFileModalReducer';
import { HooksTestCaseContext } from '../../../context/reducers/hooksTestCaseReducer';

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
  dispatchToTestFileModal;

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

  hooksTestCase = {
    hooksTestStatement: '',
    hooksStatements: [],
    hasHooks: 0,
  };
  dispatchToHooksTestCase = jest.fn();

  wrapper = mount(
    <GlobalContext.Provider value={[globalM, dispatchToGlobal]}>
      <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
        <HooksTestCaseContext.Provider value={[hooksTestCase, dispatchToHooksTestCase]}>
          <HooksTestCase />
        </HooksTestCaseContext.Provider>
      </TestFileModalContext.Provider>
    </GlobalContext.Provider>
  );

  jest.resetModules();
});

describe('testing hooks left panel', () => {
  it('renders the hooks test case with corresponding buttons', () => {
    expect(wrapper.text()).toContain('Context');
    expect(wrapper.text()).toContain('Hook: Updates');
    expect(wrapper.text()).toContain('Hook: Rendering');
  });

  it('hook: render button dispatches to test case', () => {
    const renderBtn = wrapper.find('.hookRenderButton');
    renderBtn.simulate('click');
    expect(dispatchToHooksTestCase).toHaveBeenCalled();
  });

  it('hook: updates button dispatches to test case', () => {
    const updatesBtn = wrapper.find('.hookUpdatesButton');
    updatesBtn.simulate('click');
    expect(dispatchToHooksTestCase).toHaveBeenCalled();
  });

  it('context button dispatches to test case', () => {
    const contextBtn = wrapper.find('.contextButton');
    contextBtn.simulate('click');
    expect(dispatchToHooksTestCase).toHaveBeenCalled();
  });
});
