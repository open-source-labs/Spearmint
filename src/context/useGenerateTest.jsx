/* eslint-disable */
const { ipcRenderer } = require('electron');
// used to format testFileCode which is a string 
// --> makes sure code is readable 
const beautify = require('js-beautify');

function useGenerateTest(test, projectFilePath) {
  return (testState, mockDataState) => {
    let testFileCode = '';

    /* ------------------------------------------ REACT IMPORT + TEST STATEMENTS ------------------------------------------ */

    // React Import Statements
    const addReactImportStatements = () => {
      testFileCode += `
        import React from 'react';
        import { render, fireEvent } from '@testing-library/react'; 
        import { build, fake } from 'test-data-bot'; 
        import '@testing-library/jest-dom/extend-expect'
        \n`;
    };

    // React Component Import Statement (Render Card)

    const addComponentImportStatement = () => {
      const componentPath = reactTestCase.statements.componentPath;
      let filePath = ipcRenderer.sendSync('Universal.path', projectFilePath, componentPath);
      filePath = filePath.replace(/\\/g, '/');
      const formattedComponentName = reactTestCase.statements.componentName.replace(/\.jsx?/, '');
      testFileCode += `import ${formattedComponentName} from '../${filePath}';`;
    };

    const addDescribeBlocks = () => {
      const describeBlocks = reactTestCase.describeBlocks;

      describeBlocks.allIds.forEach((id) => {
        testFileCode += `describe('${describeBlocks.byId[id].text}', () => {`;
        addReactItStatement(id);
        testFileCode += `}); \n`;
      });
    };

    // React It Statements
    const addReactItStatement = (describeId) => {
      const itStatements = reactTestCase.itStatements;
      itStatements.allIds[describeId].forEach((itId) => {
        testFileCode += `it('${itStatements.byId[itId].text}', () => {`;
        addReactStatements(itId);
        testFileCode += '})\n';
      });
    };

    const addReactStatements = (itId) => {
      const statements = reactTestCase.statements;
      const methods = identifyMethods(itId);
      statements.allIds.forEach((id) => {
        let statement = statements.byId[id];
        if (statement.itId === itId) {
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
        }
      });
    };

    const identifyMethods = (itId) => {
      const methods = new Set([]);
      reactTestCase.statements.allIds.forEach((id) => {
        let statement = reactTestCase.statements.byId[id];
        if (statement.itId === itId) {
          if (statement.type === 'action' || statement.type === 'assertion') {
            methods.add(statement.queryVariant + statement.querySelector);
          }
        }
      });
      return Array.from(methods).join(', ');
    };

    // Render Jest Test Code
    const addRender = (statement, methods) => {
      let props = createRenderProps(statement.props);
      const formattedComponentName = reactTestCase.statements.componentName.replace(/\.jsx?/, '');
      testFileCode += `const {${methods}} = render(<${formattedComponentName} ${props}/>);`;
    };

    // Render Props Jest Test Code
    const createRenderProps = (props) => {
      return props.reduce((acc, prop) => {
        return acc + `${prop.propKey}={${prop.propValue}}`;
      }, '');
    };

    /* ------------------------------------------ REDUX IMPORT + TEST STATEMENTS ------------------------------------------ */

    // Redux Import Statements
    function addReduxImportStatements() {
      reduxTestCase.reduxStatements.forEach((statement) => {
        switch (statement.type) {
          case 'async':
            return (
              addAsyncImportStatement(statement),
              createPathToActions(statement),
              createPathToTypes(statement),
              addAsyncVariables()
            );
          case 'action-creator':
            return (
              addActionCreatorImportStatement(statement),
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
    }

    // Async Import Statements
    function addAsyncImportStatement(async) {
      if (!testFileCode.includes(`import { fake } from 'test-data-bot';`)) {
        testFileCode = `import { fake } from 'test-data-bot';`.concat(testFileCode);
      }
      if (!testFileCode.includes(`import '@testing-library/jest-dom/extend-expect';`)) {
        testFileCode = `import '@testing-library/jest-dom/extend-expect';`.concat(testFileCode);
      }
      if (
        !testFileCode.includes(`import configureMockStore from 'redux-mock-store';
      import thunk from 'redux-thunk';
      import fetchMock from 'fetch-mock';`)
      ) {
        testFileCode = `import configureMockStore from 'redux-mock-store';
      import thunk from 'redux-thunk';
      import fetchMock from 'fetch-mock';`.concat(testFileCode);
      }
    }

    function addAsyncVariables() {
      if (
        !testFileCode.includes(`\n const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);`)
      ) {
        testFileCode = `\n const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);`.concat(testFileCode);
      }
    }

    // AC Import Statements
    function addActionCreatorImportStatement(action) {
      if (!testFileCode.includes(`import { fake } from 'test-data-bot';`) && action.payloadKey) {
        testFileCode = `import { fake } from 'test-data-bot';`.concat(testFileCode);
      }
      if (!testFileCode.includes(`import '@testing-library/jest-dom/extend-expect';`)) {
        testFileCode = `import '@testing-library/jest-dom/extend-expect';`.concat(testFileCode);
      }
    }

    // Reducer Import Statements
    function addReducerImportStatement() {
      // if (!testFileCode.includes(`import { render } from '@testing-library/react';`)) {
      //   testFileCode += `import { render } from '@testing-library/react';`;
      // }
      if (!testFileCode.includes(`import '@testing-library/jest-dom/extend-expect';`)) {
        testFileCode += `import '@testing-library/jest-dom/extend-expect';\n`;
      }
    }

    function addReducerDescribeBlock(reducer) {
      // if (!testFileCode.includes('describe')) {
      // testFileCode += `\n describe('${reducer.reducerName} works properly', () => {
      testFileCode += `let state = ${reducer.initialState};

        beforeEach(() => {
          state = ${reducer.initialState}
        });
        \n`;
    }

    // Middleware Import Statements
    function addMiddlewareImportStatement() {
      if (!testFileCode.includes(`import '@testing-library/jest-dom/extend-expect';`)) {
        testFileCode += `import '@testing-library/jest-dom/extend-expect';`;
      }
    }

    // Redux Test Statements
    function addReduxTestStatements() {
      // if (statement.type === 'aysnc') {
      testFileCode += `\n describe('${reduxTestCase.reduxTestStatement}', () => {`;

      for (let i = 0; i < reduxTestCase.reduxStatements.length; i++) {
        let statement = reduxTestCase.reduxStatements[i];
        if (statement.type === 'reducer') {
          addReducerDescribeBlock(statement);
          break;
        }
      }
      reduxTestCase.reduxStatements.forEach((statement) => {
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
      // testFileCode += '});';
      // testFileCode += '\n';
      if (testFileCode.includes('beforeEach')) {
        testFileCode += '});\n';
      }
    }

    /* ------------------------------------------ HOOKS & CONTEXT IMPORT + TEST STATEMENTS ------------------------------------------ */

    // Hooks & Context Import Statements
    const addHooksImportStatements = () => {
      if (Array.isArray(hooksTestCase)) {
        hooksTestCase.forEach((statement) => {
          switch (statement.type) {
            case 'hooks':
              return addRenderHooksImportStatement(), createPathToHooks(statement);
            default:
              return statement;
          }
        });
      } else if (typeof hooksTestCase === 'object') {
        hooksTestCase.hooksStatements.forEach((statement) => {
          switch (statement.type) {
            case 'hooks':
              return addRenderHooksImportStatement(), createPathToHooks(statement);
            default:
              return statement;
          }
        });
      }
      testFileCode += '\n';
    };

    /*-------------------------------------To deprecate feature, for reference only-------------------------------------------------*/
    // Context Import Statements
    // const addContextImportStatements = () => {
    //   if (!testFileCode.includes(`import '@testing-library/jest-dom/extend-expect'`)) {
    //     testFileCode += `import '@testing-library/jest-dom/extend-expect'`;
    //   }
    //   if (!testFileCode.includes(`import { render } from '@testing-library/react';`)) {
    //     testFileCode += `import { render } from '@testing-library/react';`;
    //   }
    // };

    // Hooks Import Statements
    const addRenderHooksImportStatement = () => {
      if (!testFileCode.includes(`import '@testing-library/jest-dom/extend-expect'`)) {
        testFileCode += `import '@testing-library/jest-dom/extend-expect'`;
      }
      if (
        !testFileCode.includes(
          `import { renderHook, act, cleanup, } from '@testing-library/react-hooks';`
        )
      ) {
        testFileCode += `import { renderHook, act, cleanup, } from '@testing-library/react-hooks';`;
      }
    };

    // Hooks & Context Test Statements
    const addHooksDescribeBlock = () => {
      testFileCode += `\nafterEach(cleanup);\ndescribe('${hooksTestCase.hooksTestStatement}', () => {`;
      if (Array.isArray(hooksTestCase)) {
        hooksTestCase.forEach((statement) => {
          switch (statement.type) {
            case 'hooks':
              return addHookUpdates(statement);
            default:
              return statement;
          }
        });
      } else if (typeof hooksTestCase === 'object') {
        hooksTestCase.hooksStatements.forEach((statement) => {
          switch (statement.type) {
            case 'hooks':
              return addHookUpdates(statement);
            default:
              return statement;
          }
        });
      }

      testFileCode += '});';
      testFileCode += '\n';
    };

    /* ------------------------------------------ ENDPOINT IMPORT + TEST STATEMENTS ------------------------------------------ */

    // adds all your import statements at the top to the preview file
    const addEndpointImportStatements = () => {
      let { serverFilePath, serverFileName, dbFileName, dbFilePath, addDB } = endpointTestCase;
      createPathToEndFiles(serverFilePath, serverFileName, dbFilePath, dbFileName, addDB);
      testFileCode += '\n';
    };

    // adds all the statements from the test blocks and transforms it into code in the preview file
    const addEndpointTestStatements = () => {
      const { endpointStatements } = endpointTestCase;
      endpointStatements.forEach((statement) => {
        switch (statement.type) {
          case 'endpoint':
            return addEndpoint(statement);
          default:
            return statement;
        }
      });
    };

    /* ------------------------------------------ PUPPETEER IMPORT + TEST STATEMENTS ------------------------------------------ */

    /* getLargestContentfulPaint()
        - creating a new PerformanceObserver object which will call the callback function when observed performance events happen
        - setting observer() method to observe the LCP performance entries
     */

    const addLCPfunction = () => {
      testFileCode += `      
          function getLargestContentfulPaint() {
            window.largestContentfulPaint = 0;
        
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              window.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
            });
        
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
        
            document.addEventListener('visibilitychange', () => {
              if (document.visibilityState === 'hidden') {
                  observer.takeRecords();
                  observer.disconnect();
              }
            });
          }`;
    };

    const addPuppeteerImportStatements = () => {
      puppeteerTestCase.puppeteerStatements.forEach((statement) => {
        switch (statement.type) {
          case 'paintTiming':
            testFileCode = `const puppeteer = require('puppeteer');\n`;
            addLCPfunction();
            return;
          default:
            return statement;
        }
      });
      testFileCode += '\n';
    };

    const addPuppeteerTestStatements = () => {
      puppeteerTestCase.puppeteerStatements.forEach((statement) => {
        switch (statement.type) {
          case 'paintTiming':
            return addPuppeteerPaintTiming(statement);
          default:
            return statement;
        }
      });
    };

    /* ------------------------------------------ FILEPATHS ------------------------------------------ */

    // Actions Filepath
    // creates import statement for action creators
    const createPathToActions = (statement) => {
      let filePath = null;
      if (statement.filePath) {
        filePath = ipcRenderer.sendSync('Universal.path', projectFilePath, statement.filePath);
        filePath = filePath.replace(/\\/g, '/');
      }
      if (!testFileCode.includes(`import * as actions from from`) && filePath) {
        testFileCode += `import * as actions from '../${filePath}';`;
      }
    };

    // Reducer Filepath
    function createPathToReducers(statement) {
      let filePath = null;
      if (statement.reducersFilePath) {
        filePath = ipcRenderer.sendSync(
          'Universal.path',
          projectFilePath,
          statement.reducersFilePath
        );
        filePath = filePath.replace(/\\/g, '/');
      }

      if (
        !testFileCode.includes(
          `import {${statement.reducerName}, ${statement.initialState}} from` && filePath
        )
      ) {
        testFileCode += `import  {${statement.reducerName}, ${statement.initialState}} from '../${filePath}';`;
      }
    }


    // Types Filepath
    // Creates the import statment for actionTypes
    function createPathToTypes(statement) {
      let filePath = null;
      let bool = false;
      if (statement.typesFilePath) {
        filePath = ipcRenderer.sendSync(
          'Universal.path',
          projectFilePath,
          statement.typesFilePath
        );
        filePath = filePath.replace(/\\/g, '/');
        bool = areActionTypesDeclaredInSameFileAsActionCreators(statement.typesFilePath);
      }

      if (bool) {
        if (!testFileCode.includes(`import { actionTypes } from `) && filePath) {
          testFileCode += `import { actionTypes } from '../${filePath}';`;
        }
      } else {
        if (!testFileCode.includes(`import * as actionTypes from `) && filePath) {
          testFileCode += `import * as actionTypes from '../${filePath}';`;
        }
      }
    }
    // This function returns true when actiontypes are declared in the same file as the action creators like with this app
    const areActionTypesDeclaredInSameFileAsActionCreators = (file) => {
      const page = ipcRenderer.sendSync('Universal.readFile', file);
      if (page.includes(`export const actionTypes`)) return true;
      else return false;
    };

    // Middleware Filepath
    function createPathToMiddlewares(statement) {
      let filePath = null;
      if (statement.middlewaresFilePath) {
        filePath = ipcRenderer.sendSync(
          'Universal.path',
          projectFilePath,
          statement.middlewaresFilePath
        );
        filePath = filePath.replace(/\\/g, '/');
      }

      if (!testFileCode.includes(`import ${statement.queryType} from `)) {
        testFileCode += `import ${statement.queryType} from '../${filePath}';`;
      }
    }

    // Hooks Filepath
    function createPathToHooks(statement) {
  

      if (Array.isArray(hooksTestCase)) {
        const hookImports = hooksTestCase.reduce((str, { hook }) => {
          str += `${hook}, `;
          return str;
        }, '');

        if (!testFileCode.includes(`import { ${hooksTestCase[0].hook}`) && statement.hookFilePath) {
          let filePath = ipcRenderer.sendSync(
            'Universal.path',
            projectFilePath,
            statement.hookFilePath
          );
          filePath = filePath.replace(/\\/g, '/');

          testFileCode += `import { ${hookImports} } from '../${filePath}';`;
        }

        

      } else if (typeof hooksTestCase === 'object') {
        const hookImports = hooksTestCase.hooksStatements.reduce((str, { hook }) => {
          str += `${hook}, `;

          return str;
        }, '');

        if (
          !testFileCode.includes(`import { ${hooksTestCase.hooksStatements[0].hook}`) &&
          statement.hookFilePath
        ) {
          let filePath = ipcRenderer.sendSync(
            'Universal.path',
            projectFilePath,
            statement.hookFilePath
          );
          filePath = filePath.replace(/\\/g, '/');

          testFileCode += `import { ${hookImports} } from '../${filePath}';`;
        }
      }
    }

    // Context Filepath
    // const createPathToContext = (statement) => {
    //   let filePath = path.relative(projectFilePath, statement.contextFilePath);
    //   filePath = filePath.replace(/\\/g, '/');
    //   if (filePath) {
    //     testFileCode += `import { ${statement.providerComponent}, ${statement.consumerComponent}, ${statement.context} } from '../${filePath}';`;
    //   } else {
    //     testFileCode += '//Please import you context here';
    //   }
    // };

    // Endpoint Filepath: finds the endpoint routes in the project file 
    const createPathToEndFiles = (serverFilePath, serverFileName, dbFileName, dbFilePath, addDB) => {
      // if you input a server file in the server search input box...
      if (serverFilePath) {
        // we send the passed in files to ipcMain channel 'Universal.path', and it returns to us the RELATIVE path of these two files
        let filePath = ipcRenderer.sendSync('Universal.path', projectFilePath, serverFilePath);
        filePath = filePath.replace(/\\/g, '/');
        testFileCode = `const app = require('../${filePath}');
        const supertest = require('supertest')\n;
        import "core-js/stable";
        import "regenerator-runtime/runtime";
        const request = supertest(app)\n`;
      } else testFileCode = 'Please Select A Server!';

      // if you input a db file in the db search input box...
      if (dbFilePath) {
        // we send the passed in files to ipcMain channel 'Universal.path', and it returns to us the RELATIVE path of these two files
        let filePath = ipcRenderer.sendSync('Universal.path', projectFilePath, dbFilePath);
        filePath = filePath.replace(/\\/g, '/');
      
        switch (addDB) {
          case 'PostgreSQL':
            testFileCode += `const pgPoolClient = require('../${filePath}');
            \n afterAll( async () => { await pgPoolClient.end(); \n});`;
            break;
          case 'MongoDB':
            testFileCode += `const client = require('../${filePath}');
            \n afterAll( async () => { await client.close(); \n});`;
            break;
          case 'Mongoose':
            testFileCode += `const mongoose = require('../${filePath}');
            \n afterAll( async () => { await mongoose.connection.close(); \n});`;
            break;
          default:
            return;
        }
      }
    };

    /* ------------------------------------------ MOCK DATA + METHODS ------------------------------------------ */

    const addMockData = () => {
      mockData.forEach((mockDatum) => {
        let fieldKeys = createMockDatumFieldKeys(mockDatum);
        testFileCode += `const mock${
          mockDatum.name.charAt(0).toUpperCase() + mockDatum.name.slice(1)
        } = build('${mockDatum.name}').fields({ ${fieldKeys} })();`;
      });
      testFileCode += '\n';
    };

    const createMockDatumFieldKeys = (mockDatum) => {
      return mockDatum.fieldKeys.reduce((fieldKeysCode, mockDatum) => {
        return (
          fieldKeysCode + `${mockDatum.fieldKey}: fake(f => f.random.${mockDatum.fieldType}()),`
        );
      }, '');
    };

    /* ------------------------------------------ TEST STATEMENTS ------------------------------------------ */

    // Action Jest Test Code
    const addAction = (action,  type = 'react') => {
      if (type === 'react'){
        if (action.eventValue) {
          testFileCode += `fireEvent.${action.eventType}(${action.queryVariant + action.querySelector}
                            (${action.queryValue}), { target: { value: ${action.eventValue} } });`;
        } else {
          testFileCode += `fireEvent.${action.eventType}(${action.queryVariant + action.querySelector}
                            (${action.queryValue}));`;
        }
      }
      else if (type === 'vue'){
        testFileCode += `await wrapper.${action.queryVariant}(${action.queryValue}).trigger('${action.eventType}');`;
      }
      else if (type === 'svelte') {
        if (action.eventValue) {
          testFileCode += `await userEvent.${action.eventType}(screen.${action.queryVariant + action.querySelector}
                            (${action.queryValue}), "${action.eventValue}");`;
        } else {
          testFileCode += `await userEvent.${action.eventType}(screen.${action.querySelector}
                            (${action.queryValue}));`;
        }
      }
    };

    // Assertion Jest Test Code
    const addAssertion = (assertion, type = 'react') => {

      if (type === 'react'){
        testFileCode += `expect(${assertion.queryVariant + assertion.querySelector}
          (${assertion.queryValue})).${assertion.matcherType}(${assertion.matcherValue});`;
      }
      if(type === 'vue'){
        if (assertion.querySelector){
          testFileCode += `expect(wrapper.${assertion.queryVariant}(${assertion.queryValue}).
            ${assertion.querySelector}()).${assertion.matcherType}(${assertion.matcherValue});`;
        }
        else{
          testFileCode += `expect(wrapper.${assertion.queryVariant}(${assertion.queryValue})).
            ${assertion.matcherType}(${assertion.matcherValue});`;
        }
      }
      if (type === 'svelte'){
        testFileCode += `expect(screen.${assertion.queryVariant + assertion.querySelector}
          (${assertion.queryValue})).${assertion.matcherType}(${assertion.matcherValue});`;
      }
    };

    // Middleware Jest Test Code
    const addMiddleware = (middleware) => {
      // testFileCode += `\n it('', () => {
      if (!testFileCode.includes(`const store`)) {
        testFileCode += `\n const createStore = () => {
          const store = {
            getState: jest.fn(() => ({})),
            dispatch: jest.fn()
          }
          const next = jest.fn()
          const invoke = action => ${middleware.queryType}(store)(next)(action)
          return { store, next, invoke } 
        }
        \n`;
      }

      if (middleware.queryValue === 'passes_non_functional_arguments') {
        testFileCode += `\n
        it('${middleware.queryValue}', () => {
          const { next, invoke } = createStore()
          const action = {type : 'TEST'}
          invoke(action)
          expect(${middleware.querySelector}).${middleware.queryVariant}(action)
        })`;
      } else if (middleware.queryValue === 'calls_the_function') {
        testFileCode += `\n it('${middleware.queryValue}', () => {
          const { invoke } = createStore()
          const fn = jest.fn()
          invoke(fn)
          expect(${middleware.querySelector}).${middleware.queryVariant}()
        })`;
      } else if (middleware.queryValue === 'passes_functional_arguments') {
        testFileCode += `\n it('${middleware.queryValue}', () => {
          const { store, invoke } = createStore()
          invoke((dispatch, getState) => {
            dispatch('Test Dispatch')
            getState()
          })
          expect(${middleware.querySelector}).${middleware.queryVariant}('Test Dispatch')
          expect(${middleware.querySelector}).${middleware.queryVariant}()
        })`;
      }
    };

    // Reducer Jest Test Code
    function addReducer(reducer) {
      // pass in reducer to expect. pass in initial state as 1st arg, key
      // if payload exists, add key/value pair to testfile code
      if (reducer.payloadKey) {
        testFileCode += `\n it('${reducer.itStatement}', () => {
        expect(${reducer.reducerName}(state, { type: actionTypes.${reducer.reducerAction}, ${reducer.payloadKey}: ${reducer.payloadValue} })).toEqual({
        ...state, ${reducer.expectedKey}: ${reducer.expectedValue} })
        `;
      } else {
        testFileCode += `\n it('${reducer.itStatement}', () => {
          expect(${reducer.reducerName}(state, { type: actionTypes.${reducer.reducerAction}})).toEqual({
          ...state, ${reducer.expectedKey}: ${reducer.expectedValue} })
          `;
      }
    }

    // Async AC Jest Test Code
    // This function adds a test (or it block) for each async test block
    const addAsync = (async) => {
      let route = '*';
      if (async.route) route = async.route;
      let expectedAction = `const expectedAction = { 
        type: actionTypes.${async.actionType}, 
        payload: ${async.expectedArg} } ;`;
      let args = `${async.expectedArg}`;
      if (async.payloadKey) {
        expectedAction = `const ${async.payloadKey} = fake(f => f.random.${async.payloadType}())
        const expectedAction = { 
          type: actionTypes.${async.actionType}, 
          payload: { ${async.expectedArg}, ${async.payloadKey} }
        };`;
        args = `${async.expectedArg}, ${async.payloadKey}`;
      }
      testFileCode += `it('${async.it}', () => {
        let ${async.expectedArg} = fake(f => f.random.${async.responseType}())
        fetchMock.${async.method}('${route}', { payload: { ${args} } }); 
        ${expectedAction}
        const store = mockStore({});
        return store.dispatch(actions.${async.asyncFunction}(${args})).then(() => {
        expect(store.getActions()[0]).toEqual(expectedAction)
        });
        });
        `;
    };

    // Action Creator Jest Test Code
    const addActionCreator = (actionCreator) => {
      if (actionCreator.payloadKey && actionCreator.payloadType) {
        testFileCode += `it('${actionCreator.it}', () => {const ${actionCreator.payloadKey} = fake(f => f.random.${actionCreator.payloadType}())
          const expectedAction = { 
            type: actionTypes.${actionCreator.actionType}, 
            ${actionCreator.payloadKey}, 
          };
          expect(actions.${actionCreator.actionCreatorFunc}(${actionCreator.payloadKey})).toEqual(expectedAction)});`;
      } else {
        testFileCode += `it('${actionCreator.it}', () => {const expectedAction = { 
            type: actionTypes.${actionCreator.actionType}}; 
          expect(actions.${actionCreator.actionCreatorFunc}()).toEqual(expectedAction)});`;
      }
    };

    // Hook: Updates Jest Test Code
    const addHookUpdates = (hookUpdates) => {
      testFileCode += `test('${hookUpdates.testName}', () => {`;
      testFileCode += `const {result} = renderHook (() => ${hookUpdates.hook}());\n\n`;
      let callbackCodeBlocks = hookUpdates.callbackFunc.reduce((result, callback) => {
        return (result += `\nresult.current.${callback.callbackFunc}();`);
      }, '');
      testFileCode +=
        hookUpdates.callbackFunc.length === 0 ||
        (hookUpdates.callbackFunc.length === 1 &&
          hookUpdates.callbackFunc[0].callbackFunc.length === 0)
          ? ''
          : `act(() => {${callbackCodeBlocks}
        });\n\n`;
      hookUpdates.assertions.forEach((assertion) => {
        testFileCode += `expect(result.current.${assertion.expectedState})${
          assertion.not ? '.not' : ''
        }.${assertion.matcher}(${assertion.expectedValue || ''})\n`;
      });
      testFileCode += '})\n\n';
    };
    /* ------------------Context needs to be integrated with Hooks as business logic------------------- */
    const addEndpoint = (statement) => {
      testFileCode += `\n test('${statement.testName}', async () => {\n const response = await request.${statement.method}('${statement.route}');`;
      testFileCode += statement.postData
        ? `.send( ${statement.postData.trim()})\n.set({'Content-Type': 'application/json',`
        : statement.headers.length
        ? `.set({`
        : '';

      statement.headers.forEach(({ headerName, headerValue }, index) => {
        testFileCode +=
          headerName.length > 0 && headerValue.length > 0
            ? `'${headerName}': '${headerValue}',`
            : '';
      });
      testFileCode += statement.headers.length ? '}); \n' : '';
      statement.assertions.forEach(({ matcher, expectedResponse, not, value }) => {
        matcher = matcher
          .replace(/\(([^)]+)\)/, '')
          .split(' ')
          .join('');
        testFileCode += `\n expect(response.${expectedResponse.toLowerCase()})`;
        testFileCode += not ? `.not.${matcher}(${value});` : `.${matcher}(${value});`;
      });
      testFileCode += '});';
      testFileCode += '\n';
    };

    // Puppeteer Form Jest Test Code
    const addPuppeteerPaintTiming = (statement) => {
      const browserOptions = {};

      if (statement.browserOptions.length > 0) {
        statement.browserOptions.map((option) => {
          if (option.optionValue === 'true') option.optionValue = true;
          else if (option.optionValue === 'false') option.optionValue = false;
          //if optionValue is a stringified number, convert it back to number
          else if (!isNaN(Number(option.optionValue)))
            option.optionValue = Number(option.optionValue);
          browserOptions[option.optionKey] = option.optionValue;
          return option;
        });
      }

      testFileCode += `
          describe('${statement.describe}', () => {
            let paints, lcp;
            beforeAll( async () => {
              let app = '${statement.url}';
              let browser = await puppeteer.launch(${
                statement.browserOptions.length
                  ? JSON.stringify(browserOptions).replace(/"([^"]+)":/g, '$1:')
                  : '{}'
              });
              const page = await browser.newPage();
              await page.target().createCDPSession();
              await page.evaluateOnNewDocument(getLargestContentfulPaint);
              await page.goto(app);
    
              lcp = await page.evaluate(() => window.largestContentfulPaint);
              
              paints = await page.evaluate(_ => {
                const result = {};
                performance.getEntriesByType('paint').map(entry => {
                  result[entry.name] = entry.startTime;
                });
                return result;
              });
              await browser.close();
            })
              
            it('${statement.firstPaintIt}', async () => {
              expect(paints['first-paint']).toBeLessThan(${statement.firstPaintTime})
            })
            it('${statement.FCPIt}', async () => {
              expect(paints['first-contentful-paint']).toBeLessThan(${statement.FCPtTime})
            })
            it('${statement.LCPIt}', async () => {
              expect(paints['first-contentful-paint']).toBeLessThan(${statement.LCPTime})
            })
          });
        `;
    };

    /* ------------------------------------------ ACCESSIBILITY TESTING ------------------------------------------ */

    const addAccImportStatements = () => {
      let { filePath, fileName } = accTestCase;
      filePath = ipcRenderer.sendSync('Universal.path', projectFilePath, filePath);
      filePath = filePath.replace(/\\/g, '/');

      testFileCode += `
        const axe = require('axe-core');
        const regeneratorRuntime = require('regenerator-runtime');`;

      if (accTestCase.testType === 'html') {
        testFileCode += `
        const path = require('path');
        const fs = require('fs');
        
        const html = fs.readFileSync(path.resolve(__dirname,
          '../${filePath}'), 'utf8');`;
      } else if (accTestCase.testType === 'react') {
        testFileCode += `
        import React from 'react';
        import { configure, mount } from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';

        import ${fileName.split('.')[0]} from '../${filePath}';`;
      }
    };

    const addAccDescribeBlocks = () => {
      const { describeBlocks } = accTestCase;

      describeBlocks.allIds.forEach((id) => {
        testFileCode += `

        describe('${describeBlocks.byId[id].text}', () => {`;
        addAccPrint();
        if (accTestCase.testType === 'react') addMount();
        addAccBeforeAll(id);
        addAccItStatements(id);
        testFileCode += `}); \n \n`;
      });
    };

    const addAccPrint = () => {
      testFileCode += `
        const print = (violations) => {
          if (violations.length === 0) {
            console.log('Congrats! Keep up the good work, you have 0 known violations!');
          } else {
            violations.forEach(axeViolation => {
              const whereItFailed = axeViolation.nodes.map(node => node.html);
              // uncomment the line(s) below to see suggestions on how to fix accessibility issues
              // const failureSummary = axeViolation.nodes.map(node => node.failureSummary);
        
              const { description, help, helpUrl } = axeViolation;
      
              console.log('---------',
                '\\nTEST DESCRIPTION: ', description,
                '\\nISSUE: ', help,
                '\\nMORE INFO: ', helpUrl,
                '\\nWHERE IT FAILED: ', whereItFailed,
                // '\\nHOW TO FIX: ', failureSummary
              );
            });
          }
        }
      `;
    };

    const addMount = () => {
      testFileCode += `
        const mountToDoc = (reactElm) => {
          configure({ adapter: new Adapter() });
          if (!document) {
            // Set up a basic DOM
            global.document = jsdom('<!doctype html><html><body></body></html>');
          }
          if (!wrapper) {
            wrapper = document.createElement('main');
            document.body.appendChild(wrapper);
          }
        
          const container = mount(reactElm);
          wrapper.innerHTML = '';
          wrapper.appendChild(container.getDOMNode());
          return container;
        }
      `;
    };

    const addAccBeforeAll = (descId) => {
      const { fileName } = accTestCase;
      testFileCode += `
        let options;`;

      if (accTestCase.testType === 'react') {
        testFileCode += `
          let linkNode;
          let wrapper;`;
      }

      testFileCode += `\n
        beforeAll((done) => {
          // exclude tests that are incompatible
          options = {
            rules: {
              'color-contrast': { enabled: false },
              'link-in-text-block': { enabled: false },
            },`;

      if (accTestCase.describeBlocks.byId[descId].standardTag !== 'none') {
        testFileCode += `
              runOnly: {
                type: 'tag',
                value: ['${accTestCase.describeBlocks.byId[descId].standardTag}']
            }`;
      }

      testFileCode += `
          };
        `;

      if (accTestCase.testType === 'html') {
        testFileCode += `
          // get language tag from imported html file and assign to jsdom document
          const langTag = html.match(/<html lang="(.*)"/);
          if (langTag) document.documentElement.lang = langTag[1];
          document.documentElement.innerHTML = html.toString();
        `;
      } else if (accTestCase.testType === 'react') {
        testFileCode += `
        const linkComponent = mountToDoc(
          < ${fileName.split('.')[0]} />
        );
        linkNode = linkComponent.getDOMNode();
        `;
      }

      testFileCode += `
          done();
        });
      `;
    };

    const addAccItStatements = (descId) => {
      const { itStatements } = accTestCase;

      itStatements.allIds[descId].forEach((itId) => {
        testFileCode += `
          it('${itStatements.byId[itId].text}', (done) => {`;

        if (itStatements.byId[itId].catTag !== 'none') {
          testFileCode += `  
            options.runOnly.value.push('cat.${itStatements.byId[itId].catTag}')`;
        }

        if (accTestCase.testType === 'react') {
          testFileCode += `
            axe.run(linkNode, options, async (err, results) => {`;
        } else {
          testFileCode += `
            axe.run(options, async (err, results) => {`;
        }

        testFileCode += `
            if (err) {
              console.log('err: ', err);
              done();
            }

            print(results.violations);      
      
            expect(err).toBe(null);
            expect(results.violations).toHaveLength(0);
            done();
          });
        })
      `;
      });
    };

    const addAccPuppeteer = () => {
      testFileCode += `
        const puppeteer = require('puppeteer');
        const axeCore = require('axe-core');
        const { parse: parseURL } = require('url');
        const assert = require('assert');

        // Cheap URL validation
        const isValidURL = input => {
          const u = parseURL(input);
          return u.protocol && u.host;
        };

        // node axe-puppeteer.js <url>
        const url = process.argv[2];
        assert(isValidURL(url), 'Invalid URL');

        const main = async url => {
          let browser;
          let results;
          try {
            // Setup Puppeteer
            browser = await puppeteer.launch();

            // Get new page
            const page = await browser.newPage();
            await page.goto(url);

            // Inject and run axe-core
            const handle = await page.evaluateHandle(\`
              // Inject axe source code
              \${axeCore.source}
              // Run axe
              axe.run();
            \`);

            // Get the results from 'axe.run()'.
            results = await handle.jsonValue();
            // Destroy the handle & return axe results.
            await handle.dispose();
          } catch (err) {
            // Ensure we close the puppeteer connection when possible
            if (browser) {
              await browser.close();
            }

            // Re-throw
            throw err;
          }

          // test violations
          results = results.violations;
          console.log('--------------violations length: ', results.length);

          await browser.close();
          return results;
        };

        main(url)
          .then(results => {
            // console.log(results);
            const violations = results;
            violations.forEach(axeViolation => {
              const whereItFailed = axeViolation.nodes.map(node => node.html);
              // uncomment the line(s) below to see suggestions on how to fix accessibility issues
              // const failureSummary = axeViolation.nodes.map(node => node.failureSummary);

              const { description, help, helpUrl } = axeViolation;

              console.log(
                '---------',
                '\\nTEST DESCRIPTION: ',
                description,
                '\\nISSUE: ',
                help,
                '\\nMORE INFO: ',
                helpUrl,
                '\\nWHERE IT FAILED: ',
                whereItFailed
                // '\\nHOW TO FIX: ', failureSummary
              );
            });
          })
          .catch(err => {
            console.error('Error running axe-core:', err.message);
            process.exit(1);
          });
        `;
    };

    // --------------------------------- Vue Test --------------------------------------------------

    const addVueImportStatements = () => {
      testFileCode += `
        import { mount } from '@vue/test-utils';
        \n`;
    };


    const addVueComponentImportStatement = () => {
      const componentPath = vueTestCase.statements.componentPath;
      let filePath = ipcRenderer.sendSync('Universal.path', projectFilePath, componentPath);
      filePath = filePath.replace(/\\/g, '/');
      const formattedComponentName = vueTestCase.statements.componentName.replace(/\.vue?/, '');
      testFileCode += `import ${formattedComponentName} from '../${filePath}';`;
    };

    const addVueDescribeBlocks = () => {
      const describeBlocks = vueTestCase.describeBlocks;

      describeBlocks.allIds.forEach((id) => {
        testFileCode += `describe('${describeBlocks.byId[id].text}', () => {`;
        addVueItStatement(id);
        testFileCode += `}); \n`;
      });
    };
    
    const addVueItStatement = (describeId) => {
      const itStatements = vueTestCase.itStatements;
      itStatements.allIds[describeId].forEach((itId) => {
        testFileCode += `it('${itStatements.byId[itId].text}', async () => {`;
        addVueStatements(itId);
        testFileCode += '})\n';
      });
    };

    const addVueStatements = (itId) => {
      const statements = vueTestCase.statements;
      const methods = identifyVueMethods(itId);
      statements.allIds.forEach((id) => {
        let statement = statements.byId[id];
        if (statement.itId === itId) {
          switch (statement.type) {
            case 'action':
              return addAction(statement, 'vue');
            case 'assertion':
              return addAssertion(statement, 'vue');
            case 'render':
              return addVueRender(statement, methods);
            default:
              return statement;
          }
        }
      });
    };

    const identifyVueMethods = (itId) => {
      const methods = new Set([]);
      vueTestCase.statements.allIds.forEach((id) => {
        let statement = vueTestCase.statements.byId[id];
        if (statement.itId === itId) {
          if (statement.type === 'action' || statement.type === 'assertion') {
            methods.add(statement.queryVariant + statement.querySelector);
          }
        }
      });
      return Array.from(methods).join(', ');
    };

    const addVueRender = (statement, methods) => {
      let props = createVueRenderProps(statement.props);
      const formattedComponentName = vueTestCase.statements.componentName.replace(/\.vue?/, '');
      // change to VUE files
      testFileCode += `const wrapper = mount(${formattedComponentName}, {props: {${props}}});`;
    };

    const createVueRenderProps = (props) => {
      return props.reduce((acc, prop) => {
        return acc + `${prop.propKey}='${prop.propValue}',`;
      }, '');
    };

    //-----------------------------------------Svelte Test---------------------------------------------------------------
     // Svelte Import Statements
     const addSvelteImportStatements = () => {
      testFileCode += `
        import { render, screen, waitFor } from '@testing-library/svelte'; 
        import userEvent from '@testing-library/user-event'; 
        import { setupServer } from 'msw/node';
        import { rest } from 'msw';
        \n`;
    };

    const addSvelteComponentImportStatement = () => {
      const componentPath = svelteTestCase.statements.componentPath;
      let filePath = ipcRenderer.sendSync('Universal.path', projectFilePath, componentPath);
      filePath = filePath.replace(/\\/g, '/');
      const formattedComponentName = svelteTestCase.statements.componentName.replace(/\.svelte?/, '');
      testFileCode += `import ${formattedComponentName} from '../${filePath}';`;
    };


    const addSvelteDescribeBlocks = () => {
      const describeBlocks = svelteTestCase.describeBlocks;

      describeBlocks.allIds.forEach((id) => {
        testFileCode += `describe('${describeBlocks.byId[id].text}', () => {`;
        addSvelteItStatement(id);
        testFileCode += `}); \n`;
      });
    };
    
        
    const addSvelteItStatement = (describeId) => {
      const itStatements = svelteTestCase.itStatements;
      itStatements.allIds[describeId].forEach((itId) => {
        testFileCode += `it('${itStatements.byId[itId].text}', async () => {`;
        addSvelteStatements(itId);
        testFileCode += '})\n';
      });
    };

    const addSvelteStatements = (itId) => {
      const statements = svelteTestCase.statements;
      const methods = identifySvelteMethods(itId);
      statements.allIds.forEach((id) => {
        let statement = statements.byId[id];
        if (statement.itId === itId) {
          switch (statement.type) {
            case 'action':
              return addAction(statement, 'svelte');
            case 'assertion':
              return addAssertion(statement, 'svelte');
            case 'render':
              return addSvelteRender(statement, methods);
            default:
              return statement;
          }
        }
      });
    };

    const identifySvelteMethods = (itId) => {
      const methods = new Set([]);
      svelteTestCase.statements.allIds.forEach((id) => {
        let statement = svelteTestCase.statements.byId[id];
        if (statement.itId === itId) {
          if (statement.type === 'action' || statement.type === 'assertion') {
            methods.add(statement.queryVariant + statement.querySelector);
          }
        }
      });
      return Array.from(methods).join(', ');
    };

    const addSvelteRender = (statement, methods) => {
      let props = createSvelteRenderProps(statement.props);
      const formattedComponentName = svelteTestCase.statements.componentName.replace(/\.svelte?/, '');
      // change to Svelte files ** NEED CORRECT FORMATTING **
      testFileCode += `render(${formattedComponentName});`;
    };

    const createSvelteRenderProps = (props) => {
      return props.reduce((acc, prop) => {
        return acc + `${prop.propKey}='${prop.propValue}',`;
      }, '');
    };


    // ------------------------------------ switch statement on test type -------------------------

    switch (test) {
      case 'acc':
        var accTestCase = testState;
        if (accTestCase.testType === 'puppeteer') {
          return (
            addAccPuppeteer(),
            (testFileCode = beautify(testFileCode, {
              indent_size: 2,
              space_in_empty_paren: true,
              e4x: true,
            }))
          );
        } else {
          return (
            addAccImportStatements(),
            addAccDescribeBlocks(),
            (testFileCode = beautify(testFileCode, {
              indent_size: 2,
              space_in_empty_paren: true,
              e4x: true,
            }))
          );
        }

      case 'react':
        var reactTestCase = testState;
        var mockData = mockDataState;
        return (
          addComponentImportStatement(),
          addReactImportStatements(),
          addMockData(),
          addDescribeBlocks(),
          (testFileCode = beautify(testFileCode, {
            brace_style: 'collapse, preserve-inline',
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );

      case 'vue':
        var vueTestCase = testState;
        var mockData = mockDataState;
        return (
          addVueComponentImportStatement(),
          addVueImportStatements(),
          addMockData(),
          addVueDescribeBlocks(),
          (testFileCode = beautify(testFileCode, {
            brace_style: 'collapse, preserve-inline',
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );
      //---------------------------------------------------Svelte switch statement---------------------------------------------
      case 'svelte':
        var svelteTestCase = testState;
        var mockData = mockDataState;
        return (
          addSvelteComponentImportStatement(),
          addSvelteImportStatements(),
          addMockData(),
          addSvelteDescribeBlocks(),
          (testFileCode = beautify(testFileCode, {
            brace_style: 'collapse, preserve-inline',
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );
        
      case 'redux':
        var reduxTestCase = testState;
        return (
          addReduxImportStatements(),
          addReduxTestStatements(),
          (testFileCode += `});`),
          (testFileCode = beautify(testFileCode, {
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );
      case 'hooks':
        var hooksTestCase = testState;
        return (
          addHooksImportStatements(),
          addHooksDescribeBlock(),
          (testFileCode = beautify(testFileCode, {
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );
      // case was "endpoint test" but that is not the case being dispatched by the frontend
      case 'endpoint':
        var endpointTestCase = testState;
        return (
          addEndpointImportStatements(),
          addEndpointTestStatements(),
          (testFileCode = beautify(testFileCode, {
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );
      case 'puppeteer':
        var puppeteerTestCase = testState;
        return (
          addPuppeteerImportStatements(),
          addPuppeteerTestStatements(),
          (testFileCode = beautify(testFileCode, {
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );

      default:
        return 'not a test';
    }
  };
}

export default useGenerateTest;
