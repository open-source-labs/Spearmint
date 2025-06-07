import React, { useContext } from 'react';
import AutoSuggest from 'react-autosuggest';
import styles from './AutoComplete.module.scss';
import {
  updateAction,
  updateAssertion,
} from '../../context/actions/frontendFrameworkTestCaseActions';
import { jestEventTypesList } from '../TypesList/eventTypesList';
import { cypressSelectorTypesList } from '../TypesList/cypressQuerySelectorTypesList';
import { cypressQueryActionTypesList } from '../TypesList/cypressQueryActionTypesList';
import { matcherTypesList as jestMatchers } from '../TypesList/matcherTypesList';
import { cypressMatcherTypesList } from '../../components/TypesList/cypressMatcherTypeList';
import { mochaMatcherTypesList } from '../TypesList/mochaMatcherTypesList';
import { sinonMatcherTypesList } from '../TypesList/sinonMatcherTypesList';
import {
  AutoCompleteProps,
  AutoCompleteStatement,
} from '../../utils/reactTestCase';
import { GlobalContext } from '../../context/reducers/globalReducer';

interface SuggestionType {
  name: string;
}

const AutoComplete = (props: AutoCompleteProps): JSX.Element => {
  const {
    statement,
    statementType,
    dispatchToTestCase,
    type = 'react',
    fieldType,
  } = props;
  const [{ testFramework }] = useContext(GlobalContext);

  let updatedAction: AutoCompleteStatement = { ...statement };
  let updatedAssertion = { ...statement };

  const handleChangeValue = (
    e: React.ChangeEvent,
    { newValue }: { newValue: string }
  ) => {
    if (statementType === 'action' && fieldType) {
      updatedAction[fieldType] = newValue;
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
        : 'eg. toHaveTextValue',
    value:
      statementType === 'action' && fieldType
        ? statement[fieldType] || ''
        : updatedAssertion.isNot
        ? `not.${statement.matcherType}`
        : statement.matcherType || '',
    onChange: handleChangeValue,
  };

  const getSuggestions = (value: string, fieldType?: string): any[] => {
    const inputValue = value?.trim().toLowerCase();
    if (!inputValue) return [];

    if (type === 'react' || type === 'vue' || type === 'svelte') {
      if (statementType === 'action') {
        if (testFramework === 'cypress') {
          if (fieldType === 'queryVariant') {
            return cypressSelectorTypesList.filter((matcher) =>
              matcher.name.toLowerCase().startsWith(inputValue)
            );
          }
          if (fieldType === 'eventType') {
            return cypressQueryActionTypesList.filter((matcher) =>
              matcher.name.toLowerCase().startsWith(inputValue)
            );
          }
        }
        return jestEventTypesList.filter((matcher) =>
          matcher.name.toLowerCase().startsWith(inputValue)
        );
      }

      if (statementType === 'assertion') {
        const matcherList =
          testFramework === 'cypress'
            ? cypressMatcherTypesList
            : testFramework === 'mocha'
            ? mochaMatcherTypesList
            : testFramework === 'sinon'
            ? sinonMatcherTypesList
            : jestMatchers;

        return matcherList.filter((matcher) =>
          matcher.name.toLowerCase().startsWith(inputValue)
        );
      }
    }

    return [];
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const suggestions = getSuggestions(value, fieldType);
    if (statementType === 'action') {
      updatedAction.suggestions = suggestions;
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.suggestions = suggestions;
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

  const getSuggestionValue = (suggestion: SuggestionType) =>
    updatedAssertion.isNot ? `not.${suggestion.name}` : suggestion.name;

  const renderSuggestion = (suggestion: SuggestionType) => (
    <div>
      {updatedAssertion.isNot ? `not.${suggestion.name}` : suggestion.name}
    </div>
  );

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
