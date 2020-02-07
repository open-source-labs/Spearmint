import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { EndpointTestCaseContext } from '../../../context/endpointTestCaseReducer';
import { updateEndpointTestStatement, updateEndpointStatementsOrder } from '../../../context/endpointTestCaseActions';
import EndpointTestMenu from '../TestMenu/EndpointTestMenu';
import EndpointTestStatements from './EndpointTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const plusIcon = require('../../../assets/images/plus-box.png');

const EndpointTestCase = () => {
    const [{ endpointTestStatement, endpointStatements }, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);

    const draggableStatements = endpointStatements.slice(1, -1);

    const handleUpdateEndpointTestStatements = e => {
        dispatchToEndpointTestCase(updateEndpointTestStatement(e.target.value))
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
        dispatchToEndpointTestCase(updateEndpointStatementsOrder(reorderedStatements));
    }


    return (
        <div>
            <div id='head'>
                <EndpointTestMenu dispatchToEndpointTestCase={dispatchToEndpointTestCase}/>
            </div>

            <div id={styles.testMockSection}>
                <section  id={styles.testCaseHeader}>
                    <label htmlFor='test-statement'>Test</label>
                    <input
                    type='text'
                    id={styles.testStatement}
                    value={endpointTestStatement}
                    onChange={handleUpdateEndpointTestStatements}
                    />
                </section>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                        <EndpointTestStatements
                            endpointStatements={draggableStatements}
                            dispatchToEndpointTestCase={dispatchToEndpointTestCase}
                        />
                        {provided.placeholder}
                        </div>                        
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default EndpointTestCase;