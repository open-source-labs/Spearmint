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

//imports from Export Modal
import { GlobalContext } from '../../context/reducers/globalReducer';

let testFileCode = 'import React from "react";';

const remote = window.require('electron').remote;
const beautify = remote.require('js-beautify');
const path = remote.require('path');
//

const EndpointTestCase = () => {
  const [endpointTestCase, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);

  //added import from Export File Modal
  const [{ projectFilePath }, dispatchToGlobal] = useContext(GlobalContext);
  //

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
      endpointTestCase.endpointStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToEndpointTestCase(updateStatementsOrder(reorderedStatements));
  };

  /*--------------------------------------------------------------------------
---------------------COPIED FROM EXPORT FILE MODAL----------------------------
----------------------------------------------------------------------------*/
  const generateTestFile = () => {
    if (endpointTestCase.hasEndpoint > 0) {
      let test =
        (addEndpointImportStatements(),
        addEndpointTestStatements(),
        (testFileCode = beautify(testFileCode, {
          indent_size: 2,
          space_in_empty_paren: true,
          e4x: true,
        })));
      alert(test);
    }
  };

  // Endpoint Import Statements
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

  // Endpoint Filepath
  const createPathToServer = (statement) => {
    let filePath = path.relative(projectFilePath, statement.serverFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode = `const app = require('../${filePath}');
      const supertest = require('supertest')
      const request = supertest(app)\n`;

    testFileCode += '\n';
  };

  // Endpoint Jest Test Code
  const addEndpoint = (statement) => {
    testFileCode += `const response = await request.${statement.method}('${statement.route}')
    expect(response.${statement.expectedResponse}).toBe(${statement.value});`;
  };

  /*--------------------------------------------------------------------------
--------------------------------------------------------------------------
----------------------------------------------------------------------------*/

  return (
    <div>
      <div id='head'>
        <EndpointTestMenu dispatchToEndpointTestCase={dispatchToEndpointTestCase} />
      </div>
      {/* added component */}
      <button onClick={generateTestFile}>Click me to save</button>
      {/* added component */}

      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
          <input
            type='text'
            id={styles.testStatement}
            value={endpointTestCase.endpointTestStatement}
            onChange={handleUpdateEndpointTestStatements}
          />
        </section>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <EndpointTestStatements
                endpointStatements={endpointTestCase.endpointStatements}
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
