/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import ActionCreator from '../components/ReduxTestComponent/ActionCreator/ActionCreator'

describe('Action Creator', () => {
  let props = {};

  beforeEach(() => {
    props = {
    actionCreator: {
      id: 1,
      actionsFileName: '',
      filePath: '',
      typesFileName: '',
      typesFilePath: '',
      type: '',
      actionCreatorFunc: '',
      actionType: '',
      payloadKey: '',
      payloadType: '',
      it: 'Hello', 
      },
    index: 0
    }
  })

  it('displays the ActionCreator component', () => {
    render(<ActionCreator {...props}/>);
    screen.debug();
    const actionCreator = screen.getByRole('heading');
    expect(actionCreator).toBeVisible();

    const actionCreatorLabel = screen.getAllByText('Action Creator');
    expect(actionCreatorLabel).toHaveLength(2);
  });

  it('displays all of the labels correctly', () => {
    render(<ActionCreator {...props}/>);
    
    const labels = screen.getAllByRole('textbox');
    expect(labels).toHaveLength(4);
  })
})