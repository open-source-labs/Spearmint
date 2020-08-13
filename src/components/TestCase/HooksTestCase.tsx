import React, { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { createFile } from '../../context/actions/globalActions';
import styles from './TestCase.module.scss';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import {
  updateHooksTestStatement,
  updateStatementsOrder,
} from '../../context/actions/hooksTestCaseActions';
import HooksTestMenu from '../TestMenu/HooksTestMenu';
import HooksTestStatements from './HooksTestStatements';
import { HooksStatements } from '../../utils/hooksTypes';
const remote = window.require('electron').remote;
const beautify = remote.require('js-beautify');
const path = remote.require('path');

const HooksTestCase = () => {
  const [{ hooksTestStatement, hooksStatements }, dispatchToHooksTestCase] = useContext(
    HooksTestCaseContext
  );

  const [{ projectFilePath }, dispatchToGlobal] = useContext<any>(GlobalContext);

  const handleUpdateHooksTestStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchToHooksTestCase(updateHooksTestStatement(e.target.value));
  };

  const reorder = (list: Array<HooksStatements>, startIndex: number, endIndex: number) => {
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
    const reorderedStatements: Array<HooksStatements> = reorder(
      hooksStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToHooksTestCase(updateStatementsOrder(reorderedStatements));
  };
  let testFileCode = 'import React from "react";';
  const generatHookFile = () => {
    return (
      addHooksImportStatements(),
      addHooksTestStatements(),
      (testFileCode = beautify(testFileCode, {
        indent_size: 2,
        space_in_empty_paren: true,
        e4x: true,
      }))
    );
  };

  const addHooksImportStatements = () => {
    hooksStatements.forEach((statement: any) => {
      switch (statement.type) {
        case 'hook-updates':
          return addRenderHooksImportStatement(), createPathToHooks(statement);
        case 'hookRender':
          return addRenderHooksImportStatement(), createPathToHooks(statement);
        case 'context':
          return addContextImportStatements(), createPathToContext(statement);
        default:
          return statement;
      }
    });
    testFileCode += '\n';
  };

  const addHooksTestStatements = () => {
    testFileCode += `\n test('${hooksTestStatement}', () => {`;
    hooksStatements.forEach((statement: any) => {
      switch (statement.type) {
        case 'hook-updates':
          return addHookUpdates(statement);
        case 'hookRender':
          return addHookRender(statement);
        case 'context':
          return addContext(statement);
        default:
          return statement;
      }
    });
    testFileCode += '});';
    testFileCode += '\n';
  };

  // Hooks Import Statements
  const addRenderHooksImportStatement = () => {
    testFileCode += `import { renderHook, act } from '@testing-library/react-hooks'
    import '@testing-library/jest-dom/extend-expect'`;
  };

  // Hooks Filepath
  const createPathToHooks = (statement: any) => {
    let filePath = path.relative(projectFilePath, statement.hookFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import ${statement.hook} from '../${filePath}';`;
  };

  // Context Import Statements
  const addContextImportStatements = () => {
    testFileCode += `import { render } from '@testing-library/react'; 
    import '@testing-library/jest-dom/extend-expect'`;
  };

  // Context Filepath
  const createPathToContext = (statement: any) => {
    let filePath = path.relative(projectFilePath, statement.contextFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import { ${statement.providerComponent}, ${statement.consumerComponent}, ${statement.context} } from '../${filePath}';`;
  };

  // Hook: Updates Jest Test Code
  const addHookUpdates = (hookUpdates: any) => {
    testFileCode += `const {result} = renderHook (() => ${hookUpdates.hook}());
    act(() => {
      result.current.${hookUpdates.callbackFunc}();
    });
    expect(result.current.${hookUpdates.managedState}).toBe(${hookUpdates.updatedState})`;
  };

  // Hook: Renders Jest Test Code
  const addHookRender = (hookRender: any) => {
    testFileCode += `const {result} = renderHook(() => ${hookRender.hook}(${hookRender.parameterOne}))
    expect(result.current.${hookRender.returnValue}).toBe(${hookRender.expectedReturnValue})`;
  };

  // Context Jest Test Code
  const addContext = (context: any) => {
    if (context.queryValue === 'shows_default_value') {
      testFileCode += `const mockValue = {Data: '${context.values}'}
      const { ${context.querySelector} } = render(<${context.consumerComponent}/>)
      expect(${context.querySelector}(mockValue.Data)).${context.queryVariant}('${context.values}')`;
    }
    if (context.queryValue === 'shows_value_from_provider') {
      testFileCode += `const mockValue = {Data: '${context.values}'}
      const { ${context.querySelector} } = render (
        <${context.context}.Provider value={mockValue}>
          <${context.consumerComponent}/>
        </${context.context}.Provider>
      )
      expect(${context.querySelector}(mockValue.Data)).${context.queryVariant}('${context.values}')`;
    }
    if (context.queryValue === 'component_provides_context_value') {
      testFileCode += `const mockValue = {Data: '${context.values}'}
      const { ${context.querySelector} } = render (
        <${context.providerComponent} value={mockValue}>
          <${context.context}.Consumer>
          {value => <span>Recieved: {value} </span>}
          <${context.context}.Consumer/>
        </${context.providerComponent}>
      )
      expect(${context.querySelector}(/^Recieved:/).textContent).${context.queryVariant}('${context.values}')`;
    }
    if (context.queryValue === 'renders_providers_+_consumers_normally') {
      testFileCode += `const mockValue = {Data: '${context.values}'}
      const { ${context.querySelector} } = render (
        <${context.providerComponent} value={mockValue}>
          <${context.consumerComponent}/>
        </${context.providerComponent}>
      )
      expect(${context.querySelector}(mockValue.Data).textContent).${context.queryVariant}('${context.values}')`;
    }
  };

  const fileHandle = () => {
    dispatchToGlobal(createFile(generatHookFile()));
  };

  return (
    <div>
      <div id='head'>
        <HooksTestMenu dispatchToHooksTestCase={dispatchToHooksTestCase} />
      </div>
      <button onClick={fileHandle}>save me</button>
      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>
            Test
            <input
              type='text'
              id={styles.testStatement}
              value={hooksTestStatement}
              onChange={handleUpdateHooksTestStatement}
            />
          </label>
        </section>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <HooksTestStatements
                hooksStatements={hooksStatements}
                dispatchToHooksTestCase={dispatchToHooksTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default HooksTestCase;
