import React, { useState } from 'react';
import { deleteAction, updateAction } from '../../../context/testCaseActions';
import Autosuggest from 'react-autosuggest';
import { events } from './ActionEvents';
const minusIcon = require('../../../assets/images/minus3.svg');
const questionIcon = require('../../../assets/images/question.svg');

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : events.filter(e => e.name.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

const Action = ({ id, dispatchTestCase }) => {
  const [eventType, setEventType] = useState('');
  const [eventValue, setEventValue] = useState('');
  const [queryVariant, setQueryVariant] = useState('');
  const [querySelector, setQuerySelector] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [eventName, setEventName] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleClickDelete = e => {
    dispatchTestCase(deleteAction(id));
  };

  const handleChangeEventType = e => {
    setEventType(e.target.value);
    dispatchTestCase(
      updateAction(id, e.target.value, eventValue, queryVariant, querySelector, queryValue)
    );
  };

  const handleChangeEventValue = e => {
    setEventValue(e.target.value);
    dispatchTestCase(
      updateAction(id, eventType, e.target.value, queryVariant, querySelector, queryValue)
    );
  };

  const handleChangeQueryVariant = e => {
    setQueryVariant(e.target.value);
    dispatchTestCase(
      updateAction(id, eventType, eventValue, e.target.value, querySelector, queryValue)
    );
  };

  const handleChangeQuerySelector = e => {
    setQuerySelector(e.target.value);
    dispatchTestCase(
      updateAction(id, eventType, eventValue, queryVariant, e.target.value, queryValue)
    );
  };

  const handleChangeQueryValue = e => {
    setQueryValue(e.target.value);
    dispatchTestCase(
      updateAction(id, eventType, eventValue, queryVariant, querySelector, e.target.value)
    );
  };

  const needsEventValue = eventType => {
    const eventsWithValues = [
      'keyDown',
      'keyPress',
      'keyUp',
      'change',
      'input',
      'invalid',
      'submit',
    ];
    return eventsWithValues.includes(eventType);
  };

  const onChange = (event, { newValue }) => {
    setEventName(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Enter an action',
    value: eventName,
    onChange,
  };

  const theme = {
    container: {
      position: 'relative',
    },
    input: {
      width: 120,
      height: 0,
      padding: '10px 20px',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 300,
      fontSize: 16,
      border: '1px solid #aaa',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    inputFocused: {
      outline: 'none',
    },
    inputOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    suggestionsContainer: {
      display: 'none',
    },
    suggestionsContainerOpen: {
      display: 'block',
      position: 'absolute',
      top: 51,
      width: 280,
      border: '1px solid #aaa',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 300,
      fontSize: 16,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      zIndex: 2,
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    suggestion: {
      cursor: 'pointer',
      padding: '10px 20px',
    },
    suggestionHighlighted: {
      backgroundColor: '#ddd',
    },
  };

  return (
    <div>
      <h3>Action</h3>
      {/* <img src={minusIcon} onClick={handleClickDelete} /> */}
      <svg
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        onClick={handleClickDelete}
      >
        <path
          fill='#000000'
          d='M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M17,11V13H7V11H17Z'
        />
      </svg>
      <label htmlFor='event-type'>Event Type</label>
      <Autosuggest
        theme={theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      {/* <input type='text' id='event-type' onChange={handleChangeEventType} />
      {needsEventValue(eventType) && (
        <span>
          <label htmlFor='event-value' />
          <input type='text' id='event-type' onChange={handleChangeEventValue} />
        </span>
      )} */}

      <label htmlFor='queryVariant'>Query Selector</label>
      <svg
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <path
          fill='#000000'
          d='M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z'
        />
      </svg>
      <select id='queryVariant' onChange={handleChangeQueryVariant}>
        <option value='' />
        <option value='getBy'>getBy</option>
        <option value='getAllBy'>getAllBy</option>
        <option value='queryBy'>queryBy</option>
        <option value='queryAllBy'>queryAllBy</option>
        <option value='findBy'>findBy</option>
        <option value='findAllBy'>findAllBy</option>
      </select>
      <img src={questionIcon} />
      <select id='queries' onChange={handleChangeQuerySelector}>
        <option value='' />
        <option value='LabelText'>LabelText</option>
        <option value='PlaceholderText'>PlaceholderText</option>
        <option value='ByText'>Text</option>
        <option value='AltText'>AltText</option>
        <option value='Title'>Title</option>
        <option value='DisplayValue'>DisplayValue</option>
        <option value='Role'>Role</option>
        <option value='TestId'>TestId</option>
        {/* TextMatch Precision & Normalization will be added */}
      </select>
      <label>Query</label>
      <input type='text' onChange={handleChangeQueryValue} />
    </div>
  );
};

export default Action;
