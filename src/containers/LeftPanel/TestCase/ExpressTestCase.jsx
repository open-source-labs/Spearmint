import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { ExpressTestCaseContext } from '../../../context/expressTestCaseReducer';
import { updateExpressTestStatement, updateExpressStatementsOrder } from '../../../context/expressTestCaseActions';
import ExpressTestMenu from '../TestMenu/ExpressTestMenu';
import ExpressTestStatements from './ExpressTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const plusIcon = require('../../../assets/images/plus-box.png');

const ExpressTestCase = () => {
    const [{ expressTestStatement, expressStatements }, dispatchToExpressTestCase] = useContext(ExpressTestCaseContext);

    const draggableStatements = expressStatements.slice(1, -1);

    const handleUpdateExpressTestStatements = e => {
        dispatchToExpressTestCase(updateExpressTestStatement(e.target.value))
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
        if (result.destination.index === result.source.index){
            return;
        }

        const reorderedStatements = reorder(
            draggableStatements,
            result.source.index,
            result.destination.index
        );
        dispatchToExpressTestCase(updateExpressStatementsOrder(reorderedStatements));
    }


    return (
        <div>
            <div id='head'>
                <ExpressTestMenu dispatchToExpressTestCase={dispatchToExpressTestCase}/>
            </div>

            <div id={styles.testMockSection}>
                <section  id={styles.testCaseHeader}>
                    <label htmlFor='test-statement'>Test</label>
                    <input
                    type='text'
                    id={styles.testStatement}
                    value={expressTestStatement}
                    onChange={handleUpdateExpressTestStatements}
                    />
                </section>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                        <ExpressTestStatements
                            expressStatements={draggableStatements}
                            dispatchToExpressTestCase={dispatchToExpressTestCase}
                        />
                        {provided.placeholder}
                        </div>                        
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default ExpressTestCase;