import React, { useContext, useReducer } from 'react';
import styles from './TestCase.module.scss';
import {
  updateDescribeText,
  updateRenderComponent,
  updateItStatementText,
  updateDescribeOrder,
  updateItStatementOrder,
  addDescribeBlock,
} from '../../context/actions/frontendFrameworkTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { createMockData } from '../../context/actions/mockDataActions';
import VueTestMenu from '../TestMenu/VueTestMenu';
import DecribeRenderer from '../VueTestComponent/DescribeRenderer/DescribeRenderer';
import {
  VueTestCaseContext,
  vueTestCaseState,
  vueTestCaseReducer,
} from '../../context/reducers/vueTestCaseReducer';
import { Button } from '@mui/material';

const VueTestCase = (props) => {
  const [vueTestCase, dispatchToVueTestCase] = useReducer(
    vueTestCaseReducer,
    vueTestCaseState
  );

  const { describeBlocks, itStatements, statements } = vueTestCase;
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap, theme }] = useContext(GlobalContext);

  const handleAddMockData = () => {
    dispatchToMockData(createMockData());
  };

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToVueTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToVueTestCase(updateItStatementText(text, itId));
  };

  const handleAddDescribeBlock = (e) => {
    dispatchToVueTestCase(addDescribeBlock());
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

    const reorderedStatements = reorder(
      list,
      result.source.index,
      result.destination.index
    );
    dispatchToVueTestCase(func(reorderedStatements, result.type));
  };

  return (
    <VueTestCaseContext.Provider value={[vueTestCase, dispatchToVueTestCase]}>
      <div id={styles[`ReactTestCase${theme}`]}>
        <h2 id={styles[`testName${theme}`]}>Vue Testing</h2>
        <VueTestMenu />
        <div className={styles.header}>
          <div className={styles.searchInput}>
            <SearchInput
              vueTestCase
              dispatch={dispatchToVueTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={props.filterFileType(Object.keys(filePathMap), ['vue'])}
              label="Search Component"
            />
          </div>
        </div>
        {/* <Button variant="outlined" onClick={handleAddMockData} size='medium'>
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
          : null} */}

        <div droppableId="droppableReactDescribe" type="describe">
          <DecribeRenderer
            dispatcher={dispatchToVueTestCase}
            describeBlocks={describeBlocks}
            itStatements={itStatements}
            statements={statements}
            handleChangeDescribeText={handleChangeDescribeText}
            handleChangeItStatementText={handleChangeItStatementText}
            type="vue"
            theme={theme}
          />
        </div>
        <div id={styles.addDescribeButton}>
          <Button
            data-testid="addDescribeButton"
            onClick={handleAddDescribeBlock}
            variant="outlined"
          >
            Add Describe Block
          </Button>
        </div>
      </div>
    </VueTestCaseContext.Provider>
  );
};

export default VueTestCase;
