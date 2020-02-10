import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { EndpointTestCaseContext } from '../../../context/endpointTestCaseReducer';
import { updateEndpointTestStatement, updateEndpointStatementsOrder } from '../../../context/endpointTestCaseActions';
import EndpointTestMenu from '../TestMenu/EndpointTestMenu';
import EndpointTestStatements from './EndpointTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const EndpointTestCase = () => {
    const [{ endpointTestStatement, endpointStatements }, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);

    const handleUpdateEndpointTestStatements = e => {
        dispatchToEndpointTestCase(updateEndpointTestStatement(e.target.value))
    };

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

            <DragDropContext>
                <Droppable droppableId='droppable'>
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                        <EndpointTestStatements
                            endpointStatements={endpointStatements}
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