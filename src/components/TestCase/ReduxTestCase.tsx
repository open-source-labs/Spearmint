import React, { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { createFile } from '../../context/actions/globalActions';
import {
  updateReduxTestStatement,
  updateStatementsOrder,
} from '../../context/actions/reduxTestCaseActions';
import ReduxTestMenu from '../TestMenu/ReduxTestMenu';
import ReduxTestStatements from './ReduxTestStatements';
import { ReduxStatements, ReduxTestCaseState } from '../../utils/reduxTypes';

const remote = window.require('electron').remote;
const beautify = remote.require('js-beautify');
const path = remote.require('path');

const ReduxTestCase = () => {
  const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );

  const [{ projectFilePath }, dispatchToGlobal] = useContext<any>(GlobalContext);

  const handleUpdateReduxTestStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchToReduxTestCase(updateReduxTestStatement(e.target.value));
  };

  const reorder = (list: ReduxStatements[], startIndex: number, endIndex: number) => {
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
    const reorderedStatements: Array<ReduxStatements> = reorder(
      reduxStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToReduxTestCase(updateStatementsOrder(reorderedStatements));
  };

  let testFileCode = 'import React from "react";';
  const generateReduxFile = () => {
    return (
      addReduxImportStatements(),
      addReduxTestStatements(),
      (testFileCode = beautify(testFileCode, {
        indent_size: 2,
        space_in_empty_paren: true,
        e4x: true,
      }))
    );
  };

  const addReduxImportStatements = () => {
    reduxStatements.forEach((statement: any) => {
      switch (statement.type) {
        case 'async':
          return (
            addAsyncImportStatement(),
            createPathToActions(statement),
            createPathToTypes(statement),
            addAsyncVariables()
          );
        case 'action-creator':
          return (
            addActionCreatorImportStatement(),
            createPathToActions(statement),
            createPathToTypes(statement)
          );
        case 'middleware':
          return addMiddlewareImportStatement(), createPathToMiddlewares(statement);
        case 'reducer':
          return (
            addReducerImportStatement(),
            createPathToReducers(statement),
            createPathToTypes(statement)
          );
        default:
          return statement;
      }
    });
    testFileCode += '\n';
  };

  const addReduxTestStatements = () => {
    testFileCode += `\n test('${reduxTestStatement}', () => {`;
    reduxStatements.forEach((statement: any) => {
      switch (statement.type) {
        case 'async':
          return addAsync(statement);
        case 'action-creator':
          return addActionCreator(statement);
        case 'middleware':
          return addMiddleware(statement);
        case 'reducer':
          return addReducer(statement);
        default:
          return statement;
      }
    });
    testFileCode += '});';
    testFileCode += '\n';
  };

  const addAsyncImportStatement = () => {
    testFileCode += `import '@testing-library/jest-dom/extend-expect';
    import configureMockStore from 'redux-mock-store';
    import thunk from 'redux-thunk';
    import fetchMock from 'fetch-mock';`;
  };

  const createPathToActions = (statement: any) => {
    let filePath = path.relative(projectFilePath, statement.filePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as actions from '../${filePath}';`;
  };

  // Reducer Filepath
  const createPathToReducers = (statement: any) => {
    let filePath = path.relative(projectFilePath, statement.reducersFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import ${statement.reducerName} from '../${filePath}';`;
  };

  // Types Filepath
  const createPathToTypes = (statement: any) => {
    let filePath = path.relative(projectFilePath, statement.typesFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as types from '../${filePath}';`;
  };

  // Middleware Filepath
  const createPathToMiddlewares = (statement: any) => {
    let filePath = path.relative(projectFilePath, statement.middlewaresFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as middleware from '../${filePath}';`;
  };

  const addAsyncVariables = () => {
    testFileCode += `\n const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);`;
  };

  // AC Import Statements
  const addActionCreatorImportStatement = () => {
    testFileCode += `import { fake } from 'test-data-bot';
    import '@testing-library/jest-dom/extend-expect'`;
  };

  // Reducer Import Statements
  const addReducerImportStatement = () => {
    testFileCode += `import { render } from '@testing-library/react';
    import '@testing-library/jest-dom/extend-expect';`;
  };

  // Middleware Import Statements
  const addMiddlewareImportStatement = () => {
    testFileCode += `import '@testing-library/jest-dom/extend-expect';`;
  };

  const addReducer = (reducer: any) => {
    testFileCode += `expect(${reducer.reducerName}(${reducer.initialState},{${reducer.reducerAction}})).toEqual(${reducer.expectedState})`;
  };

  // Action Creator Jest Test Code
  const addActionCreator = (actionCreator: any) => {
    if (actionCreator.payloadKey && actionCreator.payloadType) {
      testFileCode += `const ${actionCreator.payloadKey} = fake(f => f.random.${actionCreator.payloadType}())
      const expectedAction = { 
        type: types.${actionCreator.actionType}, 
        ${actionCreator.payloadKey} 
      };
      expect(actions.${actionCreator.actionCreatorFunc}(${actionCreator.payloadKey})).toEqual(expectedAction);`;
    } else {
      testFileCode += `const expectedAction = { 
        type: types.${actionCreator.actionType} 
      }; 
      expect(actions.${actionCreator.actionCreatorFunc}()).toEqual(expectedAction);`;
    }
  };

  // Async AC Jest Test Code
  const addAsync = (async: any) => {
    testFileCode += `fetchMock.${async.method}('${async.route}', ${async.requestBody});
    const expectedActions = ${async.expectedResponse};
    const store = mockStore(${async.store});
    return store.dispatch(actions.${async.asyncFunction}()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })`;
  };

  const addMiddleware = (middleware: any) => {
    testFileCode += `const ${middleware.queryValue} = () => {
      const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
      }
      const next = jest.fn()
      const invoke = action => ${middleware.queryType}(store)(next)(action)
      return { store, next, invoke } 
    }
    \n`;

    if (middleware.queryValue === 'passes_non_functional_arguments') {
      testFileCode += `const { next, invoke } = ${middleware.queryValue}()
      const action = {type : 'TEST'}
      invoke(action)
      expect(${middleware.querySelector}).${middleware.queryVariant}(action)`;
    } else if (middleware.queryValue === 'calls_the_function') {
      testFileCode += `const { invoke } = ${middleware.queryValue}()
      const fn = jest.fn()
      invoke(fn)
      expect(${middleware.querySelector}).${middleware.queryVariant}()`;
    } else if (middleware.queryValue === 'passes_functional_arguments') {
      testFileCode += `const { store, invoke } = ${middleware.queryValue}()
      invoke((dispatch, getState) => {
        dispatch('Test Dispatch')
        getState()
      })
      expect(${middleware.querySelector}).${middleware.queryVariant}('Test Dispatch')
      expect(${middleware.querySelector}).${middleware.queryVariant}()`;
    }
  };

  const fileHandle = () => {
    dispatchToGlobal(createFile(generateReduxFile()));
  };

  return (
    <div>
      <div id='head'>
        <ReduxTestMenu dispatchToReduxTestCase={dispatchToReduxTestCase} />
      </div>
      <button onClick={fileHandle}>save me</button>

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
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ReduxTestStatements
                reduxStatements={reduxStatements}
                dispatchToReduxTestCase={dispatchToReduxTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ReduxTestCase;
