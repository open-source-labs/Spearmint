import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { ReactTestCaseContext } from '../../../context/reactTestCaseReducer';
import {
  updateDescribeText,
  updateStatementsOrder,
  updateRenderComponent,
  updateItStatementText,
} from '../../../context/reactTestCaseActions';
import { MockDataContext } from '../../../context/mockDataReducer';
import { toggleMockData, addMockData } from '../../../context/mockDataActions';
import ReactTestMenu from '../TestMenu/ReactTestMenu';
import MockData from '../MockData/MockData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DecribeRenderer from '../../../components/DescribeRenderer/DescribeRenderer';

const plusIcon = require('../../../assets/images/plus-box.png');

const ReactTestCase = () => {
  const [
    { describeBlocks, itStatements, statements },
    dispatchToReactTestCase,
  ] = useContext(ReactTestCaseContext);
  const [{ mockData, hasMockData }, dispatchToMockData] = useContext(MockDataContext);
  const draggableStatements = describeBlocks.allIds;

  const handleToggleMockData = (e) => {
    dispatchToMockData(toggleMockData(e.currentTarget.checked));
  };

  const handleAddMockData = () => {
    dispatchToMockData(addMockData());
  };

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToReactTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToReactTestCase(updateItStatementText(text, itId));
  };

  const handleChangeComponentName = (e) => {
    const componentName = e.target.value;
    // const filePath = filePathMap[componentName] || '';
    const filePath = '';
    dispatchToReactTestCase(updateRenderComponent(componentName, filePath));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedStatements = reorder(
      draggableStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToReactTestCase(updateStatementsOrder(reorderedStatements));
  };

  const mockDataJSX = mockData.map((mockDatum) => {
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
      <div id='head'>
        <ReactTestMenu
          dispatchToTestCase={dispatchToReactTestCase}
          dispatchToMockData={dispatchToMockData}
        />
      </div>
      <div id={styles.testMockSection}>
        <section id={styles.mockHeader}>
          <button onClick={handleToggleMockData}>{hasMockData ? 'Hide Mock Data' : 'Show Mock Data'}</button>
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
      {hasMockData && (
        <section id={styles.mockDataHeader}>
          <label htmlFor='mock-data'>Mock data</label>
          <img src={plusIcon} alt='add' onClick={handleAddMockData} />
          {mockDataJSX}
        </section>
      )}
      <label htmlFor="component-name">Please Enter Component Name</label>
      <input
        onChange={handleChangeComponentName}
        type='text'
        name='component-name'
        value={statements.componentName}
        placeholder='App'
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <DecribeRenderer
                dispatcher={dispatchToReactTestCase}
                draggableStatements={draggableStatements}
                describeBlocks={describeBlocks}
                itStatements={itStatements}
                statements={statements}
                handleChangeDescribeText={handleChangeDescribeText}
                handleChangeItStatementText={handleChangeItStatementText}
                type='react'
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default ReactTestCase;
