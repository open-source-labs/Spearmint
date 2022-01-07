import React, { useState } from 'react';
import './SearchInput.scss';

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
}) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    const input = e.currentTarget.value;

    // this filters the options as we type, showing only relevant results from file tree
    const newFilteredOptions = options.filter(
      (optionName) => (optionName.toLowerCase().indexOf(input.toLowerCase()) > -1)
    );

    setActiveOption(0);
    setFilteredOptions(newFilteredOptions);
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

    // updateTypesFilePath and updateActionsFilePath are only not-null if used within Redux
    if (updateTypesFilePath) {
      dispatch(updateTypesFilePath(selectedOption, filePath, type));
    }
    if (updateActionsFilePath) dispatch(updateActionsFilePath(selectedOption, filePath, type));

    if (action) dispatch(action(selectedOption, filePath));
  };

  const handleKeyDown = (e) => {
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

  let optionList;
  if (showOptions && userInput) {
    optionList = filteredOptions
      ? (
        <ul className={reactTestCase ? 'react-test-options' : 'options'}>
          {filteredOptions.map((optionName, index) => (
            <li
              className={index === activeOption ? 'option-active' : ''}
              key={optionName}
              type={optionName}
              onClick={handleClick}
            >
              {optionName}
            </li>
          ))}
        </ul>
      )
      : (
        <div className='no-options'>
          <em>No Option!</em>
        </div>
      );
  }

  return (
    <div className='flex-item'>
      <label htmlFor='typesFile'>{label}</label>
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
    </div>
  );
};

export default SearchInput;
