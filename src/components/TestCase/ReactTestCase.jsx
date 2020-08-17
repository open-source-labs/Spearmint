import React, { useContext, useReducer } from 'react';
import cn from 'classnames';
import styles from './TestCase.module.scss';
import {
  updateDescribeText,
  updateRenderComponent,
  updateItStatementText,
} from '../../context/actions/reactTestCaseActions';
import { updateFile, setFilePath } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { createMockData } from '../../context/actions/mockDataActions';
import ReactTestMenu from '../TestMenu/ReactTestMenu';
import MockData from '../ReactTestComponent/MockData/MockData';
import DecribeRenderer from '../ReactTestComponent/DescribeRenderer/DescribeRenderer';
import ReactHelpModal from '../TestHelpModals/ReactHelpModal';
import useGenerateTest from '../../context/useGenerateTest.jsx';

//changes to pull down context
import {
  ReactTestCaseContext,
  reactTestCaseState,
  reactTestCaseReducer,
} from '../../context/reducers/reactTestCaseReducer';

const ReactTestCase = () => {
  //changes to pull down context
  const [reactTestCase, dispatchToReactTestCase] = useReducer(
    reactTestCaseReducer,
    reactTestCaseState
  );
  //

  const { describeBlocks, itStatements, statements, modalOpen } = reactTestCase;
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap, projectFilePath, file, exportBool }, dispatchToGlobal] = useContext(
    GlobalContext
  );
  const draggableStatements = describeBlocks.allIds;

  const handleAddMockData = () => {
    dispatchToMockData(createMockData());
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

  // react has to have 2 states passed in
  // const generateTest = useGenerateTest('react', projectFilePath);

  // const fileHandle = () => {
  //   dispatchToGlobal(updateFile(generateTest(reactTestCase, mockData)));
  //   dispatchToGlobal(setFilePath(''));
  // };

  // if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(reactTestCase, mockData)));

  return (
    <ReactTestCaseContext.Provider value={[reactTestCase, dispatchToReactTestCase]}>
      <div id={styles.ReactTestCase}>
        <div id='head'>
          <ReactTestMenu
            dispatchToTestCase={dispatchToReactTestCase}
            dispatchToMockData={dispatchToMockData}
          />
        </div>
        {modalOpen ? <ReactHelpModal /> : null}

        <div className={styles.header}>
          <div className={styles.renderComponent}>
            <span className={styles.renderLabel}>Enter Component Name:</span>
            <SearchInput
              reactTestCase
              dispatch={dispatchToReactTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={Object.keys(filePathMap)}
            />
          </div>
          <button type='button' className={styles.mockBtn} onClick={handleAddMockData}>
            <i className={cn(styles.addIcon, 'fas fa-plus')} />
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
    </ReactTestCaseContext.Provider>
  );
};
export default ReactTestCase;
