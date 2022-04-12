import React, { useContext, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestMenu from '../TestMenu/PuppeteerTestMenu';
import PuppeteerTestStatements from './PuppeteerTestStatements';
import { addPuppeteerPaintTiming, updateStatementsOrder } from '../../context/actions/puppeteerTestCaseActions';
import { PuppeteerStatements } from '../../utils/puppeteerTypes';

//additions fo previously ExportFileModal functionality
import styles from './TestCase.module.scss';
import { Button } from '@material-ui/core';
import { GlobalContext } from '../../context/reducers/globalReducer';

const PuppeteerTestCase = () => {
  const handleAddPuppeteerPaintTiming = () => {
    dispatchToPuppeteerTestCase(addPuppeteerPaintTiming());
  };
  
  const [{ puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(
    PuppeteerTestCaseContext
    );
    
  const [{theme}] = useContext<any>(GlobalContext);
  const testDescription = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (testDescription && testDescription.current) {
      testDescription.current.focus();
    }
  }, []);

  const reorder = (list: Array<PuppeteerStatements>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

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
      <h2>Puppeteer Testing</h2>
        <PuppeteerTestMenu />
      </div>
      <div id={styles.testMockSection}></div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <PuppeteerTestStatements />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div id={styles[`PaintTime${theme}`]}>
        <Button
            type='button'
            variant='outlined'
            size='medium'
            data-testid='puppeteerPaintTimingButton'
            onClick={handleAddPuppeteerPaintTiming}>
            Paint Timing
          </Button>
      </div>
    </div>
  );
};

export default PuppeteerTestCase;
