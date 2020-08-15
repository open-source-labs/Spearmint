import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactTestMenu from '../components/TestMenu/ReactTestMenu';

describe('React Test Menu', () => {
  it('renders Need Help? button', () => {
    render(<ReactTestMenu />);
    expect(screen.getByText('example')).toBeInTheDocument();
  });
});
