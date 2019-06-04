import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { updateTestStatement, updateStatementsOrder } from '../../../context/testCaseActions';
import { MockDataContext } from '../../../context/mockDataReducer';
import { toggleMockData, addMockData } from '../../../context/mockDataActions';
import TestMenu from '../TestMenu/TestMenu';
import MockData from '../MockData/MockData';
import TestStatements from './TestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements = reorder(
      testCase.statements,
      result.source.index,
      result.destination.index
    );
    dispatchToTestCase(updateStatementsOrder(reorderedStatements));
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

  return (
    <div>
      <TestMenu dispatchToTestCase={dispatchToTestCase} hasRerender={testCase.hasRerender} />
      <section id={styles.testCaseHeader}>
        <label htmlFor='test-statement'>Test:</label>
        <input
          type='text'
          id={styles.testStatement}
          value={testCase.testStatement}
          onChange={handleUpdateTestStatement}
        />
      </section>
      <div id={styles.mockHeader}>
        <span>
          <label htmlFor='mock-data-checkbox' id='mock-data-checkbox'>
            Will you need mock data?
          </label>
          <input
            type='checkbox'
            id='mock-data-checkbox'
            disabled={mockDataJSX.length}
            onClick={handleToggleMockData}
          />
        </span>
      </div>
      {mockData.mockDataCheckBox && (
        <section id={styles.mockDataHeader}>
          <label htmlFor='mock-data'>Mock data</label>
          <img src={plusIcon} alt='add' onClick={handleAddMockData} />
          {mockDataJSX}
        </section>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TestStatements
                statements={testCase.statements}
                dispatchToTestCase={dispatchToTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default TestCase;
