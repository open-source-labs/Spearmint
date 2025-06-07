import ReactTestCase.tsx from '../src/components/TestCase/ReactTestCase.tsx';
import React from 'react';
import { build, fake } from 'test-data-bot';
import mocha from 'mocha';
import chai from 'chai';
import chai - dom from 'chai-dom';


describe('should render ReactTestCase component', () => {
  it('displays main component', () => {
    expect(
      <ReactTestCase />).not.to.be();
    const {} = render(<ReactTestCase.tsx filterFileType={{filterFileType}}/>);
  })
});