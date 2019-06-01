import React, { useContext } from 'react';
import TestMenu from './TestMenu';
import MockData from './MockData';
import Action from './Action';
import Assertion from './Assertion';
import Render from './Render';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { MockDataContext } from '../../../context/mockDataReducer';
import { updateTestStatement } from '../../../context/testCaseActions';
import { toggleMockData, addMockData } from '../../../context/mockDataActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TestCase = () => {
  const [testCase, dispatchTestCase] = useContext(TestCaseContext);
  const [mockData, dispatchMockData] = useContext(MockDataContext);

  const handleUpdateTestStatement = e => {
    dispatchTestCase(updateTestStatement(e.target.value));
  };

  const handleToggleMockData = () => {
    dispatchMockData(toggleMockData());
  };

  const handleAddMockData = () => {
    dispatchMockData(addMockData());
  };

  const mockDataJSX = mockData.mockData.map(mockDatum => {
    return (
      <MockData
        key={mockDatum.id}
        mockDatumId={mockDatum.id}
        dispatchMockData={dispatchMockData}
        fieldKeys={mockDatum.fieldKeys}
      />
    );
  });

  const statementsJSX = testCase.statements.map(statement => {
    console.log(statement);
    switch (statement.type) {
      case 'action':
        return <Action key={statement.id} id={statement.id} dispatchTestCase={dispatchTestCase} />;
      case 'assertion':
        return (
          <Assertion key={statement.id} id={statement.id} dispatchTestCase={dispatchTestCase} />
        );
      case 'render':
        return (
          <Render
            key={statement.id}
            id={statement.id}
            dispatchTestCase={dispatchTestCase}
            props={statement.props}
            reRender={statement.reRender}
          />
        );
      default:
        return <></>;
    }
  });

  const testStyle = {
    padding: '5px',
  };

  return (
    <div>
      <TestMenu dispatchTestCase={dispatchTestCase} />
      <section style={testStyle}>
        <label htmlFor='test-statement'>test:</label>
        <input
          type='text'
          id='test-statement'
          value={testCase.testStatement}
          onChange={handleUpdateTestStatement}
        />
      </section>
      <section style={testStyle}>
        <label htmlFor='mock-data-checkbox'>Will you need mock data:</label>
        <input
          type='checkbox'
          id='mock-data-checkbox'
          disabled={mockDataJSX.length}
          onClick={handleToggleMockData}
        />
      </section>
      {mockData.mockDataCheckBox && (
        <section style={testStyle}>
          <label htmlFor='mock-data'>Mock data</label>
          <FontAwesomeIcon id='mock-data' icon='plus' onClick={handleAddMockData} />
          {mockDataJSX}
        </section>
      )}
      <div>{statementsJSX}</div>
    </div>
  );
};

export default TestCase;
