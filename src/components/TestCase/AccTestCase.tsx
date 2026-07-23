import React, { useContext } from 'react';

import {
  updateDescribeText,
  updateItStatementText,
  updateDescribeStandardTag,
  updateItCatTag,
  updateFilePath,
  updateTestType,
  addDescribeBlock,
} from '../../context/actions/accTestCaseActions';
import { AccTestCaseContext } from '../../context/reducers/accTestCaseReducer';
import { GlobalContext } from '../../context/reducers/globalReducer';

import styles from './TestCase.module.scss';
import AccTestMenu from '../TestMenu/AccTestMenu';
import AccTestTypes from '../AccTestComponent/AccTestTypes/AccTestTypes';
import SearchInput from '../SearchInput/SearchInput';
import DescribeRenderer from '../AccTestComponent/DescribeRenderer/DescribeRenderer';
import { Button } from '@mui/material';

const AccTestCase = () => {
  const [accTestCase, dispatchToAccTestCase] = useContext(AccTestCaseContext);
  const [{ theme }] = useContext(GlobalContext);
  const { describeBlocks, itStatements } = accTestCase;
  const [{ filePathMap }] = useContext(GlobalContext);

  const reorder = (
    list: Array<string> | string,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // handle change to add a Describe Block
  const handleAddDescribeBlock = () => {
    dispatchToAccTestCase(addDescribeBlock());
  };

  return (
    <div>
      <div id="head">
        <h2 id={styles[`testName${theme}`]}>Accessibility Testing</h2>
        <AccTestMenu />
      </div>

      <section id={styles[`testCaseHeader${theme}`]}>
        <div id={styles.accTestDiv}>
          <AccTestTypes
            // handleAccChange={handleAccChange}
            action={updateTestType}
            dispatch={dispatchToAccTestCase}
          />

          <div style={{ alignSelf: 'right' }}>
            <div
              id={styles.labelInput}
              style={{ width: '50%', alignSelf: 'right', margin: '0' }}
            >
              <SearchInput // Selects the files
                options={Object.keys(filePathMap)}
                dispatch={dispatchToAccTestCase}
                action={updateFilePath}
                filePathMap={filePathMap}
                label="Import File From"
              />
            </div>
          </div>
        </div>
        <div id={styles.describeContainer}>
          <DescribeRenderer
            key="describeRendererAcc"
            dispatcher={dispatchToAccTestCase}
            describeBlocks={describeBlocks}
            itStatements={itStatements}
            updateDescribeText={updateDescribeText}
            updateItStatementText={updateItStatementText}
            updateDescribeStandardTag={updateDescribeStandardTag}
            updateItCatTag={updateItCatTag}
            type="acc"
            theme={theme}
          />
        </div>
        <Button
          style={{ width: '50vw' }}
          data-testid="addDescribeButton"
          onClick={handleAddDescribeBlock}
          variant="outlined"
        >
          Add Describe Block
        </Button>
      </section>
    </div>
  );
};
export default AccTestCase;
