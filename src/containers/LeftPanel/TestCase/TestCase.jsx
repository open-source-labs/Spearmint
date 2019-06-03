import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { updateTestStatement } from '../../../context/testCaseActions';
import { MockDataContext } from '../../../context/mockDataReducer';
import { toggleMockData, addMockData } from '../../../context/mockDataActions';
import TestMenu from '../TestMenu/TestMenu';
import MockData from '../MockData/MockData';
import Action from '../Action/Action';
import Assertion from '../Assertion/Assertion';
import Render from '../Render/Render';

const plusIcon = require('../../../assets/images/plus-box.png');

const TestCase = () => {
  const [testCase, dispatchToTestCase] = useContext(TestCaseContext);
  const [mockData, dispatchToMockData] = useContext(MockDataContext);

  const handleUpdateTestStatement = e => {
    dispatchToTestCase(updateTestStatement(e.target.value));
  };

  const handleToggleMockData = () => {
    dispatchToMockData(toggleMockData());
  };

  const handleAddMockData = () => {
    dispatchToMockData(addMockData());
  };

  const mockDataJSX = mockData.mockData.map(mockDatum => {
    return (
      <MockData
        key={mockDatum.id}
        mockDatumId={mockDatum.id}
        dispatchToMockData={dispatchToMockData}
        fieldKeys={mockDatum.fieldKeys}
      />
    );
  });

  const statementsJSX = testCase.statements.map(statement => {
    switch (statement.type) {
      case 'action':
        return (
          <Action key={statement.id} id={statement.id} dispatchToTestCase={dispatchToTestCase} />
        );
      case 'assertion':
        return (
          <Assertion key={statement.id} id={statement.id} dispatchToTestCase={dispatchToTestCase} />
        );
      case 'render':
        return (
          <Render
            key={statement.id}
            id={statement.id}
            dispatchToTestCase={dispatchToTestCase}
            props={statement.props}
            isRerender={statement.isRerender}
          />
        );
      default:
        return <></>;
    }
  });

  return (
    <div>
      <TestMenu dispatchToTestCase={dispatchToTestCase} hasRerender={testCase.hasRerender} />
      <section id={styles.testCaseHeader}>
        <label htmlFor='test-statement'>Test:</label>
        <input
          type='text'
          id='test-statement'
          value={testCase.testStatement}
          onChange={handleUpdateTestStatement}
        />
      </section>
      <section id={styles.testCaseHeader}>
        <label htmlFor='mock-data-checkbox' id='mock-data-checkbox'>
          Will you need mock data?
        </label>
        <input
          type='checkbox'
          id='mock-data-checkbox'
          disabled={mockDataJSX.length}
          onClick={handleToggleMockData}
        />
      </section>
      {mockData.mockDataCheckBox && (
        <section id={styles.mockDataHeader}>
          <label htmlFor='mock-data'>Mock data</label>
          <img src={plusIcon} alt='add' onClick={handleAddMockData} />
          {mockDataJSX}
        </section>
      )}
      <div>{statementsJSX}</div>
    </div>
  );
};

export default TestCase;
