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
import SolidTestMenu from '../TestMenu/SolidTestMenu';
import MockData from '../SolidTestComponent/MockData/MockData';
import DecribeRenderer from '../SolidTestComponent/DescribeRenderer/DescribeRenderer';
import {
  SolidTestCaseContext,
  SolidTestCaseState,
  SolidTestCaseReducer,
} from '../../context/reducers/solidTestCaseReducer';
import { Button } from '@mui/material';

const SolidTestCase = (props) => {
  const [SolidTestCase, dispatchToSolidTestCase] = useReducer(
    SolidTestCaseReducer,
    SolidTestCaseState
  );

  const { describeBlocks, itStatements, statements } = SolidTestCase;
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap, theme }] = useContext(GlobalContext);

  const handleAddMockData = () => {
    dispatchToMockData(createMockData());
  };

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToSolidTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToSolidTestCase(updateItStatementText(text, itId));
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
    dispatchToSolidTestCase(func(reorderedStatements, result.type));
  };

  const handleAddDescribeBlock = (e) => {
    dispatchToSolidTestCase(addDescribeBlock());
  };

  return (
    <SolidTestCaseContext.Provider
      value={[SolidTestCase, dispatchToSolidTestCase]}
    >
      <div id={styles[`ReactTestCase${theme}`]}>
        <h2 id={styles[`testName${theme}`]}>Solid Testing</h2>
        <SolidTestMenu />
        <div className={styles.header}>
          <div className={styles.searchInput}>
            <SearchInput
              SolidTestCase
              dispatch={dispatchToSolidTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={props.filterFileType(Object.keys(filePathMap), [
                'js',
                'jsx',
                'ts',
                'tsx',
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
          <div droppableId="droppableSolidDescribe" type="describe">
            <DecribeRenderer
              dispatcher={dispatchToSolidTestCase}
              describeBlocks={describeBlocks}
              itStatements={itStatements}
              statements={statements}
              handleChangeDescribeText={handleChangeDescribeText}
              handleChangeItStatementText={handleChangeItStatementText}
              type="solid"
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
    </SolidTestCaseContext.Provider>
  );
};

export default SolidTestCase;
