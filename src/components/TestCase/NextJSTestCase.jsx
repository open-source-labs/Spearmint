import React, { useContext, useReducer } from 'react';
import cn from 'classnames';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
import NextJSTestMenu from '../TestMenu/NextJSTestMenu';
import MockData from '../NextJSTestComponent/MockData/MockData';
import DecribeRenderer from '../NextJSTestComponent/DescribeRenderer/DescribeRenderer';
import {
  nextjsTestCaseContext,
  nextjsTestCaseState,
  nextjsTestCaseReducer,
} from '../../context/reducers/nextjsTestCaseReducer';
import { Button } from '@material-ui/core';

const NextJSTestCase = (props) => {
  const [nextjsTestCase, dispatchToNextJSTestCase] = useReducer(
    nextjsTestCaseReducer,
    nextjsTestCaseState
  );

  const { describeBlocks, itStatements, statements } = nextjsTestCase;
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap, theme }] = useContext(GlobalContext);

  const handleAddMockData = () => {
    dispatchToMockData(createMockData());
  };

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToNextJSTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToNextJSTestCase(updateItStatementText(text, itId));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
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
    dispatchToNextJSTestCase(func(reorderedStatements, result.type));
  };

  const handleAddDescribeBlock = (e) => {
    dispatchToNextJSTestCase(addDescribeBlock());
  };

  return (
    <NextJSTestCaseContext.Provider value={[nextjsTestCase, dispatchToNextJSTestCase]}>
      <div id={styles[`NextJSTestCase${theme}`]}>
      <h2 id={styles[`testName${theme}`]}>Next JS Testing</h2>
        <NextJSTestMenu />
        <div className={styles.header}>
          <div className={styles.searchInput}>
            <SearchInput
              nextjsTestCase
              dispatch={dispatchToNextJSTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={props.filterFileType(Object.keys(filePathMap), ['js', 'jsx', 'ts', 'tsx'])}
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
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <DecribeRenderer
                    dispatcher={dispatchToNextJSTestCase}
                    describeBlocks={describeBlocks}
                    itStatements={itStatements}
                    statements={statements}
                    handleChangeDescribeText={handleChangeDescribeText}
                    handleChangeItStatementText={handleChangeItStatementText}
                    type='nextjs'
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
    </NextJSTestCaseContext.Provider>
  );
};

export default NextJSTestCase;
