import React from 'react';
import ReduxTestCase from '../TestCase/ReduxTestCase';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../../context/reducers/reduxTestCaseReducer';
import { TestFileModalContext } from '../../../context/reducers/testFileModalReducer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Reducer from '../Reducer/Reducer';

configure({ adapter: new Adapter() });

let wrapper, globalM, dispatchToGlobal, reduxTestCase, dispatchToReduxTestCase, testFileModal, dispatchToTestFileModal;

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
    reduxTestStatement: '',
    reduxStatements: [],
    hasRedux: 1,
  };

  testFileModal = {}
  dispatchToTestFileModal = jest.fn();

  dispatchToReduxTestCase = jest.fn();

  wrapper = mount(
    <GlobalContext.Provider value={[global, dispatchToGlobal]}>
      <TestFileModalContext.Provider value={[testFileModal, dispatchToTestFileModal]}>
        <ReduxTestCaseContext.Provider value={[reduxTestCase, dispatchToReduxTestCase]}>
          <ReduxTestCase />
        </ReduxTestCaseContext.Provider>
      </TestFileModalContext.Provider>
    </GlobalContext.Provider>
  );

  jest.resetModules();
});

describe('testing left panel redux test menu', () => {
  it('renders the redux menu with initial buttons and first render boxes', () => {
    expect(wrapper.text()).toContain('Reducer');
    expect(wrapper.text()).toContain('Action Creator');
    expect(wrapper.text()).toContain('Async Action Creator');
    expect(wrapper.text()).toContain('Middleware');
  });

  it('onclick function is invoked when reducer button is clicked', () => {
    const button = wrapper.find('[data-testid="reducerButton"]')
    button.simulate('click');
    expect(dispatchToReduxTestCase).toHaveBeenCalled();
  });

  it('onclick function is invoked when action creator button is clicked', () => {
    const button = wrapper.find('[data-testid="actionCreatorButton"]')
    button.simulate('click');
    expect(dispatchToReduxTestCase).toHaveBeenCalled();
  });

  it('onclick function is invoked when async action creator button is clicked', () => {
    const button = wrapper.find('[data-testid="asyncButton"]')
    button.simulate('click');
    expect(dispatchToReduxTestCase).toHaveBeenCalled();
  });

  it('onclick function is invoked when middleware button is clicked', () => {
    const button = wrapper.find('[data-testid="middlewareButton"]')
    button.simulate('click');
    expect(dispatchToReduxTestCase).toHaveBeenCalled();
  });

  it('there should be 5 buttons', () => {
    expect(wrapper.find('button').length).toEqual(5)
  });
});
