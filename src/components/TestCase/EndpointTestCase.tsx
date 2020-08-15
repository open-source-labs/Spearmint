import React, { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import { updateFile } from '../../context/actions/globalActions';
import {
  updateEndpointTestStatement,
  updateStatementsOrder,
} from '../../context/actions/endpointTestCaseActions';
import EndpointTestMenu from '../TestMenu/EndpointTestMenu';
import EndpointTestStatements from './EndpointTestStatements';
import { EndpointStatements } from '../../utils/endpointTypes';
import EndpointHelpModal from '../TestHelpModals/EndpointHelpModal';
const remote = window.require('electron').remote;
const beautify = remote.require('js-beautify');
const path = remote.require('path');

const EndpointTestCase = () => {
  const [
    { endpointTestStatement, endpointStatements, modalOpen },
    dispatchToEndpointTestCase,
  ] = useContext(EndpointTestCaseContext);

  const [{ projectFilePath, exportBool, file }, dispatchToGlobal] = useContext<any>(GlobalContext);

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

  let testFileCode = 'import React from "react";';
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
    endpointStatements.forEach((statement: any) => {
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
    testFileCode += `\n test('${endpointTestStatement}', async (done) => {`;
    endpointStatements.forEach((statement: any) => {
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
  const createPathToServer = (statement: any) => {
    let filePath = path.relative(projectFilePath, statement.serverFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode = `const app = require('../${filePath}');
  const supertest = require('supertest')
  const request = supertest(app)\n`;

    testFileCode += '\n';
  };

  const addEndpoint = (statement: any) => {
    testFileCode += `const response = await request.${statement.method}('${statement.route}')
    expect(response.${statement.expectedResponse}).toBe(${statement.value});`;
  };

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generatEndFile()));
  };

  if (!file && exportBool) dispatchToGlobal(updateFile(generatEndFile()));

  let endpointInfoModal = null;
  if (modalOpen) endpointInfoModal = <EndpointHelpModal />;

  return (
    <div>
      <div id='head'>
        <EndpointTestMenu dispatchToEndpointTestCase={dispatchToEndpointTestCase} />
      </div>
      <button onClick={fileHandle}>Preview</button>
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
