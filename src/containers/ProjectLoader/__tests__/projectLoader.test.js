import React from 'react';
import { GlobalContext } from '../../../context/globalReducer';
import BrowserView from '../../RightPanel/BrowserView/BrowserView';
import EditorView from '../../RightPanel/EditorView/EditorView';
import RightPanel from '../../RightPanel/RightPanel';

import { render, fireEvent } from '@testing-library/react';
import { build, fake } from 'test-data-bot';
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { exportAllDeclaration } from '@babel/types';

Enzume.configure({ adapter: new Adapter() });

let globalM = {
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

let dispatchToGlobal = jest.fn();

let wrapper = mount(
  <GlobalContext.Provider value={[globalM, dispatchToGlobal]}>
    <ProjectLoader />
    <Navbar>
      <FileDirectory />
    </Navbar>
    <RightPanel>
      <BrowserView />
      <EditorView />
    </RightPanel>
  </GlobalContext.Provider>
);

test('displays browser view of when URL is correctly inputted', () => {
  globalM.url !== null;
  const browserViewComponent = wrapper.find(<BrowserView />);
  expect(browserViewComponent).toMatchSnapshot();
});

test(`omitting 'www' from URL still displays browser view`, () => {
  const addHttps = wrapper.find(addHttps());
  addHttps(!url.startsWith('www'));
  const browserViewComponent = wrapper.find(<BrowserView />);
  expect(browserViewComponent).toMatchSnapshot();
});

test('displays file directory of project that is loaded', () => {});

test(`displays project's name on the top of the file directory view`, () => {});
