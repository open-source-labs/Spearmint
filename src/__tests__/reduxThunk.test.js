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
    actionType: null,
    actionsFileName: '',
    filePath: '',
    typesFileName: '',
    typesFilePath: '',
    asyncFunction: null,
    method: '',
    route: '',
    actionsFile: '',
    responseType: '',
    it: null,
    payloadKey: null,
    payloadType: null,
    expectedArg: null,
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

  it('should correctly display default input value on Action Type', () => {
    render(<Thunk {...props}/>);

    const actionType = screen.getByRole('textbox', {name: 'Action Type Of Expected Action'});
    expect(actionType).toBeInTheDocument();
    expect(actionType.placeholder).toBe('e.g. ADD_TODO');
    expect(actionType.value).toBe('');
  })

  it('should correctly display default input value on Argument 1', () => {
    render(<Thunk {...props}/>);

    const argumentOne = screen.getByRole('textbox', {name: 'Argument 1'});
    expect(argumentOne).toBeInTheDocument();
    expect(argumentOne.placeholder).toBe('e.g. response');
    expect(argumentOne.value).toBe('');
  })

  it('should correctly display the options on Type 1 dropdown', () => {
    render(<Thunk {...props}/>);

    const typeOne = screen.getByRole('combobox', {name: 'Type 1'});
    const options = typeOne.querySelectorAll('option');
    expect(options).toHaveLength(6);
    expect(options[0].value).toBe('');
    expect(options[1].value).toBe('word');
    expect(options[2].value).toBe('words');
    expect(options[3].value).toBe('number');
    expect(options[4].value).toBe('arrayElement');
    expect(options[5].value).toBe('objectElement');
  })

  it('should correctly display default input value on Argument 2', () => {
    render(<Thunk {...props}/>);

    const argumentOne = screen.getByRole('textbox', {name: 'Argument 2'});
    expect(argumentOne).toBeInTheDocument();
    expect(argumentOne.placeholder).toBe('e.g. id');
    expect(argumentOne.value).toBe('');
  })

  it('should correctly display the options on Type 2 dropdown', () => {
    render(<Thunk {...props}/>);

    const typeTwo = screen.getByRole('combobox', {name: 'Type 2'});
    const options = typeTwo.querySelectorAll('option');
    expect(options).toHaveLength(6);
    expect(options[0].value).toBe('');
    expect(options[1].value).toBe('word');
    expect(options[2].value).toBe('words');
    expect(options[3].value).toBe('number');
    expect(options[4].value).toBe('arrayElement');
    expect(options[5].value).toBe('objectElement');
  })
})

describe('User Events on Redux Thunk Component', () => {

  it('updates the It Statement input field value on user input', async () => {
    const user = userEvent.setup();
    render(<Thunk {...props}/>);

    const it = screen.getByRole('textbox', {name: 'It should...'});
    expect(it.value).toBe('');

    await user.type(it, 'If spearmint has a million fans');
    expect(it.value).toBe('If spearmint has a million fans');
  })

  it('updates the Thunk Action Creator input field value on user input', async () => {
    const user = userEvent.setup();
    render(<Thunk {...props}/>);

    const thunkActionCreator = screen.getByRole('textbox', {name: 'Thunk Action Creator'});
    expect(thunkActionCreator.value).toBe('');

    await user.type(thunkActionCreator, 'then I am one of them.');
    expect(thunkActionCreator.value).toBe('then I am one of them.');
  })

  it('updates the Action Type input field value on user input', async () => {
    const user = userEvent.setup();
    render(<Thunk {...props}/>);

    const actionType = screen.getByRole('textbox', {name: 'Action Type Of Expected Action'});
    expect(actionType.value).toBe('');

    await user.type(actionType, 'If spearmint has a ten fans, then I am one of them.');
    expect(actionType.value).toBe('If spearmint has a ten fans, then I am one of them.');
  })

  it('updates the Argument 1 input field value on user input', async () => {
    const user = userEvent.setup();
    render(<Thunk {...props}/>);

    const argumentOne = screen.getByRole('textbox', {name: 'Argument 1'});
    expect(argumentOne.value).toBe('');

    await user.type(argumentOne, 'If spearmint has only one fan, then that is me.');
    expect(argumentOne.value).toBe('If spearmint has only one fan, then that is me.');
  })

  it('updates the Type 1 dropdown option on user input', async () => {
    const user = userEvent.setup();
    render(<Thunk {...props}/>);

    const typeOne = screen.getByRole('combobox', {name: 'Type 1'});
    const options = typeOne.querySelector('option', {name: ''});
    expect(options.selected).toBe(true);

    const userSelection = typeOne.querySelector('option', {name: 'arrayElement'});
    await user.selectOptions(typeOne, userSelection);
    expect(userSelection.selected).toBe(true);
  })

  it('updates the Argument 2 input field value on user input', async () => {
    const user = userEvent.setup();
    render(<Thunk {...props}/>);

    const argumentTwo = screen.getByRole('textbox', {name: 'Argument 2'});
    expect(argumentTwo.value).toBe('');

    await user.type(argumentTwo, 'If the world is against spearmint, then I am against the world.');
    expect(argumentTwo.value).toBe('If the world is against spearmint, then I am against the world.');
  })

  it('updates the Type 2 dropdown option on user input', async () => {
    const user = userEvent.setup();
    render(<Thunk {...props}/>);

    const typeTwo = screen.getByRole('combobox', {name: 'Type 2'});
    const options = typeTwo.querySelector('option', {name: ''});
    expect(options.selected).toBe(true);

    const userSelection = typeTwo.querySelector('option', {name: 'number'});
    await user.selectOptions(typeTwo, userSelection);
    expect(userSelection.selected).toBe(true);
  })
})