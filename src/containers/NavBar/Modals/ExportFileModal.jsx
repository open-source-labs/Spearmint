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
    for (let i = 0; i < testCase.statements.length; i++) {
      if (
        (testCase.statements[i].type === 'render' && testCase.statements[i].componentName === '') ||
        (testCase.statements[i].type === 'assertion' && testCase.statements[i].queryVariant === '')
      ) {
        return (
          addImportStatements(),
          // addActionCreatorImportStatement(),
          addHookUpdatesImportStatement(),
          addReduxTestStatements(),
          (testFileCode = beautify(testFileCode, {
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );
      } else {
        return (
          addComponentImportStatement(),
          addImportStatements(),
          addMockData(),
          addTestStatements(),
          (testFileCode = beautify(testFileCode, {
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );
      }
    }
  };

  // import @testing-library/react, jest-dom, test-data-bot
  //   const generateTestFile = () => {

  //     for (let i = 0; i < testCase.statements.length; i++) {
  //       if (
  //         (testCase.statements[i].type === 'render' && testCase.statements[i].componentName === '') ||
  //         (testCase.statements[i].type === 'assertion' && testCase.statements[i].queryVariant === '')
  //       ) {
  //         return (
  //           addActionCreatorImportStatement(),
  //           addActionCreatorTestStatements(),
  //           (testFileCode = beautify(testFileCode, {
  //             indent_size: 2,
  //             space_in_empty_paren: true,
  //             e4x: true,
  //           }))
  //         );
  //       } else {
  //         return (
  //           addImportStatements(),
  //           addMockData(),
  //           addTestStatements(),
  //           (testFileCode = beautify(testFileCode, {
  //             indent_size: 2,
  //             space_in_empty_paren: true,
  //             e4x: true,
  //           }))
  //         );
  //       }
  //     }
  // //staging
  //     addImportStatements();
  //     addActionsImportStatement();
  //     addTypesImportStatement();
  //     addMockData();
  //     addAsyncTestStatements(); //Dave Corn reducer
  //     addMiddlewareTestStatements(); //Chloe reducer
  //     addTestStatements();
  //     addJestTestStatementsReducer(); // Linda's reducer
  //     // addTestStatements(); // needed for react testing

  //     testFileCode = beautify(testFileCode, {
  //       indent_size: 2,
  //       space_in_empty_paren: true,
  //       e4x: true,
  //     });
  // //staging

  //   };

  const generateTestFile = () => {
    // addImportStatements();
    addMockData();
    addActionsImportStatement();
    addTypesImportStatement();
    addReducersImportStatement();
    addMiddlewaresImportStatement();
    // addJestTestStatements();
    // addTestStatements();
    // addAsyncStatements(); // need to define this function
    testFileCode = beautify(testFileCode, {
      indent_size: 2,
      space_in_empty_paren: true,
      e4x: true,
    });
  };

  // const addImportStatements = () => {
  // Function for building Redux tests

  const addAsyncTestStatements = () => {
    testCase.statements.forEach(statement => {
      switch (statement.type) {
        case 'async':
          return addAsync(statement);
        default:
          return statement;
      }
    });
    testFileCode += '});';
    testFileCode += '\n';
  };

  const addImportStatements = () => {
    testFileCode += `import { render, fireEvent } from '@testing-library/react'; 
    import { build, fake } from 'test-data-bot'; 
    import '@testing-library/jest-dom/extend-expect'

    import '@testing-library/jest-dom/extend-expect'`//import statements for thunk
    `import configureMockStore from 'redux-mock-store';
    import thunk from 'redux-thunk';
    import fetchMock from 'fetch-mock';
    \n`;
  };

  // Import component name file path for render card
  const addComponentImportStatement = () => {
    const renderStatement = testCase.statements[0];
    let filePath = path.relative(projectFilePath, renderStatement.filePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import ${renderStatement.componentName} from '../${filePath}';`;
  };

  // React test statements
  // import statement for action creator
  const addActionCreatorImportStatement = () => {
    let actionCreatorStatement;
    testCase.statements.forEach(statement => {
      if (statement.type === 'action-creator') {
        actionCreatorStatement = statement;
        return actionCreatorStatement;
      }
    });
    testFileCode += `import '@testing-library/jest-dom/extend-expect';
    import { build, fake } from 'test-data-bot';`;
    // import * as actions from '../${actionCreatorStatement.actionsFolder}.js';
    // import * as types from '../${actionCreatorStatement.typesFolder}.js';
  };

  // Add actions import line to the export file
  const addActionsImportStatement = () => {
    testCase.statements.forEach(statement => {
      if (statement.type === 'async' || statement.type === 'action-creator') {
        return createPathToActions(statement);
      } else {
        return statement;
      }
    });
  };

  // Creates import template for action file
  const createPathToActions = statement => {
    let filePath = path.relative(projectFilePath, statement.filePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as actions from '../${filePath}';`;
  };

  // Adds Types import line to the export file
  // const addTypesImportStatement = () => {
  //   testCase.statements.forEach(statement => {
  //     switch (statement.type) {
  //       case 'async':
  //         return createPathToTypes(statement);
  //       default:
  //         return statement;
  //     }
  //   })
  // };

  const addTypesImportStatement = () => {
    testCase.statements.forEach(statement => {
      if (
        statement.type === 'async' ||
        statement.type === 'action-creator' ||
        statement.type === 'reducer'
      ) {
        return createPathToTypes(statement);
      } else {
        return statement;
      }
    });
  };

  // Creates import template for types file
  const createPathToTypes = statement => {
    let filePath = path.relative(projectFilePath, statement.typesFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as types from '../${filePath}';`;
  };

  // Checks if statemnt.type is a Reducer
  const addReducersImportStatement = () => {
    testCase.statements.forEach(statement => {
      if (statement.type === 'reducer') {
        return createPathToReducers(statement);
      } else {
        return statement;
      }
    });
  };

  // Creates import statement and filePath for Reducer file
  const createPathToReducers = statement => {
    let filePath = path.relative(projectFilePath, statement.reducersFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as reducers from '../${filePath}';`;
  };

  // Checks if statemnt.type is a Middleware
  const addMiddlewaresImportStatement = () => {
    testCase.statements.forEach(statement => {
      if (statement.type === 'middleware') {
        return createPathToMiddlewares(statement);
      } else {
        return statement;
      }
    });
  };

  // Creates import statement and filePath for Middleware file
  const createPathToMiddlewares = statement => {
    let filePath = path.relative(projectFilePath, statement.middlewaresFilePath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import * as middleware from '../${filePath}';`;
  };

  const addMockData = () => {
    mockData.forEach(mockDatum => {
      let fieldKeys = createMockDatumFieldKeys(mockDatum);
      testFileCode += `const mock${mockDatum.name.charAt(0).toUpperCase() +
        mockDatum.name.slice(1)} = build('${mockDatum.name}').fields({ ${fieldKeys} })();`;
    });
    testFileCode += '\n';
  };

  //  const addJestMockData = (statement) => {
  // //  mockData.forEach(mockDatum => {
  // //    //let fieldTypes = createJestMockDatumFieldTypes(mockDatum);
  // //    let fieldTypes = `${mockDatum.fieldType}`
  //   addMiddleware(statement)
  //   testFileCode += '\n';
  //  };

  const createMockDatumFieldKeys = mockDatum => {
    return mockDatum.fieldKeys.reduce((fieldKeysCode, mockDatum) => {
      return fieldKeysCode + `${mockDatum.fieldKey}: fake(f => f.random.${mockDatum.fieldType}()),`;
    }, '');
  };

  /**
   * const createJestMockDatumFieldTypes = mockDatum => {
   *    return mockDatum.fieldTypes.reduce((fieldTypesCode, mockDatum) => {
   *        return fieldTypesCode + `${mockDatum.fieldType},`:
   *    }, '');
   * };
   */

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

  //Redux test statements
  const addReduxTestStatements = () => {
    testFileCode += `test('${testCase.testStatement}', () => {`;
    testCase.statements.forEach(statement => {
      switch (statement.type) {
        case 'async':
          return addAsync(statement);
        case 'action-creator':
          return addActionCreator(statement);
        case 'middleware':
          return addMiddleware(statement);
        case 'reducer':
          return addReducer(statement);
        case 'hook-updates':
          return addHookUpdates(statement);
        default:
          return statement;
      }
    });
    testFileCode += '});';
    testFileCode += '\n';
  };

  // Async Import Statements
  const asyncImportStatements = () => {
    testFileCode += ` import configureMockStore from 'redux-mock-store';
    import thunk from 'redux-thunk';
    import fetchMock from 'fetch-mock';
    \n`;
  };

  // AC Import Statements for actions & types file paths
  const addActionCreatorImportStatement = () => {
    let actionCreatorStatement;
    testCase.statements.forEach(statement => {
      if (statement.type === 'action-creator') {
        actionCreatorStatement = statement;
        return actionCreatorStatement;
      }
    });
    testFileCode += `import * as actions from '../${actionCreatorStatement.actionsFolder}.js'; 
    import * as types from '../${actionCreatorStatement.typesFolder}.js';
    \n`;
  };

  // Hook: Updates import statements
  const addHookUpdatesImportStatement = () => {
    let hookUpdatesStatement;
    testCase.statements.forEach(statement => {
      if (statement.type === 'hook-updates') {
        hookUpdatesStatement = statement;
        return hookUpdatesStatement;
      }
    });
    testFileCode += `import { renderHook, act } from '@testing-library/react-hooks'
    import ${hookUpdatesStatement.hook} from '../${hookUpdatesStatement.hookFile}.js'; 
    \n`;
  };

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

  // Action Jest test code
  const addAction = action => {
    if (action.eventValue) {
      testFileCode += `fireEvent.${action.eventType}(${action.queryVariant + action.querySelector}
                      ('${action.queryValue}'), { target: { value: ${action.eventValue} } });`;
    } else {
      testFileCode += `fireEvent.${action.eventType}(${action.queryVariant + action.querySelector}
                      ('${action.queryValue}'));`;
    }
  };

  // Assertion Jest test code
  const addAssertion = assertion => {
    testFileCode += `expect(${assertion.queryVariant + assertion.querySelector}
      (${assertion.queryValue})).${assertion.matcherType}(${assertion.matcherValue});`;
  };

  // Render Jest test code
  const addRender = (render, methods) => {
    let props = createRenderProps(render);
    if (render.id === 0) {
      testFileCode += `const {${methods}} = render(<${render.componentName} ${props}/>);`;
    } else {
      testFileCode += `rerender(<${render.componentName} ${props}/>);`;
    }
  };

  // Render Props Jest test code
  const createRenderProps = render => {
    return render.props.reduce((propsCode, prop) => {
      return propsCode + `${prop.propKey}={${prop.propValue}}`;
    }, '');
  };

  // Middleware Jest test code
  const addMiddleware = middleware => {
    testFileCode += `const ${middleware.queryValue} = () => {
      const store = {
          getState: jest.fn(() => ({})),
          dispatch: jest.fn()
      }
      const next = jest.fn()
      const invoke = action => ${middleware.queryType}(store)(next)(action)
      return { store, next, invoke } 
    }`;
    testFileCode += '\n';

    if (middleware.queryValue === 'passes_non_functional_arguments') {
      testFileCode += ` it (${testCase.testStatement}, () => {
         const { next, invoke } = ${middleware.queryValue}()
         const action = {type : 'TEST'}
         invoke(action)
         expect(${middleware.querySelector}).${middleware.queryVariant}(action)`;
    } else if (middleware.queryValue === 'calls_the_function') {
      testFileCode += ` it (${testCase.testStatement}, () => {
           const { invoke } = ${middleware.queryValue}()
           const fn = jest.fn()
           invoke(fn)
           expect(${middleware.querySelector}).${middleware.queryVariant}()`;
    } else if (middleware.queryValue === 'passes_functional_arguments') {
      testFileCode += ` it (${testCase.testStatement}, () => {
           const { store, invoke } = ${middleware.queryValue}()
           invoke((dispatch, getState) => {
             dispatch('Test Dispatch')
             getState()
           })
           expect(${middleware.querySelector}).${middleware.queryVariant}('Test Dispatch')
           expect(${middleware.querySelector}).${middleware.queryVariant}()`;
    }
  };

  // Reducer Jest test code
  const addReducer = reducer => {
    testFileCode += `expect(${reducer.queryValue}(${reducer.querySelector},{${reducer.queryVariant}})).toEqual(${reducer.matcherValue})`;
  };

  // Async AC Jest test code
  const addAsync = async => {
    testFileCode += `const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)`;

    testFileCode += '\n';

    testFileCode += `it('${testCase.testStatement}', () => {
        fetchMock.${async.method}('${async.route}')`;

    testFileCode += '\n';

    testFileCode += `const expectedActions = ${async.expectedResponse};
        const store = mockStore(${async.store})`;

    testFileCode += '\n';

    testFileCode += `return store.dispatch(actions.${async.asyncFunction}()).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })`;
  };

  // Action Creator Jest test code
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

  // Hook: Updates Jest test code
  const addHookUpdates = hookUpdates => {
    testFileCode += `const {result} = renderHook (() => ${hookUpdates.hook}());
    act(() => {
      result.current.${hookUpdates.callbackFunc}();
    });
    expect(result.current.${hookUpdates.managedState}).toBe(${hookUpdates.updatedState})`;
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
