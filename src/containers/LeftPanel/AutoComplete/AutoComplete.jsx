import React from 'react';
import styles from './AutoComplete.module.scss';
import { setEventType, setActionSuggestions } from '../Action/actionActions';
import { setMatcherType, setAssertionSuggestions } from '../Assertion/assertionActions';
import { updateAction, updateAssertion } from '../../../context/testCaseActions';
import { eventTypesList } from '../Action/eventTypesList';
import { matcherTypesList } from '../Assertion/matcherTypesList';
import AutoSuggest from 'react-autosuggest';

const AutoComplete = ({
  statement,
  type,
  dispatchToAction,
  dispatchToAssertion,
  dispatchToTestCase,
}) => {
  const handleChangeEventType = (e, { newValue }) => {
    if (type === 'action') {
      dispatchToAction(setEventType(newValue));
      dispatchToTestCase(updateAction(newValue));
    } else {
      dispatchToAssertion(setMatcherType(newValue));
      dispatchToTestCase(updateAssertion(newValue));
    }
  };

  const inputProps = {
    placeholder: type === 'action' ? 'Enter an action' : 'Enter a matcher',
    value: type === 'action' ? statement.eventType : statement.matcherType,
    onChange: handleChangeEventType,
  };

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (type === 'action') {
      return inputLength === 0
        ? []
        : eventTypesList.filter(
            event => event.name.toLowerCase().slice(0, inputLength) === inputValue
          );
    } else {
      return inputLength === 0
        ? []
        : matcherTypesList.filter(
            matcher => matcher.name.toLowerCase().slice(0, inputLength) === inputValue
          );
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    type === 'action'
      ? dispatchToAction(setActionSuggestions(getSuggestions(value)))
      : dispatchToAssertion(setAssertionSuggestions(getSuggestions(value)));
  };

  const onSuggestionsClearRequested = () => {
    type === 'action'
      ? dispatchToAction(setActionSuggestions([]))
      : dispatchToAssertion(setAssertionSuggestions([]));
  };
  const getSuggestionValue = suggestion => suggestion.name;
  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  return (
    <AutoSuggest
      theme={styles}
      suggestions={type === 'action' ? statement.actionSuggestions : statement.assertionSuggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutoComplete;
