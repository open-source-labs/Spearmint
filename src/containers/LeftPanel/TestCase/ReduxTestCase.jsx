import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { ReduxTestCaseContext } from '../../../context/reduxTestCaseReducer';
import { updateReduxTestStatement, updateReduxStatementsOrder } from '../../../context/reduxTestCaseActions';
import ReduxTestMenu from '../TestMenu/ReduxTestMenu';
import ReduxTestStatements from './ReduxTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const plusIcon = require('../../../assets/images/plus-box.png');


const ReduxTestCase = () => {
    const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext); 

    const draggableStatements = reduxStatements.slice(1, -1);

    /* here we are sending actions to the reducer  */
    const handleUpdateReduxTestStatement = e => {
        dispatchToReduxTestCase(updateReduxTestStatement(e.target.value));
      };

    /* to reorder the reduxStatements array */
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };


   /* the drag and drop function (called below) */
   const onDragEnd = result => {
        if (!result.destination) {
        return;
        }
        if (result.destination.index === result.source.index) {
        return;
        }

        /* this is reordering the statements array by calling the reorder function with these args passed in*/
        const reorderedStatements = reorder(
            draggableStatements,
            result.source.index,
            result.destination.index
        );
        dispatchToReduxTestCase(updateReduxStatementsOrder(reorderedStatements));
    }

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

            <DragDropContext onDragEnd={onDragEnd}>
                 <Droppable droppableId='droppable'>
                    {provided => ( 
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                        <ReduxTestStatements
                            reduxStatements={draggableStatements}
                            dispatchToReduxTestCase={dispatchToReduxTestCase}
                        />
                        {provided.placeholder}
                        </div>
                    )}    
                </Droppable>
            </DragDropContext>
        </div>
    )   
}

export default ReduxTestCase;