/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestMenuButtons from '../components/TestMenu/TestMenuButtons';
import userEvent from '@testing-library/user-event';

describe('should render the TestMenuButtons component', () => {
  it('displays the test menu component', () => {
    render(<TestMenuButtons />);
    screen.debug();
  });

  it('displays all five test menu buttons', () => {
    render(<TestMenuButtons />);
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(5);
    expect(buttons).not.toBeNull();

    buttons.forEach((button) => {
      const icon = within(button).getByTestId(/icon/i);
      expect(icon).toBeInTheDocument();
    });
  });

  it('invokes resetTests, fileHandle, openScriptModal, saveTest, and openDocs functions on click', async () => {
    const props = {
      resetTests: jest.fn(),
      fileHandle: jest.fn(),
      openScriptModal: jest.fn(),
      saveTest: jest.fn(),
      openDocs: jest.fn(),
    };
    render(<TestMenuButtons {...props} />);

    await userEvent.click(screen.getByTitle('New Test'));
    expect(props.resetTests).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTitle('Preview File'));
    expect(props.fileHandle).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTitle('Run File'));
    expect(props.openScriptModal).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTitle('Save File'));
    expect(props.saveTest).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTitle('Need Help?'));
    expect(props.openDocs).toHaveBeenCalledTimes(1);
  });
});
