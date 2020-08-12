import React, { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import {
  updateEndpointTestStatement,
  updateStatementsOrder,
} from '../../context/actions/endpointTestCaseActions';
import EndpointTestMenu from '../TestMenu/EndpointTestMenu';
import EndpointTestStatements from './EndpointTestStatements';
import { EndpointStatements } from '../../utils/endpointTypes';
import EndpointModal from '../Endpoint/EndpointModal';

const EndpointTestCase = () => {
  const [
    { endpointTestStatement, endpointStatements, modalOpen },
    dispatchToEndpointTestCase,
  ] = useContext(EndpointTestCaseContext);

  const handleUpdateEndpointTestStatements = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchToEndpointTestCase(updateEndpointTestStatement(e.target.value));
  };

  const reorder = (list: Array<EndpointStatements>, startIndex: number, endIndex: number) => {
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
    const reorderedStatements: Array<EndpointStatements> = reorder(
      endpointStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToEndpointTestCase(updateStatementsOrder(reorderedStatements));
  };

  let endpointInfoModal = null;
  if (modalOpen) endpointInfoModal = <EndpointModal />;

  return (
    <div>
      <div id='head'>
        <EndpointTestMenu dispatchToEndpointTestCase={dispatchToEndpointTestCase} />
      </div>

      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
          <input
            type='text'
            id={styles.testStatement}
            value={endpointTestStatement}
            onChange={handleUpdateEndpointTestStatements}
          />
        </section>
      </div>
      {endpointInfoModal}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
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
  );
};

export default EndpointTestCase;
