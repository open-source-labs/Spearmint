/**
 * functionlity to edit a tests info (add, update, delete, )
 * 
 */

import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
// requiring "TestCaseContext" from testCaseReducer to access updated state
import { TestCaseContext } from '../../../context/testCaseReducer';
import { updateTestStatement, updateStatementsOrder } from '../../../context/testCaseActions';
import { MockDataContext } from '../../../context/mockDataReducer';
import { toggleMockData, addMockData } from '../../../context/mockDataActions';
import TestMenu from '../TestMenu/TestMenu';
import MockData from '../MockData/MockData';
import TestStatements from './TestStatements';
import FirstRender from '../Render/FirstRender';
import LastAssertion from '../Assertion/LastAssertion';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const plusIcon = require('../../../assets/images/plus-box.png');

const TestCase = () => {
  // useContext is invoked with TestCaseContext (from testCaseReducer) passed in as argument
  const [{ testStatement, statements }, dispatchToTestCase] = useContext(TestCaseContext);
  // useContext is invoked with MockDataContext (from modkDataReducer) passed in as argument
  const [{ mockData, hasMockData }, dispatchToMockData] = useContext(MockDataContext);

  /**
   * declaring variables for when we reorder them in the reducer??
   */
  const firstRenderStatement = statements[0];
  const draggableStatements = statements.slice(1, -1);
  const lastAssertionStatement = statements[statements.length - 1];


  // invoking dispatchToTestCase to dispatch an action to reducer
  const handleUpdateTestStatement = e => {
    dispatchToTestCase(updateTestStatement(e.target.value));
  };

  const handleToggleMockData = e => {
    dispatchToMockData(toggleMockData(e.currentTarget.checked));
  };

  const handleAddMockData = () => {
    dispatchToMockData(addMockData());
  };


   /**
    * this is to reorder the statements array 
    *   - list is the draggable statements (each card on the page)
    *   - startIndex - statements[0]?
    *   - endIndex - statements[length-1]?
    */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


   /* the drag and drop function (called below) */
  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    /* this is reordering the statements array by calling the reorder function with these args passed in*/
    const reorderedStatements = reorder(
      draggableStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToTestCase(updateStatementsOrder(reorderedStatements));
  };


   /* mapping through datum  */
  const mockDataJSX = mockData.map(mockDatum => {
    return (
      <MockData
        key={mockDatum.id}
        mockDatumId={mockDatum.id}
        dispatchToMockData={dispatchToMockData}
        fieldKeys={mockDatum.fieldKeys}
      />
    );
  });


   /* this is what the tast case component renders */
  return (
    <div>
      <div id='head'>  {/* nav bar at top of page (from testMenu.jsx file) */}
        <TestMenu dispatchToTestCase={dispatchToTestCase} dispatchToMockData={dispatchToMockData} />
      </div>
      <div id={styles.testMockSection}>   {/* input box for test name and check box for mockdata */}
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label> 
          <input
            type='text'
            id={styles.testStatement}
            value={testStatement}
            onChange={handleUpdateTestStatement}
          />
        </section>
        <section id={styles.mockHeader}>
          <span>
            <input
              type='checkbox'
              disabled={mockDataJSX.length}
              checked={hasMockData}
              onChange={handleToggleMockData}
            />
            <label htmlFor='mock-data-checkbox' id={styles.checkboxLabel}>
              Do you need mock data?
            </label>
          </span>
        </section>
      </div>
      {hasMockData && ( /* if they have mockdata, render this section */
        <section id={styles.mockDataHeader}>
          <label htmlFor='mock-data'>Mock data</label>
          <img src={plusIcon} alt='add' onClick={handleAddMockData} />
          {mockDataJSX}
        </section>
      )}
      <FirstRender /* the auto render card on the page. the render is always the first statement */
        key={firstRenderStatement.id}
        render={firstRenderStatement}
        dispatchToTestCase={dispatchToTestCase}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => ( /* whats the provided and provided placedholder ?? */
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TestStatements
                statements={draggableStatements}
                dispatchToTestCase={dispatchToTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <LastAssertion   /* assertion is always the last statement */
        key={lastAssertionStatement.id}
        assertion={lastAssertionStatement}
        dispatchToTestCase={dispatchToTestCase}
        isLast={true}
      />
    </div>
  );
};
export default TestCase;
