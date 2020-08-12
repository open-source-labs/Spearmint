import React, { useContext } from 'react';
import styles from '../TestCase/TestCase.module.scss';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import {
  updateEndpointTestStatement,
  updateStatementsOrder,
} from '../../context/actions/endpointTestCaseActions';
import EndpointTestMenu from '../TestMenu/EndpointTestMenu';
import EndpointTestStatements from './EndpointTestStatements';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import EndpointModal from '../Endpoint/EndpointModal';
const EndpointTestCase = () => {
  const [
    { endpointTestStatement, endpointStatements, modalOpen, endpointTestCase },
    dispatchToEndpointTestCase,
  ] = useContext(EndpointTestCaseContext);

  const handleUpdateEndpointTestStatements = (e) => {
    dispatchToEndpointTestCase(updateEndpointTestStatement(e.target.value));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements = reorder(
      endpointStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToEndpointTestCase(updateStatementsOrder(reorderedStatements));
  };

  let endpointInfoModal = null;
  if (modalOpen) endpointInfoModal = <EndpointModal />;

  const generatEndFile = () => {
    return (
      addEndpointImportStatements(),
      addEndpointTestStatements(),
      (testFileCode = beautify(testFileCode, {
        indent_size: 2,
        space_in_empty_paren: true,
        e4x: true,
      }))
    );
  };
  const addEndpointImportStatements = () => {
    endpointTestCase.endpointStatements.forEach((statement) => {
      switch (statement.type) {
        case 'endpoint':
          return createPathToServer(statement);
        default:
          return statement;
      }
    });
    testFileCode += '\n';
  };

  const addEndpointTestStatements = () => {
    testFileCode += `\n test('${endpointTestCase.endpointTestStatement}', async (done) => {`;
    endpointTestCase.endpointStatements.forEach((statement) => {
      switch (statement.type) {
        case 'endpoint':
          return addEndpoint(statement);
        default:
          return statement;
      }
    });
    testFileCode += 'done();';
    testFileCode += '});';
    testFileCode += '\n';
  };
  const createPathToServer = (statement) => {
    let filePath = path.relative(projectFilePath, statement.serverFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode = `const app = require('../${filePath}');
  const supertest = require('supertest')
  const request = supertest(app)\n`;

    testFileCode += '\n';
  };

  return (
    <div>
      <div id='head'>
        <EndpointTestMenu dispatchToEndpointTestCase={dispatchToEndpointTestCase} />
      </div>
      <button>save me</button>
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
