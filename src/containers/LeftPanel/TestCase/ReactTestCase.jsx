import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import cn from 'classnames';
import { ReactTestCaseContext } from '../../../context/reactTestCaseReducer';
import {
  updateDescribeText,
  updateRenderComponent,
  updateItStatementText,
} from '../../../context/reactTestCaseActions';
import { GlobalContext } from '../../../context/globalReducer';
import SearchInput from '../../LeftPanel/SearchInput/SearchInput';
import { MockDataContext } from '../../../context/mockDataReducer';
import { addMockData } from '../../../context/mockDataActions';
import ReactTestMenu from '../TestMenu/ReactTestMenu';
import MockData from '../MockData/MockData';
import DecribeRenderer from '../../../components/DescribeRenderer/DescribeRenderer';

const ReactTestCase = () => {
  const [{ describeBlocks, itStatements, statements }, dispatchToReactTestCase] = useContext(
    ReactTestCaseContext
  );
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap }] = useContext(GlobalContext);
  const draggableStatements = describeBlocks.allIds;

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
    <div id={styles.ReactTestCase}>
      <div id='head'>
        <ReactTestMenu
          dispatchToTestCase={dispatchToReactTestCase}
          dispatchToMockData={dispatchToMockData}
        />
      </div>
      <div className={styles.header}>
        <div className={styles.renderComponent}>
          <label className={styles.renderLabel} htmlFor='component-name'>
            Enter Component Name:
          </label>
          <SearchInput
            dispatch={dispatchToReactTestCase}
            action={updateRenderComponent}
            filePathMap={filePathMap}
            options={Object.keys(filePathMap)}
          />
        </div>
        <button className={styles.mockBtn} onClick={handleAddMockData}>
          <i className={cn(styles.addIcon, 'fas fa-plus')}></i>
          Mock Data
        </button>
      </div>
      {mockData.length > 0 && (
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
      )}
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
    </div>
  );
};
export default ReactTestCase;
