import React, { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import {
  updateHooksTestStatement,
  updateStatementsOrder,
} from '../../context/actions/hooksTestCaseActions';
import HooksTestMenu from '../TestMenu/HooksTestMenu';
import HooksTestStatements from './HooksTestStatements';
import { HooksStatements } from '../../utils/hooksTypes';
import HooksHelpModal from '../TestHelpModals/HooksHelpModal';

const HooksTestCase = () => {
  const [{ hooksTestStatement, hooksStatements, modalOpen }, dispatchToHooksTestCase] = useContext(
    HooksTestCaseContext
  );

  const handleUpdateHooksTestStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchToHooksTestCase(updateHooksTestStatement(e.target.value));
  };

  const reorder = (list: Array<HooksStatements>, startIndex: number, endIndex: number) => {
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
    const reorderedStatements: Array<HooksStatements> = reorder(
      hooksStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToHooksTestCase(updateStatementsOrder(reorderedStatements));
  };

  return (
    <div>
      <div id='head'>
        <HooksTestMenu dispatchToHooksTestCase={dispatchToHooksTestCase} />
      </div>
      {modalOpen ? <HooksHelpModal /> : null}
      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>
            Test
            <input
              type='text'
              id={styles.testStatement}
              value={hooksTestStatement}
              onChange={handleUpdateHooksTestStatement}
            />
          </label>
        </section>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <HooksTestStatements
                hooksStatements={hooksStatements}
                dispatchToHooksTestCase={dispatchToHooksTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default HooksTestCase;
