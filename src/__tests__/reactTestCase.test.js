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

  it('displays the search input bar', () => {
    const search = screen.getByLabelText('Search Component');
    expect(search).toBeInTheDocument();
  })

  it('displays the Add Mock Data button', () => {
    const button = screen.getByLabelText('ADD MOCK DATA')
    expect(button).toBeInTheDocument();
  })

  it('displays the ', () => {
    const  = screen.getBy('')
    expect().toBeInTheDocument();
  })

  it('displays the ', () => {
    const  = screen.getBy('')
    expect().toBeInTheDocument();
  })

  



});