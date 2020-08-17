import React, { useContext, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestMenu from '../TestMenu/PuppeteerTestMenu';
import PuppeteerTestStatements from './PuppeteerTestStatements';
import {
  updateStatementsOrder,
  // updatePuppeteerTestStatement,
} from '../../context/actions/puppeteerTestCaseActions';
import { PuppeteerStatements } from '../../utils/puppeteerTypes';
import PuppeteerHelpModal from '../TestHelpModals/PuppeteerHelpModal';

//additions fo previously ExportFileModal functionality
import { GlobalContext } from '../../context/reducers/globalReducer';
import { updateFile, setFilePath } from '../../context/actions/globalActions';
import styles from './TestCase.module.scss';
import useGenerateTest from '../../context/useGenerateTest.jsx';

const PuppeteerTestCase = () => {
  const [{ puppeteerStatements, modalOpen }, dispatchToPuppeteerTestCase] = useContext(
    PuppeteerTestCaseContext
  );
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext<any>(GlobalContext);

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

  // const handleUpdatePuppetteerTestStatements = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatchToPuppeteerTestCase(updatePuppeteerTestStatement(e.target.value));
  //   fileHandle();
  // };

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

  const generateTest = useGenerateTest('puppeteer', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ puppeteerStatements })));
    dispatchToGlobal(setFilePath(''));
  };
  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest({ puppeteerStatements })));
  );

  return (
    <div>
      <div id='head'>
        <PuppeteerTestMenu dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase} />
      </div>
      <div id={styles.testMockSection}>
        <button onClick={fileHandle}>Preview</button>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
          <input
            ref={testDescription}
            type='text'
            id={styles.testStatement}
            value={puppeteerStatements}
            // onChange={handleUpdatePuppetteerTestStatements}
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
