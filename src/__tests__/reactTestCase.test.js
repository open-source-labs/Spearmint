/**
 * @jest-environment jsdom
 */

import filterFileType from '../pages/TestFile/TestFile';
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ReactTestCase from "../components/TestCase/ReactTestCase";
import userEvent from "@testing-library/user-event";

describe('should render ReactTestCase component', () => {
  beforeEach(() => {
    render(<ReactTestCase filterFileType={filterFileType}/>);
  })


  it('displays main component', () => {
    expect(<ReactTestCase/>).not.toBe(null);
  })

  it('displays the h2 at the top of the page', () => {
    const h2 = screen.getByText(/react testing/i);
    expect(h2).toBeInTheDocument();
  })

  it('displays the correct number of buttons on the page (13)', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(13);
    expect(buttons).not.toBeNull();
  })

  it('displays the new test button', () => {
    const newTest = screen.getByTitle('New Test');
    expect(newTest).toBeInTheDocument();
  })

  it('displays the preview file button', () => {
    const previewFile = screen.getByTitle('Preview File');
    expect(previewFile).toBeInTheDocument();
  })

  it('displays the run file button', () => {
    const runFile = screen.getByTitle('Run File');
    expect(runFile).toBeInTheDocument();
  })

  it('displays the save file button', () => {
    const saveFile = screen.getByTitle('Save File');
    expect(saveFile).toBeInTheDocument();
  })

  it('displays the need help? button', () => {
    const needHelp = screen.getByTitle('Need Help?');
    expect(needHelp).toBeInTheDocument();
  })

  it('displays the search input bar', () => {
    const search = screen.getByLabelText('Search Component');
    expect(search).toBeInTheDocument();
  })

  it('displays the Add Mock Data button', () => {
    const button = screen.getByText('Add Mock Data');
    expect(button).toBeInTheDocument();
  })

  it('displays the test name input box', () => {
    const testName = screen.getByPlaceholderText('Describe name of test');
    expect(testName).toBeInTheDocument();
  })

  it('displays the unit test name input box', () => {
    const unitTestName = screen.getByPlaceholderText('Enter unit test name...');
    expect(unitTestName).toBeInTheDocument();
  })

  it('displays the add props button', () => {
    const propsButton = screen.getByText('Add Props');
    expect(propsButton).toBeInTheDocument();
  })

  it('displays the add render button', () => {
    const renderButton = screen.getByText('Add Render');
    expect(renderButton).toBeInTheDocument();
  })

  it('displays the add action button', () => {
    const actionButton = screen.getByText('Add Action');
    expect(actionButton).toBeInTheDocument();
  })

  it('displays the add assertion button', () => {
    const assertionButton = screen.getByText('Add Assertion');
    expect(assertionButton).toBeInTheDocument();
  })

  it('displays the add it statement button', () => {
    const itButton = screen.getByText('Add It Statement');
    expect(itButton).toBeInTheDocument();
  })

  it('displays the add describe block button', () => {
    const describeButton = screen.getByText('Add Describe Block');
    expect(describeButton).toBeInTheDocument();
  })

});