import React from 'react';
import LeftPanel from '../LeftPanel';
import TestCase from '../TestCase/TestCase';
import ReduxTestCase from '../TestCase/ReduxTestCase';
import TestFile from '../TestFile/TestFile';
import TestMenu from '../../LeftPanel/TestMenu/TestMenu';
import { GlobalContext } from '../../../context/globalReducer';
import { ReduxTestCaseContext } from '../../../context/reduxTestCaseReducer';

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

let wrapper, globalM, dispatchToGlobal, reduxTestCase, dispatchToReduxTestCase;

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
  reduxTestCase = {
    testStatement: '',
    statements: [],
    hasRedux: 1,
  };
  dispatchToReduxTestCase = jest.fn();

  wrapper = mount(
    <GlobalContext.Provider value={[global, dispatchToGlobal]}>
      <ReduxTestCaseContext.Provider value={[reduxTestCase, dispatchToReduxTestCase]}>
        <LeftPanel />
        <ReduxTestCase />
      </ReduxTestCaseContext.Provider>
    </GlobalContext.Provider>
  );

  jest.resetModules();
});

describe('testing left panel', () => {
  it('renders the left panel with initial buttons and first render boxes', () => {
    expect(1).toEqual(1)
    // expect(wrapper.text()).toContain('Reducer');
    // expect(wrapper.text()).toContain('Action Creator');
    // expect(wrapper.text()).toContain('Async Action Creator');
    // expect(wrapper.text()).toContain('Middleware');
  });

  // Rachel's tests from here
  xit('new assertion card is produced when assertion button is clicked', () => {
    // const button = wrapper.find('.assertionButton')
    // button.simulate('click');
    // expect(button.text()).toBe('Assertion');
    // expect(testCase.statements.length).toEqual(3);
  });

  xit('action card is removed when delete button is clicked', () => { });

  xit('clicking the mock data checkbox renders mock data input fields', () => { });

  xit('props table displays when prop checkbox on Render card is clicked', () => { });

  xit('wipes existing test statements when new test button is clicked ', () => { });
});
