/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Thunk from '../components/ReduxTestComponent/Thunk/Thunk';


const props = {
  async: {
    id: 0,
    field: '',
    actionType: '',
    actionsFileName: '',
    filePath: '',
    typesFileName: '',
    typesFilePath: '',
    asyncFunction: '',
    method: '',
    route: '',
    actionsFile: '',
    responseType: '',
    it: '',
    payloadKey: null,
    payloadType: null,
    expectedArg: '',
  },
  index: 0
}

describe('Redux Test Component Thunk', () => {

  it('displays the Thunk component', () => {
    render(<Thunk {...props}/>);
    screen.debug();
    const header = screen.getByRole('heading');
    expect(header).toHaveTextContent('Asynchronous Action Creator'); 
  })

  it('displays all of the labels', () => {
    render(<Thunk {...props}/>);
    
    const labels = screen.getAllByRole('textbox');
    expect(labels).toHaveLength(6);

    const dropdownLabels = screen.getAllByRole('combobox');
    expect(dropdownLabels).toHaveLength(3);
  })

  it('should correctly display default input value on It Statement', () => {
    render(<Thunk {...props}/>);

    const it = screen.getByRole('textbox', {name: 'It should...'});
    expect(it).toBeInTheDocument();
    expect(it.placeholder).toBe('e.g. store should hold expected action');
    expect(it.value).toBe('');
  })

  it('should correctly display default input value on Thunk Name', () => {
    render(<Thunk {...props}/>);

    const thunkActionCreator = screen.getByRole('textbox', {name: 'Thunk Action Creator'});
    expect(thunkActionCreator).toBeInTheDocument();
    expect(thunkActionCreator.value).toBe('');
  })

  it('should correctly display default input value on Thunk Name', () => {
    render(<Thunk {...props}/>);

    const thunkActionCreator = screen.getByRole('textbox', {name: 'Thunk Action Creator'});
    expect(thunkActionCreator).toBeInTheDocument();
    expect(thunkActionCreator.value).toBe('');
  })
})