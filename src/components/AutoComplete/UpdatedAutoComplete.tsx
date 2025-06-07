import React from 'react';
import AutoSuggest from 'react-autosuggest';
import styles from './AutoComplete.module.scss';
import {
  updateAction,
  updateAssertion,
} from '../../context/actions/frontendFrameworkTestCaseActions';

import { handleChange } from '../../context/actions/updatedFrontendFrameworkTestCaseActions';
import { eventTypesList } from '../TypesList/eventTypesList';
import { matcherTypesList } from '../TypesList/matcherTypesList';
import {
  AutoCompleteProps,
  AutoCompleteStatement,
} from '../../utils/reactTestCase';

/**
 * Renders the AutoComplete react component - this component is specifically for the FrontEnd frameworks and uses the eventTypesList
 * and the matcherTypesList Javascript files to AutoComplete when typing in the corresponding field (Matcher for Assertions, Event Type for Actions)
 * @property { string } statement -
 * @property { string } statementType -
 * @property { Function } dispatchToTestCase -
 * @property { string } type - Default to react, but also later reassigned to work for other FrontEnd frameworks
 *
 * @returns { JSX.Element } Returns the AutoComplete react component
 */

interface SuggestionType {
  name: string;
}

const UpdatedAutoComplete = (props: AutoCompleteProps): JSX.Element => {
  const {
    statement,
    statementType,
    dispatchToTestCase,
    type = 'react',
  } = props;
  let updatedAction: AutoCompleteStatement = { ...statement };
  let updatedAssertion = { ...statement };

  /**
   * This function updates the state as the user types into the input boxes
   * @param { e } e - event
   * @param { string } newValue - current input box text
   */
  const handleChangeValue = (
    e: React.ChangeEvent,
    { newValue }: { newValue: string }
  ) => {
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
      statementType === 'action'
        ? 'eg. click, change, keypress'
        : 'eg. toHaveTextValue ',
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
  /**
   * function that filters through the eventTypes and matcherTypes that corresponds to the test type
   * and makes user input not case-sensitive
   * @param { string } value - User input
   * @returns { (string[] | []) } Returns an array of eventTypes/matcherTypes or an empty array when user has to provide an input
   */
  const getSuggestions = (value: string): number | any[] | void => {
    //array must be typed as any since this sometimes returns an empty array
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (type === 'react' || type === 'vue' || type === 'svelte') {
      if (statementType === 'action') {
        return inputLength === 0
          ? []
          : eventTypesList.filter(
              (eventType) =>
                eventType.name.toLowerCase().slice(0, inputLength) ===
                inputValue
            );
      } else {
        return inputLength === 0
          ? []
          : matcherTypesList.filter(
              (matcherType) =>
                matcherType.name.toLowerCase().slice(0, inputLength) ===
                inputValue
            );
      }
    }
  };

  /**
   * This function calls upon the previous function getSuggestions and updates the state
   * @param { string } value - User Input
   * @returns { void } Returns void
   */
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    if (statementType === 'action') {
      updatedAction.suggestions = getSuggestions(value);
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.suggestions = getSuggestions(value);
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  /**
   * Function that updates the state and clears suggestions back to displaying nothing.
   * @returns { void } Returns void
   */
  const onSuggestionsClearRequested = () => {
    if (statementType === 'action') {
      updatedAction.suggestions = [];
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.suggestions = [];
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  //getSuggestionValue is the list of suggestions from the dropdown menu
  //udatedAssertion.isNot is a property that is updated when the Not checkbox is clicked (Visible when adding Assertions to tests)
  let getSuggestionValue;
  updatedAssertion.isNot
    ? (getSuggestionValue = (suggestion: SuggestionType) =>
        `not.${suggestion.name}`)
    : (getSuggestionValue = (suggestion: SuggestionType) => suggestion.name);

  let renderSuggestion;

  updatedAssertion.isNot
    ? (renderSuggestion = (suggestion: SuggestionType) => (
        <div>not.{suggestion.name}</div>
      ))
    : (renderSuggestion = (suggestion: SuggestionType) => (
        <div>{suggestion.name}</div>
      ));

  return (
    //@ts-ignore --> whoever wrote the code below borked the implementation, so if you can correctly deduce the type of this, hats off to you
    // this component should probably be completely rewritten, the way it interacts with state is suboptimal
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

export default UpdatedAutoComplete;
