import React, { useContext, useReducer } from 'react';
import styles from './TestCase.module.scss';
import {
  updateDescribeText,
  updateRenderComponent,
  updateItStatementText,
  addDescribeBlock,
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
import TestFrameworkToggle from './TestFrameworkToggle'; // added toggle

//** here we dispatching an action that updates the context-wide state*/
const ReactTestCase = ({ filterFileType }: { filterFileType: Function }) => {
  const [reactTestCase, dispatchToReactTestCase] = useReducer(
    // we dont have to pass arguments to useReducer
    reactTestCaseReducer, //** handles UPDATE_ACTION */
    reactTestCaseState
  );

  const { describeBlocks, itStatements, statements } = reactTestCase; // ! look

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

  const handleAddDescribeBlock = (e: React.SyntheticEvent) => {
    dispatchToReactTestCase(addDescribeBlock());
  };

  //** */
  return (
    <ReactTestCaseContext.Provider
      value={[reactTestCase, dispatchToReactTestCase]}
    >
      <div id={styles[`ReactTestCase${theme}`]}>
        <h2 id={styles[`testName${theme}`]}>React Testing</h2>
        <TestFrameworkToggle />
        <ReactTestMenu />
        <div className={styles.header}>
          <div className={styles.searchInput}>
            <SearchInput
              dispatch={dispatchToReactTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={filterFileType(Object.keys(filePathMap), [
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
          <div /*droppableId='droppableReactDescribe'*/ type="describe">
            <DescribeRenderer
              dispatcher={dispatchToReactTestCase}
              describeBlocks={describeBlocks}
              itStatements={itStatements}
              statements={statements}
              handleChangeDescribeText={handleChangeDescribeText}
              handleChangeItStatementText={handleChangeItStatementText}
              type="react"
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
    </ReactTestCaseContext.Provider>
  );
};

export default ReactTestCase;
