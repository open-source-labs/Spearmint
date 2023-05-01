import React, { useContext, useReducer } from 'react';
import cn from 'classnames';
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import {
  updateDescribeText,
  updateRenderComponent,
  updateItStatementText,
  updateDescribeOrder,
  updateItStatementOrder,
  addDescribeBlock
} from '../../context/actions/frontendFrameworkTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { createMockData } from '../../context/actions/mockDataActions';
import ReactTestMenu from '../TestMenu/ReactTestMenu';
import MockData from '../ReactTestComponent/MockData/MockData';
import DescribeRenderer from '../ReactTestComponent/DescribeRenderer/DescribeRenderer';
import {
  ReactTestCaseContext,
  reactTestCaseState,
  reactTestCaseReducer,
} from '../../context/reducers/reactTestCaseReducer';
import { Button } from '@mui/material';
import { ReactStatements } from '../../utils/reactTypes';

const ReactTestCase = ({ filterFileType } : { filterFileType: Function}) => {
  const [reactTestCase, dispatchToReactTestCase] = useReducer(
    reactTestCaseReducer,
    reactTestCaseState
  );

  const { describeBlocks, itStatements, statements } = reactTestCase;
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap, theme }] = useContext(GlobalContext);

  const handleAddMockData = () => {
    dispatchToMockData(createMockData());
  };

  const handleChangeDescribeText = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLButtonElement;
    const text = target.value;
    const describeId = target.id;
    dispatchToReactTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLButtonElement;
    const text = target.value;
    const itId = target.id;
    dispatchToReactTestCase(updateItStatementText(text, itId));
  };

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: typeof DropResult) => {
    // edge cases: dropped to a non-destination, or dropped where it was grabbed (no change)
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const list = result.draggableId.includes('describe')
      ? describeBlocks.allIds
      : itStatements.allIds[result.type];
    const func = result.draggableId.includes('describe')
      ? updateDescribeOrder
      : updateItStatementOrder;

    const reorderedStatements = reorder(list, result.source.index, result.destination.index);
    dispatchToReactTestCase(func(reorderedStatements, result.type));
  };

  const handleAddDescribeBlock = (e: React.SyntheticEvent) => {
    dispatchToReactTestCase(addDescribeBlock());
  };

  return (
    <ReactTestCaseContext.Provider value={[reactTestCase, dispatchToReactTestCase]}>
      <div id={styles[`ReactTestCase${theme}`]}>
      <h2 id={styles[`testName${theme}`]}>React Testing</h2>
        <ReactTestMenu />
        <div className={styles.header}>
          <div className={styles.searchInput}>
            <SearchInput
              dispatch={dispatchToReactTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={filterFileType(Object.keys(filePathMap), ['js', 'jsx', 'ts', 'tsx'])}
              label='Search Component'
            />
          </div>
          <Button variant="outlined" onClick={handleAddMockData} size='medium'>
            Add Mock Data
          </Button>
        </div>
        
        {mockData
          ? mockData.length > 0 && (
              <section id={styles.mockDataHeader}>
                {mockData.map((data) => {
                  return (
                    <MockData
                      key={data.id}
                      mockDatumId={data.id}
                      dispatchToMockData={dispatchToMockData}
                      fieldKeys={data.fieldKeys}
                    />
                  );
                })}
              </section>
            )
          : null}
        <div id={styles.describeContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppableReactDescribe' type='describe'>
              {(provided: typeof DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <DescribeRenderer
                    dispatcher={dispatchToReactTestCase}
                    describeBlocks={describeBlocks}
                    itStatements={itStatements}
                    statements={statements}
                    handleChangeDescribeText={handleChangeDescribeText}
                    handleChangeItStatementText={handleChangeItStatementText}
                    type='react'
                    theme={theme}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          
        </div>
        <div id={styles.addDescribeButton}>
          <Button data-testid='addDescribeButton' onClick={handleAddDescribeBlock} variant="outlined">
            Add Describe Block
          </Button>
        </div>
      </div>
    </ReactTestCaseContext.Provider>
  );
};

export default ReactTestCase;
