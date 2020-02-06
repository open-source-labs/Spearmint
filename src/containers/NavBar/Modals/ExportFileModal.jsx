import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import { GlobalContext } from '../../../context/globalReducer';
import {
  displayFileCode,
  loadProject,
  toggleFolderView,
  highlightFile,
} from '../../../context/globalActions';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { ReduxTestCaseContext } from '../../../context/reduxTestCaseReducer';
import { MockDataContext } from '../../../context/mockDataReducer';
import styles from './ExportFileModal.module.scss';

const remote = window.require('electron').remote;
const fs = remote.require('fs');
const path = remote.require('path');
const beautify = remote.require('js-beautify');

const ExportFileModal = ({ isExportModalOpen, closeExportModal }) => {
  const [fileName, setFileName] = useState('');
  const [{ projectFilePath }, dispatchToGlobal] = useContext(GlobalContext);
  const [testCase, __] = useContext(TestCaseContext);
  const [reduxTestCase, ____] = useContext(ReduxTestCaseContext);
  const [{ mockData }, ___] = useContext(MockDataContext);

  let testFileCode = 'import React from "react";';

  const handleChangeFileName = e => {
    setFileName(e.target.value);
  };

  const handleClickSave = () => {
    generateTestFile();
    exportTestFile();
    closeExportModal();
  };

  const generateTestFile = () => {
    if (testCase.hasReact === true) {
      return (
        addComponentImportStatement(),
        addReactImportStatements(),
        addMockData(),
        addTestStatements(),
        (testFileCode = beautify(testFileCode, {
          indent_size: 2,
          space_in_empty_paren: true,
          e4x: true,
        }))
      );
    }
    if (reduxTestCase.hasRedux === true) {
      return (
        addReduxImportStatements(),
        addReduxTestStatements(),
        (testFileCode = beautify(testFileCode, {
          indent_size: 2,
          space_in_empty_paren: true,
          e4x: true,
        }))
      );
    }
    if (hooksTestCase.hasHooks === true) {
      return (
        addHooksImportStatements(),
        addHooksTestStatements(),
        (testFileCode = beautify(testFileCode, {
          indent_size: 2,
          space_in_empty_paren: true,
          e4x: true,
        }))
      );
    }
  };

  /* ------------------------------------------ REACT IMPORT + TEST STATEMENTS ------------------------------------------ */

  // React Import Statements
  const addReactImportStatements = () => {
    testFileCode += `import { render, fireEvent } from '@testing-library/react'; 
    import { build, fake } from 'test-data-bot'; 
    import '@testing-library/jest-dom/extend-expect'
    \n`;
  };

  // React Component Import Statement (Render Card)
  const addComponentImportStatement = () => {
    const renderStatement = testCase.statements[0];
    let filePath = path.relative(projectFilePath, renderStatement.filePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import ${renderStatement.componentName} from '../${filePath}';`;
  };

  // React Test Statements
  const addTestStatements = () => {
    testFileCode += `test('${testCase.testStatement}', () => {`;
    const methods = identifyMethods();
    testCase.statements.forEach(statement => {
      switch (statement.type) {
        case 'action':
          return addAction(statement);
        case 'assertion':
          return addAssertion(statement);
        case 'render':
          return addRender(statement, methods);
        default:
          return statement;
      }
    });
    testFileCode += '});';
    testFileCode += '\n';
  };

  /* ------------------------------------------ REDUX IMPORT + TEST STATEMENTS ------------------------------------------ */

  // Redux Import Statements
  const addReduxImportStatements = () => {
    reduxTestCase.statements.forEach(statement => {
      switch (statement.type) {
        case 'async':
          return (
            addAsyncImportStatement(), createPathToActions(statement), createPathToTypes(statement)
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

  // Async Import Statements
  const addAsyncImportStatement = () => {
    testFileCode += `import '@testing-library/jest-dom/extend-expect';
    import configureMockStore from 'redux-mock-store';
    import thunk from 'redux-thunk';
    import fetchMock from 'fetch-mock';
    \n
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares);
    \n`;
  };

  // AC Import Statements
  const addActionCreatorImportStatement = () => {
    testFileCode += `import { fake } from 'test-data-bot';
    import '@testing-library/jest-dom/extend-expect'
    \n`;
  };

  // Reducer Import Statements
  const addReducerImportStatement = () => {
    testFileCode += `import { render } from '@testing-library/react';
    import '@testing-library/jest-dom/extend-expect';
    \n`;
  };

  // Middleware Import Statements
  const addMiddlewareImportStatement = () => {
    testFileCode += `import '@testing-library/jest-dom/extend-expect';
    \n`;
  };

  // Redux Test Statements
  const addReduxTestStatements = () => {
    testFileCode += `test('${reduxTestCase.testStatement}', () => {`;
    reduxTestCase.statements.forEach(statement => {
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

  /* ------------------------------------------ HOOKS & CONTEXT IMPORT + TEST STATEMENTS ------------------------------------------ */

  // Hooks & Context Import Statements
  const addHooksImportStatements = () => {
    hooksTestCase.statements.forEach(statement => {
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

  // Context Import Statements
  const addContextImportStatements = () => {
    testFileCode += `import { render } from '@testing-library/react'; 
    import '@testing-library/jest-dom/extend-expect'
    \n`;
  };

  // Hooks Import Statements
  const addRenderHooksImportStatement = () => {
    testFileCode += `import { renderHook, act } from '@testing-library/react-hooks'
    import '@testing-library/jest-dom/extend-expect'
    \n`;
  };

  // Hooks & Context Test Statements
  const addHooksTestStatements = () => {
    testFileCode += `test('${hooksTestCase.testStatement}', () => {`;
    hooksTestCase.statements.forEach(statement => {
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

  /* ------------------------------------------ FILEPATHS ------------------------------------------ */

  // Actions Filepath
  const createPathToActions = statement => {
    let filePath = path.relative(projectFilePath, statement.filePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as actions from '../${filePath}';`;
  };

  // Reducer Filepath
  const createPathToReducers = statement => {
    let filePath = path.relative(projectFilePath, statement.reducersFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as reducers from '../${filePath}';`;
  };

  // Types Filepath
  const createPathToTypes = statement => {
    let filePath = path.relative(projectFilePath, statement.typesFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as types from '../${filePath}';`;
  };

  // Middleware Filepath
  const createPathToMiddlewares = statement => {
    let filePath = path.relative(projectFilePath, statement.middlewaresFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as middleware from '../${filePath}';`;
  };

  // Hooks Filepath
  const createPathToHooks = statement => {
    let filePath = path.relative(projectFilePath, statement.hookFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import ${statement.hook} from '../${filePath}';`;
  };

  // Context Filepath
  const createPathToContext = statement => {
    let filePath = path.relative(projectFilePath, statement.contextFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import { ${statement.providerComponent}, ${statement.consumerComponent}, ${statement.context} } from '../${filePath}';`;
  };

  /* ------------------------------------------ MOCK DATA + METHODS ------------------------------------------ */

  const addMockData = () => {
    mockData.forEach(mockDatum => {
      let fieldKeys = createMockDatumFieldKeys(mockDatum);
      testFileCode += `const mock${mockDatum.name.charAt(0).toUpperCase() +
        mockDatum.name.slice(1)} = build('${mockDatum.name}').fields({ ${fieldKeys} })();`;
    });
    testFileCode += '\n';
  };

  const createMockDatumFieldKeys = mockDatum => {
    return mockDatum.fieldKeys.reduce((fieldKeysCode, mockDatum) => {
      return fieldKeysCode + `${mockDatum.fieldKey}: fake(f => f.random.${mockDatum.fieldType}()),`;
    }, '');
  };

  const identifyMethods = () => {
    const methods = new Set([]);
    let renderCount = 0;
    testCase.statements.forEach(statement => {
      if (statement.type === 'action' || statement.type === 'assertion') {
        methods.add(statement.queryVariant + statement.querySelector);
      } else if (statement.type === 'render') {
        renderCount++;
      }
    });
    if (renderCount > 1) methods.add('rerender');
    return Array.from(methods).join(', ');
  };

  /* ------------------------------------------ TEST STATEMENTS ------------------------------------------ */
  // Action Jest Test Code
  const addAction = action => {
    if (action.eventValue) {
      testFileCode += `fireEvent.${action.eventType}(${action.queryVariant + action.querySelector}
                      ('${action.queryValue}'), { target: { value: ${action.eventValue} } });`;
    } else {
      testFileCode += `fireEvent.${action.eventType}(${action.queryVariant + action.querySelector}
                      ('${action.queryValue}'));`;
    }
  };

  // Assertion Jest Test Code
  const addAssertion = assertion => {
    testFileCode += `expect(${assertion.queryVariant + assertion.querySelector}
      (${assertion.queryValue})).${assertion.matcherType}(${assertion.matcherValue});`;
  };

  // Render Jest Test Code
  const addRender = (render, methods) => {
    let props = createRenderProps(render);
    if (render.id === 0) {
      testFileCode += `const {${methods}} = render(<${render.componentName} ${props}/>);`;
    } else {
      testFileCode += `rerender(<${render.componentName} ${props}/>);`;
    }
  };

  // Render Props Jest Test Code
  const createRenderProps = render => {
    return render.props.reduce((propsCode, prop) => {
      return propsCode + `${prop.propKey}={${prop.propValue}}`;
    }, '');
  };

  // Middleware Jest Test Code
  const addMiddleware = middleware => {
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

  // Reducer Jest Test Code - Linda to refactor 2/1
  const addReducer = reducer => {
    testFileCode += `expect(${reducer.queryValue}(${reducer.querySelector},${reducer.queryVariant})).toEqual(${reducer.matcherValue})`;
  };

  // Async AC Jest Test Code
  const addAsync = async => {
    testFileCode += `fetchMock.${async.method}('${async.route}', ${async.requestBody});
    const expectedActions = ${async.expectedResponse};
    const store = mockStore(${async.store});
    \n
    return store.dispatch(actions.${async.asyncFunction}()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })`;
  };

  // Action Creator Jest Test Code
  const addActionCreator = actionCreator => {
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

  // Hook: Updates Jest Test Code
  const addHookUpdates = hookUpdates => {
    testFileCode += `const {result} = renderHook (() => ${hookUpdates.hook}());
    act(() => {
      result.current.${hookUpdates.callbackFunc}();
    });
    expect(result.current.${hookUpdates.managedState}).toBe(${hookUpdates.updatedState})`;
  };

  // Hook: Renders Jest Test Code
  const addHookRender = hookRender => {
    testFileCode += `const {result} = renderHook((${hookRender.parameterOne}) => ${hookRender.hook}())
    expect(result.current.${hookRender.returnValue}).toBe(${hookRender.expectedReturnValue})`;
  };

  // Context Jest Test Code
  const addContext = context => {
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

  const exportTestFile = async () => {
    if (!fs.existsSync(projectFilePath + '/__tests__')) {
      fs.mkdirSync(projectFilePath + '/__tests__');
    }
    await fs.writeFile(projectFilePath + `/__tests__/${fileName}.test.js`, testFileCode, err => {
      if (err) throw err;
    });
    displayTestFile(projectFilePath + '/__tests__');
  };

  const displayTestFile = testFolderFilePath => {
    const fileContent = fs.readFileSync(testFolderFilePath + `/${fileName}.test.js`, 'utf8');
    dispatchToGlobal(displayFileCode(fileContent));
    dispatchToGlobal(loadProject('reload'));
    dispatchToGlobal(toggleFolderView(testFolderFilePath));
    dispatchToGlobal(highlightFile(`${fileName}.test.js`));
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isExportModalOpen}
      onRequestClose={closeExportModal}
      contentLabel='Save testing file'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
    >
      <div id={styles.title}>
        <p>Convert to Javascript Code</p>
        <svg id={styles.close} onClick={closeExportModal}>
          <path d='M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z' />
        </svg>
      </div>
      <div id={styles.body}>
        <p>File Name</p>
        <input type='text' value={fileName} onChange={handleChangeFileName} />
        <button id={styles.save} onClick={closeExportModal}>
          Cancel
        </button>
        <button id={styles.save} onClick={handleClickSave}>
          Save
        </button>
      </div>
    </ReactModal>
  );
};

export default ExportFileModal;
