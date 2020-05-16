import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { updateHooksTestStatement, updateStatementsOrder } from '../../context/actions/hooksTestCaseActions';
import HooksTestMenu from '../TestMenu/HooksTestMenu';
import HooksTestStatements from './HooksTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const HooksTestCase = () => {
  const [{ hooksTestStatement, hooksStatements }, dispatchToHooksTestCase] = useContext(
    HooksTestCaseContext
  );

  const handleUpdateHooksTestStatement = e => {
    dispatchToHooksTestCase(updateHooksTestStatement(e.target.value));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements = reorder(
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

      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
          <input
            type='text'
            id={styles.testStatement}
            value={hooksTestStatement}
            onChange={handleUpdateHooksTestStatement}
          />
        </section>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
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
