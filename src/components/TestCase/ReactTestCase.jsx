import React, { useContext, useReducer } from 'react';
import cn from 'classnames';
import styles from './TestCase.module.scss';
import {
  updateDescribeText,
  updateRenderComponent,
  updateItStatementText,
} from '../../context/actions/reactTestCaseActions';
import { createFile } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { createMockData } from '../../context/actions/mockDataActions';
import ReactTestMenu from '../TestMenu/ReactTestMenu';
import MockData from '../MockData/MockData';
import DecribeRenderer from '../DescribeRenderer/DescribeRenderer';
import ReactHelpModal from '../TestHelpModals/ReactHelpModal';

//changes to pull down context
import {
  ReactTestCaseContext,
  reactTestCaseState,
  reactTestCaseReducer,
} from '../../context/reducers/reactTestCaseReducer';
//
const remote = window.require('electron').remote;
const path = remote.require('path');
const beautify = remote.require('js-beautify');

const ReactTestCase = () => {
  //changes to pull down context
  const [reactTestCase, dispatchToReactTestCase] = useReducer(
    reactTestCaseReducer,
    reactTestCaseState
  );
  //
  const { describeBlocks, itStatements, statements, modalOpen } = reactTestCase;
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [{ filePathMap, projectFilePath }, dispatchToGlobal] = useContext(GlobalContext);
  const draggableStatements = describeBlocks.allIds;

  const handleAddMockData = () => {
    dispatchToMockData(createMockData());
  };

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToReactTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToReactTestCase(updateItStatementText(text, itId));
  };

  let testFileCode = 'import React from "react";';

  const generatReactFile = () => {
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
  };

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
      return fieldKeysCode + `${mockDatum.fieldKey}: fake(f => f.random.${mockDatum.fieldType}()),`;
    }, '');
  };

  // React Import Statements
  const addReactImportStatements = () => {
    testFileCode += `import { render, fireEvent } from '@testing-library/react'; 
    import { build, fake } from 'test-data-bot'; 
    import '@testing-library/jest-dom/extend-expect'
    \n`;
  };

  // React Component Import Statement (Render Card)
  const addComponentImportStatement = () => {
    const componentPath = statements.componentPath;
    let filePath = path.relative(projectFilePath, componentPath);
    filePath = filePath.replace(/\\/g, '/');
    testFileCode += `import ${statements.componentName} from '../${filePath}';`;
  };

  const addDescribeBlocks = () => {
    describeBlocks.allIds.forEach((id) => {
      testFileCode += `describe('${describeBlocks.byId[id].text}', () => {`;
      addReactItStatement(id);
      testFileCode += `}); \n`;
    });
  };

  // React It Statements
  const addReactItStatement = (describeId) => {
    itStatements.allIds.forEach((itId) => {
      if (itStatements.byId[itId].describeId === describeId) {
        testFileCode += `it('${itStatements.byId[itId].text}', () => {`;
        addReactStatements(itId);
        testFileCode += '})';
      }
      testFileCode += '\n';
    });
  };

  const addReactStatements = (itId) => {
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
    statements.allIds.forEach((id) => {
      let statement = statements.byId[id];
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
    testFileCode += `const {${methods}} = render(<${statements.componentName} ${props}/>);`;
  };

  // Render Props Jest Test Code
  const createRenderProps = (props) => {
    return props.reduce((acc, prop) => {
      return acc + `${prop.propKey}={${prop.propValue}}`;
    }, '');
  };

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

  const fileHandle = () => {
    dispatchToGlobal(createFile(generatReactFile()));
  };

  return (
    <ReactTestCaseContext.Provider value={[reactTestCase, dispatchToReactTestCase]}>
      <div id={styles.ReactTestCase}>
        <div id='head'>
          <ReactTestMenu
            dispatchToTestCase={dispatchToReactTestCase}
            dispatchToMockData={dispatchToMockData}
          />
        </div>
        {modalOpen ? <ReactHelpModal /> : null}
        <button onClick={fileHandle}>save me</button>
        <div className={styles.header}>
          <div className={styles.renderComponent}>
            <span className={styles.renderLabel}>Enter Component Name:</span>
            <SearchInput
              reactTestCase
              dispatch={dispatchToReactTestCase}
              action={updateRenderComponent}
              filePathMap={filePathMap}
              options={Object.keys(filePathMap)}
            />
          </div>
          <button type='button' className={styles.mockBtn} onClick={handleAddMockData}>
            <i className={cn(styles.addIcon, 'fas fa-plus')} />
            Mock Data
          </button>
        </div>
        {mockData.length > 0 && (
          <section id={styles.mockDataHeader}>
            {mockData.map((data) => {
              return (
                <MockData
                  key={data.id}
                  mockDatumId={data.id}
                  dispatchToMockData={dispatchToMockData}
                  fieldKeys={data.fieldKeys}
                />
              );
            })}
          </section>
        )}
        <DecribeRenderer
          dispatcher={dispatchToReactTestCase}
          draggableStatements={draggableStatements}
          describeBlocks={describeBlocks}
          itStatements={itStatements}
          statements={statements}
          handleChangeDescribeText={handleChangeDescribeText}
          handleChangeItStatementText={handleChangeItStatementText}
          type='react'
        />
      </div>
    </ReactTestCaseContext.Provider>
  );
};
export default ReactTestCase;
