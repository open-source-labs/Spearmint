import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { PuppeteerTestCaseContext } from '../../../context/puppeteerTestCaseReducer';
import PuppeteerTestMenu from '../TestMenu/PuppeteerTestMenu';
import PuppeteerTestStatements from './PuppeteerTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const PuppeteerTestCase = () => {
  const [{ puppeteerTestStatement, puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(PuppeteerTestCaseContext);

  return (
    <div>
      <div id='head'>
        <PuppeteerTestMenu dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase}/>
      </div>

      <div id={styles.testMockSection}>
        <section  id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
        </section>
      </div>

      <DragDropContext>
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
  )
}

export default PuppeteerTestCase;