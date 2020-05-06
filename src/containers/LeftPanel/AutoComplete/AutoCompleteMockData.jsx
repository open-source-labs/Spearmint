import React, { useContext, useState } from 'react';
import styles from '../AutoComplete/AutoCompleteMockData.module.scss';
import AutoSuggest from 'react-autosuggest';
import { updateAction, updateAssertion, updateRenderProp } from '../../../context/reactTestCaseActions';
import { MockDataContext } from '../../../context/mockDataReducer';

const AutoCompleteMockData = ({
  statement,
  statementType,
  dispatchToTestCase,
  propType,
  renderId,
  propId,
  propKey,
}) => {
  let updatedAction = { ...statement };
  let updatedAssertion = { ...statement };

  const [{ mockData }, _] = useContext(MockDataContext);
  const [mockDataValue, setMockDataValue] = useState('');
  const [mockDataSuggestions, setMockDataSuggestions] = useState([]);
  const mockOptionsList = [];

  const handleChangeValue = (event, { newValue }) => {
    setMockDataValue(newValue);
    if (statementType === 'action') {
      updatedAction.eventValue = newValue;
      dispatchToTestCase(updateAction(updatedAction));
    } else if (statementType === 'assertion') {
      updatedAssertion.queryValue = newValue;
      dispatchToTestCase(updateAssertion(updatedAssertion));
    } else if (propType === 'prop') {
      dispatchToTestCase(updateRenderProp(renderId, propId, propKey, newValue));
    }
  };

  mockData.forEach(mockDatum => {
    mockDatum.fieldKeys.forEach(key => {
      mockOptionsList.push({ value: `mock${mockDatum.name}.${key.fieldKey}` });
    });
    mockOptionsList.push({ value: `[mock${mockDatum.name}]` });
    mockOptionsList.push({ value: `{mock${mockDatum.name}}` });
  });

  const getSuggestions = mockDataValue => {
    const inputValue = mockDataValue.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : mockOptionsList.filter(mockOption => mockOption.value);
  };

  const shouldRenderSuggestions = () => {
    return true;
  };

  const getSuggestionValue = suggestion => suggestion.value;
  const renderSuggestion = suggestion => <div>{suggestion.value}</div>;

  const onSuggestionsFetchRequested = ({ value }) => {
    setMockDataSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setMockDataSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Enter or select a value.',
    value: mockDataValue,
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

export default AutoCompleteMockData;