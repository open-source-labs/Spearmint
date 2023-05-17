import React, { useState } from 'react';
import './SearchInput.scss';
import { Autocomplete } from '@mui/material';
import InputTextField from '../InputTextField';
import { filePathMapType } from '../../utils/globalTypes';

interface SearchInputProps {
  dispatch: Function;
  action?: Function;
  filePathMap: filePathMapType;
  options: Array<string>;
  reactTestCase?: string | null;
  updateTypesFilePath?: Function | null;
  updateActionsFilePath?: Function | null;
  type?: string | null;
  label: string | null
}

const SearchInput = ({
  dispatch,
  action,
  filePathMap,
  options,
  reactTestCase = null,
  updateTypesFilePath = null,
  updateActionsFilePath = null,
  type = null,
  label,
} : SearchInputProps ) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleChange = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const input = currentTarget.value;

    // this filters the options as we type, showing only relevant results from file tree
    const newFilteredOptions: string[] = options.filter(
      (optionName) => (optionName.toLowerCase().indexOf(input.toLowerCase()) > -1)
    );

    setActiveOption(0);
    setFilteredOptions(newFilteredOptions);
    setShowOptions(true);
    setUserInput(currentTarget.value);
  };

  const handleClick = (e: React.SyntheticEvent) => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    const currentTarget = e.currentTarget as HTMLButtonElement
    setUserInput(currentTarget.innerText);

    const selectedOption = currentTarget.innerText;
    const filePath = filePathMap[selectedOption] || '';

    // updateTypesFilePath and updateActionsFilePath are only not-null if used within Redux
    if (updateTypesFilePath) {
      dispatch(updateTypesFilePath(selectedOption, filePath, type));
    }
    if (updateActionsFilePath) dispatch(updateActionsFilePath(selectedOption, filePath, type));

    if (action) dispatch(action(selectedOption, filePath));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (action) dispatch(action('', ''));

    if (e.keyCode === 13) { // keycode 13 = enter
      setActiveOption(0);
      setShowOptions(false);
      setUserInput(filteredOptions[activeOption]);

      const selectedOption = filteredOptions[activeOption];
      const filePath = filePathMap[selectedOption] || '';

      if (action) dispatch(action(selectedOption, filePath));

      // following if is only relevant to redux
      if (updateTypesFilePath) {
        dispatch(updateTypesFilePath(selectedOption, filePath, type));
      }
    } else if (e.keyCode === 38) {
      // keycode 38 = up arrow - if at top, return, else, move active option highlight up
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      // keycode 40 = down arrow - if at bottom, return, else, move active option highlight down
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      setActiveOption(activeOption + 1);
    }
  };

  return (
  <Autocomplete
    options={options}
    value={userInput}
    onChange={handleClick}
    renderInput={(params) => (
      <InputTextField
        {...params}
        label={label}
        variant="outlined"
        size="small"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
      />
    )}
  />
  );
};

export default SearchInput;
