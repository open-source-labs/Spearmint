import React, { useContext, useState } from 'react';
import styles from '../AutoComplete/AutoCompleteMockData.module.scss';
import AutoSuggest from 'react-autosuggest';
import {
  updateAction,
  updateAssertion,
  updateProp,
} from '../../context/actions/frontendFrameworkTestCaseActions';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { AutoCompleteMockDataProps } from '../../utils/reactTestCase';

/**
 * Renders the AutoCompleteMockData react component - this component is specifically for the FrontEnd frameworks and uses the eventTypesList
 * and the matcherTypesList Javascript files to AutoComplete when typing in the corresponding field (Matcher for Assertions, Event Type for Actions)
 *
 * NOTE: The functionality is very similar to the AutoComplete react component, reference that component for many of these functions.
 * @property { string } statement -
 * @property { string } statementType -
 * @property { Function } dispatchToTestCase -
 * @property { } propType
 * @property { } renderId
 * @property { } propId
 * @property { } propKey
 * @property { } propValue
 *
 * @returns { JSX.Element } Returns the AutoCompleteMockData react component
 */
const UpdatedAutoCompleteMockData = ({
  statement,
  statementType,
  dispatchToTestCase,
  propType,
  renderId,
  propId,
  propKey,
  propValue,
}: AutoCompleteMockDataProps) => {
  let updatedAction = { ...statement };
  let updatedAssertion = { ...statement };

  const initialState: { value: string }[] = [];
  const [{ mockData }]: any[] = useContext(MockDataContext);
  const [mockDataValue, setMockDataValue] = useState('');
  const [mockDataSuggestions, setMockDataSuggestions] = useState(initialState);
  const mockOptionsList: { value: string }[] = [];

  const handleChangeValue = (
    event: React.FormEvent,
    { newValue }: { newValue: string }
  ) => {
    setMockDataValue(newValue);
    if (statementType === 'action') {
      updatedAction.eventValue = newValue;
      dispatchToTestCase(updateAction(updatedAction));
    } else if (statementType === 'assertion') {
      updatedAssertion.queryValue = newValue;
      dispatchToTestCase(updateAssertion(updatedAssertion));
    } else if (propType === 'prop') {
      dispatchToTestCase(updateProp(renderId, propId, propKey, newValue));
    }
  };

  mockData.forEach(
    (mockDatum: { name: string; fieldKeys: { fieldKey: string }[] }) => {
      let name =
        mockDatum.name.charAt(0).toUpperCase() + mockDatum.name.slice(1);
      mockDatum.fieldKeys.forEach((key) => {
        mockOptionsList.push({ value: `mock${name}.${key.fieldKey}` });
      });
      mockOptionsList.push({ value: `[mock${name}]` });
      mockOptionsList.push({ value: `{mock${name}}` });
    }
  );

  const getSuggestions = (value: string) => {
    // const inputValue = mockDataValue.trim().toLowerCase();
    // const inputLength = 1;
    return mockOptionsList.filter((mockOption) => mockOption.value);
  };

  const shouldRenderSuggestions = () => {
    return true;
  };

  const getSuggestionValue = (suggestion: { value: string }) =>
    suggestion.value;
  const renderSuggestion = (suggestion: { value: string }) => (
    <div>{suggestion.value}</div>
  );

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setMockDataSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setMockDataSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Enter or select a value.',
    value: propValue,
    onChange: handleChangeValue,
  };

  return (
    <AutoSuggest
      theme={styles}
      suggestions={mockDataSuggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      shouldRenderSuggestions={shouldRenderSuggestions}
      inputProps={inputProps}
    />
  );
};

export default UpdatedAutoCompleteMockData;
