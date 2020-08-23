import React, { useState } from 'react';
import './SearchInput.scss';

export const SearchInput = ({
  dispatch,
  action,
  filePathMap,
  options,
  reactTestCase,
  updateTypesFilePath,
  updateActionsFilePath,
  type,
}) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    const input = e.currentTarget.value;

    const filteredOptions = options.filter(
      (optionName) => optionName.toLowerCase().indexOf(input.toLowerCase()) > -1
    );

    setActiveOption(0);
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
    setUserInput(e.currentTarget.value);
  };

  const handleClick = (e) => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);

    const selectedOption = e.target.type;
    const filePath = filePathMap[selectedOption] || '';
    if (updateTypesFilePath) dispatch(updateTypesFilePath(selectedOption, filePath, type)); //type));
    if (updateActionsFilePath) dispatch(updateActionsFilePath(selectedOption, filePath, type));
    if (action) dispatch(action(selectedOption, filePath));
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setActiveOption(0);
      setShowOptions(false);
      setUserInput(filteredOptions[activeOption]);
      const selectedOption = filteredOptions[activeOption];
      const filePath = filePathMap[selectedOption] || '';
      if (action) dispatch(action(selectedOption, filePath));
      if (updateActionsFilePath) {
        dispatch(updateActionsFilePath(selectedOption, filePath, type));
      }
      if (updateTypesFilePath) dispatch(updateTypesFilePath(selectedOption, filePath, type)); //type));
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      setActiveOption(activeOption + 1);
    }
  };
  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions) {
      optionList = (
        <ul className={reactTestCase ? 'react-test-options' : 'options'}>
          {filteredOptions.map((optionName, index) => {
            return (
              <li
                className={index === activeOption ? 'option-active' : ''}
                key={optionName}
                type={optionName}
                onClick={handleClick}
              >
                {optionName}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className='no-options'>
          <em>No Option!</em>
        </div>
      );
    }
  }
  return (
    <div className='search-container'>
      <div className='search'>
        <input
          type='text'
          className='search-box'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={userInput}
          placeholder='File Name'
        />
      </div>
      {optionList}
    </div>
  );
};

export default SearchInput;
