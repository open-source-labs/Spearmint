import React, { useContext, useReducer } from 'react';
import cn from 'classnames';
import styles from './TestCase.module.scss';
import {
  updateDescribeText,
  updateItStatementText,
} from '../../context/actions/accTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';

// ### this ties in with Sharon's code - did not create a file ### VERIFY PATH
import AccessibilityTestMenu from '../TestMenu/AccTestMenu';


import DecribeRenderer from '../AccessibilityTestComponent/DescribeRenderer/DescribeRenderer';

import {
  accTestCaseContext,
  accTestCaseState,
  accTestCaseReducer,
} from '../../context/reducers/accTestCaseReducer';

const AccTestCase = () => {
  // changes to pull down context
  const [accTestCase, dispatchToAccTestCase] = useReducer(
    accTestCaseReducer,
    accTestCaseState
  );
  
  const { describeBlocks, itStatements, statements } = accessibilityTestCase;
  
  const [{ filePathMap }] = useContext(GlobalContext);
  const draggableStatements = describeBlocks.allIds;

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToAccessibilityTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToAccessibilityTestCase(updateItStatementText(text, itId));
  };

  return (
    <accessibilityTestCaseContext.Provider value={[accessibilityTestCase, dispatchToAccessibilityTestCase]}>

      <div id={styles.AccessibilityTestCase}>

        <div id='head'>
          <AccessibilityTestMenu />
        </div>

        {/* ###--- Header section may be useful for stretch feature(s) ---###
        <div className={styles.header}>

       ### Save for stretch feature use? 
          <div className={styles.renderComponent}>
            <span className={styles.renderLabel}>Element to Test:</span>
            <SearchInput
              reactTestCase
              dispatch={dispatchToAccessibilityTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={Object.keys(filePathMap)}
            />
          </div>

           ### button might be useful for stretch
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
        )} * */}

        <DecribeRenderer
          dispatcher={dispatchToAccessibilityTestCase}
          draggableStatements={draggableStatements}
          describeBlocks={describeBlocks}
          itStatements={itStatements}
          statements={statements}
          handleChangeDescribeText={handleChangeDescribeText}
          handleChangeItStatementText={handleChangeItStatementText}
          type='accessibility'
        />
      </div>

    </accessibilityTestCaseContext.Provider>
  );
};
export default AccessibilityTestCase;
