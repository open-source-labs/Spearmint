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

const plusIcon = require('../../../assets/images/plus.svg');

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
          {/* <img src={plusIcon} onClick={handleAddMockData} /> */}
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            onClick={handleAddMockData}
          >
            <path
              fill='#000000'
              d='M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z'
            />
          </svg>
          {mockDataJSX}
        </section>
      )}
      <div>{statementsJSX}</div>
    </div>
  );
};

export default TestCase;
