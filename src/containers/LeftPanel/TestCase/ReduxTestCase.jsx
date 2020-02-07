import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { ReduxTestCaseContext } from '../../../context/reduxTestCaseReducer';
import { updateReduxTestStatement } from '../../../context/reduxTestCaseActions';
import ReduxTestMenu from '../TestMenu/ReduxTestMenu';
import ReduxTestStatements from './ReduxTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ReduxTestCase = () => {
  const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );

  /* here we are sending actions to the reducer  */
  const handleUpdateReduxTestStatement = e => {
    dispatchToReduxTestCase(updateReduxTestStatement(e.target.value));
  };

  return (
    <div>
      <div id='head'>
        <ReduxTestMenu dispatchToReduxTestCase={dispatchToReduxTestCase} />
      </div>

      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
          <input
            type='text'
            id={styles.testStatement}
            value={reduxTestStatement}
            onChange={handleUpdateReduxTestStatement}
          />
        </section>
      </div>

      <DragDropContext>
        <Droppable droppableId='droppable'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ReduxTestStatements
                reduxStatements={reduxStatements}
                dispatchToReduxTestCase={dispatchToReduxTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ReduxTestCase;
