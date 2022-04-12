import React from 'react';
import AutoSuggest from 'react-autosuggest';
import styles from './AutoComplete.module.scss';
import { updateAction, updateAssertion } from '../../context/actions/reactTestCaseActions';
import { eventTypesList } from '../ReactTestComponent/Action/eventTypesList';
import { matcherTypesList } from '../ReactTestComponent/Assertion/matcherTypesList';
import { vueTypesList } from '../VueTestComponent/Assertion/matcherTypesList'
import {svelteTypesList} from '../SvelteTestComponent/Assertion/matcherTypesList'

const AutoComplete = ({ statement, statementType, dispatchToTestCase, type = 'react' }) => {
  let updatedAction = { ...statement };
  let updatedAssertion = { ...statement };

  const handleChangeValue = (e, { newValue }) => {
    if (statementType === 'action') {
      updatedAction.eventType = newValue;
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.matcherType = newValue;
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  const inputProps = {
    placeholder:
      statementType === 'action' ? 'eg. click, change, keypress' : 'eg. toHaveTextValue ',
    value:
      statementType === 'action'
        ? statement.eventType
        : statementType === 'assertion'
        ? statement.matcherType
        : statementType === 'assertion' && updatedAssertion.isNot
        ? `not.${statement.matcherType}`
        : null,

    onChange: handleChangeValue,
  };
  
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if(type === 'react'){
      if (statementType === 'action') {
        return inputLength === 0
          ? []
          : eventTypesList.filter(
              (eventType) => eventType.name.toLowerCase().slice(0, inputLength) === inputValue
            );
      } else {
        return inputLength === 0
          ? []
          : matcherTypesList.filter(
              (matcherType) => matcherType.name.toLowerCase().slice(0, inputLength) === inputValue
            );
      }
    }
    else if (type === 'vue'){
      if (statementType === 'action') {
        return inputLength === 0
          ? []
          : eventTypesList.filter(
              (eventType) => eventType.name.toLowerCase().slice(0, inputLength) === inputValue
            );
      } else {
        return inputLength === 0
          ? []
          : vueTypesList.filter(
              (matcherType) => matcherType.name.toLowerCase().slice(0, inputLength) === inputValue
            );
      }
    }
    else if (type === 'svelte'){
      if (statementType === 'action') {
        return inputLength === 0
          ? []
          : eventTypesList.filter(
              (eventType) => eventType.name.toLowerCase().slice(0, inputLength) === inputValue
            );
      } else {
        return inputLength === 0
          ? []
          : vueTypesList.filter(
              (matcherType) => matcherType.name.toLowerCase().slice(0, inputLength) === inputValue
            );
      }
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    if (statementType === 'action') {
      updatedAction.suggestions = getSuggestions(value);
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.suggestions = getSuggestions(value);
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  const onSuggestionsClearRequested = () => {
    if (statementType === 'action') {
      updatedAction.suggestions = [];
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.suggestions = [];
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  let getSuggestionValue;
  updatedAssertion.isNot
    ? (getSuggestionValue = (suggestion) => `not.${suggestion.name}`)
    : (getSuggestionValue = (suggestion) => suggestion.name);

  let renderSuggestion;

  updatedAssertion.isNot
    ? (renderSuggestion = (suggestion) => <div>not.{suggestion.name}</div>)
    : (renderSuggestion = (suggestion) => <div>{suggestion.name}</div>);

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
