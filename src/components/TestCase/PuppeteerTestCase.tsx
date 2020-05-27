import React, { useContext } from 'react';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestMenu from '../TestMenu/PuppeteerTestMenu';
import PuppeteerTestStatements from './PuppeteerTestStatements';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { updateStatementsOrder } from '../../context/actions/puppeteerTestCaseActions';
import { PuppeteerStatements } from '../../utils/puppeteerTypes';

const PuppeteerTestCase = () => {
  const [{ puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(PuppeteerTestCaseContext);

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
    const reorderedStatements: Array<PuppeteerStatements>  = reorder(
      puppeteerStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToPuppeteerTestCase(updateStatementsOrder(reorderedStatements));
  };

  return (
    <div>
      <div id='head'>
        <PuppeteerTestMenu dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase}/>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable'>
            {provided => (
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
