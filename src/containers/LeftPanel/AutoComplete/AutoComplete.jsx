import React from 'react';
import styles from './AutoComplete.module.scss';
import { updateAction, updateAssertion, updateReducer, updateMiddleware } from '../../../context/testCaseActions';
import { eventTypesList } from '../Action/eventTypesList';
import { matcherTypesList } from '../Assertion/matcherTypesList';
import AutoSuggest from 'react-autosuggest';

/* where is this destructiong from ?? */
const AutoComplete = ({ statement, statementType, dispatchToTestCase }) => {
  let updatedAction = { ...statement };
  let updatedAssertion = { ...statement };
  let updatedMiddleware = { ...statement };
  let updatedReducer = { ...statement };

  const handleChangeValue = (e, { newValue }) => {
    if (statementType === 'action') {
      updatedAction.eventType = newValue;
      dispatchToTestCase(updateAction(updatedAction));
    } else if (statementType === 'middleware') {
      updatedMiddleware.eventType = newValue;
      dispatchToTestCase(updateAssertion(updatedAssertion));
    } else {
      updatedAssertion.matcherType = newValue;
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
    // added conditional for when statement type is reducer
    if (statementType === 'reducer') {
      updatedReducer.matcherType = newValue;
      dispatchToTestCase(updateReducer(updatedReducer));
    }
  };

  const inputProps = {
    placeholder:
      statementType === 'action' ? 'eg. click, change, keypress' : statementType === 'middleware' ? 'eg. non func stuff' : 'eg. toHaveTextValue ',
    value:
      statementType === 'action' 
        ? statement.eventType
        : statementType === 'middleware'
        ? statement.eventType
        : statementType === 'assertion'
          ? statement.matcherType
          : statementType === 'assertion' && updatedAssertion.isNot
            ? `not.${statement.matcherType}`
            : statementType === 'reducer'
              ? statement.matcherType
              : null,

    onChange: handleChangeValue,
  };

  const getSuggestions = value => {
    console.log('suggst value func', value)
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (statementType === 'action') {
      return inputLength === 0
        ? []
        : eventTypesList.filter(
          eventType => eventType.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    } else {
      return inputLength === 0
        ? []
        : matcherTypesList.filter(
          matcherType => matcherType.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    if (statementType === 'action') {
      updatedAction.suggestions = getSuggestions(value);
      console.log('suggst value if', value)
      dispatchToTestCase(updateAction(updatedAction));
    } else if (statementType === 'middleware') {
      updatedMiddleware.suggestions = getSuggestions(value);
      dispatchToTestCase(updateMiddleware(updatedMiddleware));
    } else {
      updatedAssertion.suggestions = getSuggestions(value);
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  const onSuggestionsClearRequested = () => {
    if (statementType === 'action') {
      updatedAction.suggestions = [];
      dispatchToTestCase(updateAction(updatedAction));
    } else if (statementType === 'middleware') {
      updatedMiddleware.suggestions = [];
      dispatchToTestCase(updateMiddleware(updatedMiddleware));
    } else {
      updatedAssertion.suggestions = [];
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  let getSuggestionValue;
  updatedAssertion.isNot
    ? (getSuggestionValue = suggestion => `not.${suggestion.name}`)
    : (getSuggestionValue = suggestion => suggestion.name);

  let renderSuggestion;

  updatedAssertion.isNot
    ? (renderSuggestion = suggestion => <div>not.{suggestion.name}</div>)
    : (renderSuggestion = suggestion => <div>{suggestion.name}</div>);

  return (
    <AutoSuggest
      theme={styles}
      suggestions={statement.suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutoComplete;
