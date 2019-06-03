import React from 'react';
import styles from './AutoComplete.module.scss';
import { setEventType, setSuggestions } from './actionActions';
import { updateAction } from '../../../context/testCaseActions';
import { eventTypesList } from './eventTypesList';
import AutoSuggest from 'react-autosuggest';

const AutoComplete = ({ action, dispatchToAction, dispatchToTestCase }) => {
  const handleChangeEventType = (e, { newValue }) => {
    dispatchToAction(setEventType(newValue));
    dispatchToTestCase(updateAction(newValue));
  };

  const inputProps = {
    placeholder: 'Enter an action',
    value: action.eventType,
    onChange: handleChangeEventType,
  };

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : eventTypesList.filter(lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    dispatchToAction(setSuggestions(getSuggestions(value)));
  };

  const onSuggestionsClearRequested = () => {
    dispatchToAction(setSuggestions([]));
  };
  const getSuggestionValue = suggestion => suggestion.name;
  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  return (
    <AutoSuggest
      theme={styles}
      suggestions={action.suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutoComplete;
