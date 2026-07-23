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
import SvelteTestMenu from '../TestMenu/SvelteTestMenu';
import MockData from '../SvelteTestComponent/MockData/MockData';
import DecribeRenderer from '../SvelteTestComponent/DescribeRenderer/DescribeRenderer';
import {
  SvelteTestCaseContext,
  SvelteTestCaseState,
  SvelteTestCaseReducer,
} from '../../context/reducers/svelteTestCaseReducer';
import { Button } from '@mui/material';

const SvelteTestCase = (props) => {
  const [SvelteTestCase, dispatchToSvelteTestCase] = useReducer(
    SvelteTestCaseReducer,
    SvelteTestCaseState
  );

  const { describeBlocks, itStatements, statements } = SvelteTestCase;
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap, theme }] = useContext(GlobalContext);

  const handleAddMockData = () => {
    dispatchToMockData(createMockData());
  };

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToSvelteTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToSvelteTestCase(updateItStatementText(text, itId));
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
    dispatchToSvelteTestCase(func(reorderedStatements, result.type));
  };

  const handleAddDescribeBlock = (e) => {
    dispatchToSvelteTestCase(addDescribeBlock());
  };

  return (
    <SvelteTestCaseContext.Provider
      value={[SvelteTestCase, dispatchToSvelteTestCase]}
    >
      <div id={styles[`ReactTestCase${theme}`]}>
        <h2 id={styles[`testName${theme}`]}>Svelte Testing</h2>
        <SvelteTestMenu />
        <div className={styles.header}>
          <div className={styles.searchInput}>
            <SearchInput
              SvelteTestCase
              dispatch={dispatchToSvelteTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={props.filterFileType(Object.keys(filePathMap), [
                'svelte',
              ])}
              label="Search Component"
            />
          </div>
          <Button variant="outlined" onClick={handleAddMockData} size="medium">
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
          <div droppableId="droppableSvelteDescribe" type="describe">
            <DecribeRenderer
              dispatcher={dispatchToSvelteTestCase}
              describeBlocks={describeBlocks}
              itStatements={itStatements}
              statements={statements}
              handleChangeDescribeText={handleChangeDescribeText}
              handleChangeItStatementText={handleChangeItStatementText}
              type="svelte"
              theme={theme}
            />
          </div>
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
    </SvelteTestCaseContext.Provider>
  );
};

export default SvelteTestCase;
