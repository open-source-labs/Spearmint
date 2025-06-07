import React, { useContext, useRef, useEffect } from 'react';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestMenu from '../TestMenu/PuppeteerTestMenu';
import PuppeteerTestStatements from './PuppeteerTestStatements';
import {
  addPuppeteerPaintTiming,
  updateStatementsOrder,
} from '../../context/actions/puppeteerTestCaseActions';
import { PuppeteerStatements } from '../../utils/puppeteerTypes';

//additions fo previously ExportFileModal functionality
import styles from './TestCase.module.scss';
import { Button } from '@mui/material';
import { GlobalContext } from '../../context/reducers/globalReducer';

const PuppeteerTestCase = () => {
  const handleAddPuppeteerPaintTiming = () => {
    dispatchToPuppeteerTestCase(addPuppeteerPaintTiming());
  };

  const [{ puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(
    PuppeteerTestCaseContext
  );

  const [{ theme }] = useContext<any>(GlobalContext);
  const testDescription = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (testDescription && testDescription.current) {
      testDescription.current.focus();
    }
  }, []);

  const reorder = (
    list: Array<PuppeteerStatements>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div>
      <div id="head">
        <h2 id={styles[`testName${theme}`]}>Puppeteer Testing</h2>
        <PuppeteerTestMenu />
      </div>
      <div id={styles.testMockSection}></div>
      <PuppeteerTestStatements />
      <div id={styles[`PaintTime${theme}`]}>
        <Button
          type="button"
          variant="outlined"
          size="medium"
          data-testid="puppeteerPaintTimingButton"
          onClick={handleAddPuppeteerPaintTiming}
        >
          Paint Timing
        </Button>
      </div>
    </div>
  );
};

export default PuppeteerTestCase;
