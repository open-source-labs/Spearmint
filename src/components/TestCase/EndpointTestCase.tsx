import React, { useContext, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
import {
  updateEndpointTestStatement,
  updateStatementsOrder,
} from '../../context/actions/endpointTestCaseActions';
import EndpointTestMenu from '../TestMenu/EndpointTestMenu';
import EndpointTestStatements from './EndpointTestStatements';
import { EndpointStatements } from '../../utils/endpointTypes';
import EndpointHelpModal from '../TestHelpModals/EndpointHelpModal';
import useGenerateTest from '../../context/useGenerateTest.jsx';

const EndpointTestCase = () => {
  const [
    { endpointTestStatement, endpointStatements, modalOpen },
    dispatchToEndpointTestCase,
  ] = useContext(EndpointTestCaseContext);

  const [{ projectFilePath, exportBool, file }, dispatchToGlobal] = useContext<any>(GlobalContext);

  interface Ref {
    current: any;
  }

  const testDescription: Ref = useRef(null);

  useEffect(() => {
    testDescription.current.focus();
  }, []);

  const handleUpdateEndpointTestStatements = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchToEndpointTestCase(updateEndpointTestStatement(e.target.value));
    fileHandle();
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

  const generateTest = useGenerateTest('endpoint', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ endpointTestStatement, endpointStatements })));
    dispatchToGlobal(setFilePath(''));
  };

  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest({ endpointTestStatement, endpointStatements })));

  let endpointInfoModal = null;
  if (modalOpen) endpointInfoModal = <EndpointHelpModal />;

  return (
    <div>
      <div id='head'>
        <EndpointTestMenu dispatchToEndpointTestCase={dispatchToEndpointTestCase} />
      </div>
      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
          <input
            ref={testDescription}
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
