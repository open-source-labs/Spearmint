import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { HooksTestCaseContext } from '../../../context/hooksTestCaseReducer';
import { updateHooksTestStatement } from '../../../context/hooksTestCaseActions';
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

      <DragDropContext>
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
