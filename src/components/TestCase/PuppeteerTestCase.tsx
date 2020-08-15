import React, { useContext, useRef, useEffect } from 'react';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestMenu from '../TestMenu/PuppeteerTestMenu';
import PuppeteerTestStatements from './PuppeteerTestStatements';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { updateStatementsOrder } from '../../context/actions/puppeteerTestCaseActions';
import { PuppeteerStatements } from '../../utils/puppeteerTypes';
import PuppeteerHelpModal from '../TestHelpModals/PuppeteerHelpModal';

//additions fo previously ExportFileModal functionality
import { GlobalContext } from '../../context/reducers/globalReducer';
import { createFile } from '../../context/actions/globalActions';
import styles from './TestCase.module.scss';

const remote = window.require('electron').remote;
const beautify = remote.require('js-beautify');
// const path = remote.require('path');
//

const PuppeteerTestCase = () => {
  const [{ puppeteerStatements, modalOpen }, dispatchToPuppeteerTestCase] = useContext(
    PuppeteerTestCaseContext
  );

  interface Ref {
    current: any;
  }

  const testDescription: Ref = useRef(null);

  useEffect(() => {
    testDescription.current.focus();
  }, []);

  const reorder = (list: Array<PuppeteerStatements>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /*----------added functionality from Export File Modal-----------------------------------------*/
  const [{ projectFilePath }, dispatchToGlobal] = useContext<any>(GlobalContext);

  let testFileCode = 'import React from "react";';

  function generatePuppeteerFile() {
    return (
      addPuppeteerImportStatements(),
      addPuppeteerTestStatements(),
      (testFileCode = beautify(testFileCode, {
        indent_size: 2,
        space_in_empty_paren: true,
        e4x: true,
      }))
    );
  }

  const addPuppeteerImportStatements = () => {
    puppeteerStatements.forEach((statement: any) => {
      switch (statement.type) {
        case 'paintTiming':
          testFileCode = `import puppeteer from 'puppeteer';\n`;
          addLCPfunction();
          return;
        default:
          return statement;
      }
    });
    testFileCode += '\n';
  };

  const addPuppeteerTestStatements = () => {
    puppeteerStatements.forEach((statement: any) => {
      switch (statement.type) {
        case 'paintTiming':
          return addPuppeteerPaintTiming(statement);
        default:
          return statement;
      }
    });
  };

  const addLCPfunction = () => {
    testFileCode += `      
      function getLargestContentfulPaint() {
        window.largestContentfulPaint = 0;
    
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          window.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
        });
    
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
    
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
              observer.takeRecords();
              observer.disconnect();
          }
        });
      }`;
  };

  // Puppeteer Form Jest Test Code
  const addPuppeteerPaintTiming = (statement: { browserOptions: any[] }) => {
    const browserOptions = {};

    if (statement.browserOptions.length > 0) {
      statement.browserOptions.map((option) => {
        if (option.optionValue === 'true') option.optionValue = true;
        else if (option.optionValue === 'false') option.optionValue = false;
        //if optionValue is a stringified number, convert it back to number
        else if (!isNaN(Number(option.optionValue)))
          option.optionValue = Number(option.optionValue);
        browserOptions: [option.optionKey] = option.optionValue;
        return option;
      });
    }
  };

  const fileHandle = () => {
    dispatchToGlobal(createFile(generatePuppeteerFile()));
  };

  /*----------------------------------------------------------------------------------------------*/

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements: Array<PuppeteerStatements> = reorder(
      puppeteerStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToPuppeteerTestCase(updateStatementsOrder(reorderedStatements));
  };

  return (
    <div>
      <div id='head'>
        <PuppeteerTestMenu dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase} />
      </div>
      <div id={styles.testMockSection}>
        <button onClick={fileHandle}>Save my tests!!!</button>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
          <input
            ref={testDescription}
            type='text'
            id={styles.testStatement}
            value={puppeteerStatements}
          />
        </section>
      </div>
      {modalOpen ? <PuppeteerHelpModal /> : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <PuppeteerTestStatements
                puppeteerStatements={puppeteerStatements}
                dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PuppeteerTestCase;
