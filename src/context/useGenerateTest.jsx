/* eslint-disable */
const remote = window.require('electron').remote;
const fs = remote.require('fs');
const path = remote.require('path');
const beautify = remote.require('js-beautify');

function useGenerateTest(test, projectFilePath) {
  return (testState, mockDataState) => {
    let testFileCode = '';
    // import React from "react";
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
      const componentPath = reactTestCase.statements.componentPath;
      let filePath = path.relative(projectFilePath, componentPath);
      filePath = filePath.replace(/\\/g, '/');
      testFileCode += `import ${reactTestCase.statements.componentName} from '../${filePath}';`;
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
      testFileCode += `const {${methods}} = render(<${reactTestCase.statements.componentName} ${props}/>);`;
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
      hooksTestCase.hooksStatements.forEach((statement) => {
        switch (statement.type) {
          case 'hooks':
            return addRenderHooksImportStatement(), createPathToHooks(statement);
          default:
            return statement;
        }
      });
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
      hooksTestCase.hooksStatements.forEach((statement) => {
        switch (statement.type) {
          case 'hooks':
            return addHookUpdates(statement);
          default:
            return statement;
        }
      });
      testFileCode += '});';
      testFileCode += '\n';
    };

    /* ------------------------------------------ ENDPOINT IMPORT + TEST STATEMENTS ------------------------------------------ */

    // Endpoint Import Statements
    const addEndpointImportStatements = () => {
      let { serverFilePath, dbFilePath, addDB } = endpointTestCase;
      createPathToEndFiles(serverFilePath, dbFilePath, addDB);
      testFileCode += '\n';
    };

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
            testFileCode = `import puppeteer from 'puppeteer';\n`;
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
        filePath = path.relative(projectFilePath, statement.filePath);
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
        filePath = path.relative(projectFilePath, statement.reducersFilePath);
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
        filePath = path.relative(projectFilePath, statement.typesFilePath);
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
      const page = fs.readFileSync(file);
      if (page.includes(`export const actionTypes`)) return true;
      else return false;
    };

    // Middleware Filepath
    function createPathToMiddlewares(statement) {
      let filePath = null;
      console.log(filePath);
      if (statement.middlewaresFilePath) {
        filePath = path.relative(projectFilePath, statement.middlewaresFilePath);
        filePath = filePath.replace(/\\/g, '/');
      }

      if (!testFileCode.includes(`import ${statement.queryType} from `)) {
        testFileCode += `import ${statement.queryType} from '../${filePath}';`;
      }
    }

    // Hooks Filepath
    function createPathToHooks(statement) {
      // let hooksArr = [];
      // hooksTestCase.hooksStatements.forEach(({ hook }) => {
      //   hooksArr.push(hook);
      // });
      // let hookImports = hooksArr.reduce((str, curr) => {
      //   str += `${curr}, `;
      //   return str;
      // }, '');
      const { hooksStatements } = hooksTestCase;
      const hookImports = hooksStatements.reduce((str, { hook }) => {
        str += `${hook}, `;
        return str;
      }, '');
      if (!testFileCode.includes(`import { ${hooksStatements[0].hook}`) && statement.hookFilePath) {
        let filePath = path.relative(projectFilePath, statement.hookFilePath);
        filePath = filePath.replace(/\\/g, '/');

        testFileCode += `import { ${hookImports} } from '../${filePath}';`;
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

    // Endpoint Filepath
    const createPathToEndFiles = (serverFilePath, dbFilePath, addDB) => {
      if (serverFilePath) {
        let filePath = path.relative(projectFilePath, serverFilePath);
        filePath = filePath.replace(/\\/g, '/');
        testFileCode = `const app = require('../${filePath}');
      const supertest = require('supertest')
      const request = supertest(app)\n`;
      } else testFileCode = 'Please Select A Server!';
      if (dbFilePath) {
        let filePath = path.relative(projectFilePath, dbFilePath);
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
    const addAction = (action) => {
      if (action.eventValue) {
        testFileCode += `fireEvent.${action.eventType}(${action.queryVariant + action.querySelector}
                          ('${action.queryValue}'), { target: { value: ${action.eventValue} } });`;
      } else {
        testFileCode += `fireEvent.${action.eventType}(${action.queryVariant + action.querySelector}
                          ('${action.queryValue}'));`;
      }
    };

    // Assertion Jest Test Code
    const addAssertion = (assertion) => {
      testFileCode += `expect(${assertion.queryVariant + assertion.querySelector}
          (${assertion.queryValue})).${assertion.matcherType}(${assertion.matcherValue});`;
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
    // // Context Jest Test Code
    // const addContext = (context) => {
    //   testFileCode += `test('${context.testName}', () => {`;
    //   if (context.queryValue === 'shows_default_value') {
    //     testFileCode += `const mockValue = {Data: '${context.values}'}
    //       const { ${context.querySelector} } = render(<${context.consumerComponent}/>)
    //       expect(${context.querySelector}(mockValue.Data)).${context.queryVariant}('${context.values}')`;
    //   }
    //   if (context.queryValue === 'shows_value_from_provider') {
    //     testFileCode += `const mockValue = {Data: '${context.values}'}
    //       const { ${context.querySelector} } = render (
    //         <${context.context}.Provider value={mockValue}>
    //           <${context.consumerComponent}/>
    //         </${context.context}.Provider>
    //       )
    //       expect(${context.querySelector}(mockValue.Data)).${context.queryVariant}('${context.values}')`;
    //   }
    //   if (context.queryValue === 'component_provides_context_value') {
    //     testFileCode += `const mockValue = {Data: '${context.values}'}
    //       const { ${context.querySelector} } = render (
    //         <${context.providerComponent} value={mockValue}>
    //           <${context.context}.Consumer>
    //           {value => <span>Recieved: {value} </span>}
    //           <${context.context}.Consumer/>
    //         </${context.providerComponent}>
    //       )
    //       expect(${context.querySelector}(/^Recieved:/).textContent).${context.queryVariant}('${context.values}')`;
    //   }
    //   if (context.queryValue === 'renders_providers_+_consumers_normally') {
    //     testFileCode += `const mockValue = {Data: '${context.values}'}
    //       const { ${context.querySelector} } = render (
    //         <${context.providerComponent} value={mockValue}>
    //           <${context.consumerComponent}/>
    //         </${context.providerComponent}>
    //       )
    //       expect(${context.querySelector}(mockValue.Data).textContent).${context.queryVariant}('${context.values}')`;
    //   }
    //   testFileCode += '})\n\n';
    // };

    // // Endpoint Jest Test Code
    const addEndpoint = (statement) => {
      testFileCode += `\n test('${statement.testName}', async () => {\n const response = await request.${statement.method}('${statement.route}')`;
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
        testFileCode += `expect(response.${expectedResponse.toLowerCase()})`;
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
      let { filePath } = accTestCase.statements;
      filePath = path.relative(projectFilePath, filePath);
      filePath = filePath.replace(/\\/g, '/');

      // testFileCode += JSON.stringify(accTestCase);

      testFileCode += `
        const axe = require('axe-core');
        const regeneratorRuntime = require('regenerator-runtime');
        const path = require('path');
        const fs = require('fs');
        
        const html = fs.readFileSync(path.resolve(__dirname,
          '../${filePath}'), 'utf8');
        
      `;
    };

    const addAccDescribeBlocks = () => {
      const { describeBlocks } = accTestCase;

      describeBlocks.allIds.forEach((id) => {
        testFileCode += `describe('${describeBlocks.byId[id].text}', () => {`;
        addAccItStatements(id);
        testFileCode += `}); \n`;
      });
    };

    const addAccItStatements = (descId) => {
      const { itStatements } = accTestCase;
      
      itStatements.allIds.forEach((itId) => {
        if (itStatements.byId[itId].describeId === descId) {
          testFileCode += `it('${itStatements.byId[itId].text}', (done) => {
          // exclude tests that are incompatible
            const config = {
              rules: {
                'color-contrast': { enabled: false },
                'link-in-text-block': { enabled: false }
              }
            };
        
            // get language tag from imported html file and assign to jsdom document
            const langTag = html.match(/<html lang="(.*)"/);
            if (langTag) document.documentElement.lang = langTag[1];
            document.documentElement.innerHTML = html.toString();
        
            axe.run(config, async (err, { violations }) => {
              if (err) {
                console.log('err: ', err);
                done();
              }
        
              if (violations.length === 0) {
                console.log('Congrats! Keep up the good work, you have 0 known violations!');
              } else {
                violations.forEach(axeViolation => {
                  const whereItFailed = axeViolation.nodes.map(node => node.html);
                  // const failureSummary = axeViolation.nodes.map(node => node.failureSummary);
            
                  const { description, help, helpUrl } = axeViolation;
        
                  console.log('---------',
                    '\\nTEST DESCRIPTION: ', description,
                    '\\nISSUE: ', help,
                    '\\nMORE INFO: ', helpUrl,
                    '\\nWHERE IT FAILED: ', whereItFailed,
                    // '\\nhow to fix: ', failureSummary
                  );
                });
              }
        
              expect(err).toBe(null);
              expect(violations).toHaveLength(0);
              done();
            });
          })`;
        }
        testFileCode += '\n';
      });
    };

    switch (test) {
      case 'acc':
        var accTestCase = testState;
        return (
          addAccImportStatements(),
          addAccDescribeBlocks(),
          (testFileCode = beautify(testFileCode, {
            indent_size: 2,
            space_in_empty_paren: true,
            e4x: true,
          }))
        );
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
