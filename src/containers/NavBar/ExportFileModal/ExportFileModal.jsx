import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { MockDataContext } from '../../../context/mockDataReducer';
import styles from './ExportFileModal.module.scss';

const remote = window.require('electron').remote;
const fs = remote.require('fs');
const path = remote.require('path');
const beautify = remote.require('js-beautify');

const ExportFileModal = ({ isModalOpen, closeModal }) => {
  const [fileName, setFileName] = useState('');
  const [testCase, _] = useContext(TestCaseContext);
  const [{ mockData }, __] = useContext(MockDataContext);
  let testFileCode = 'import React from "react";';

  const handleChangeFileName = e => {
    setFileName(e.target.value);
  };

  const handleClickSave = () => {
    generateTestFile();
    console.log(testFileCode);
    exportTestFile();
  };

  const generateTestFile = () => {
    addImportStatements();
    addMockData();
    addTestStatements();
    testFileCode += beautify(testFileCode, {
      indent_size: 2,
      space_in_empty_paren: true,
    });
  };

  const addImportStatements = () => {
    addComponentImportStatement();
    testFileCode += `import { render, fireEvent } from 'react-testing-library'; 
    import { build, fake } from 'test-data-bot'; 
    import 'react-testing-library/cleanup-after-each';`;
  };

  const addComponentImportStatement = () => {
    const renderStatement = testCase.statements.find(statement => statement.type === 'render');
    const filePath = path.relative(`/__tests__/${fileName}.test.js`, renderStatement.filePath);
    testFileCode += `import ${renderStatement.componentName} from '${filePath}'`;
  };

  const addMockData = () => {
    mockData.forEach(mockDatum => {
      let fieldKeys = createMockDatumFieldKeys(mockDatum);
      testFileCode += `mock${mockDatum.name} = build('${
        mockDatum.name
      }').fields({ ${fieldKeys} })();`;
    });
  };

  const createMockDatumFieldKeys = mockDatum => {
    return mockDatum.fieldKeys.reduce((fieldKeysCode, mockDatum) => {
      return fieldKeysCode + `${mockDatum.fieldKey}: fake(f => f.random.${mockDatum.fieldType}()),`;
    }, '');
  };

  const addTestStatements = () => {
    testFileCode += `test(${testCase.testStatement}), () => {`;
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
  };

  const identifyMethods = () => {
    const methods = new Set([]);
    testCase.statements.reduce(statement => {
      if (statement === 'action' || statement === 'assertion') {
        methods.add(statement.queryVariant + statement.querySelector);
      }
    });
    // if (testCase.hasRerender) methods.add('rerender');
    return Array.from(methods).join();
  };

  const addAction = action => {
    if (action.event.value) {
      testFileCode += `fireEvent.${action.event.type}(${action.queryVariant + action.querySelector}
                      (${action.queryValue}), { target: { value: ${action.event.value} } });`;
    } else {
      testFileCode += `fireEvent.${action.event.type}(${action.queryVariant + action.querySelector}
                      (${action.queryValue}));`;
    }
  };

  const addAssertion = assertion => {
    testFileCode += `expect(${assertion.queryVariant + assertion.querySelector}
                    (${assertion.assertionValue})).${assertion.matcher}(${assertion.matcherValue})`;
  };

  const addRender = (render, methods) => {
    // let props = createRenderProps(render);
    // if (!render.isRerender) {
    //   testFileCode += `const { ${methods} } } =
    //                   render(<${render.componentName} ${props} />);`;
    // } else {
    //   testFileCode += `rerender(<${render.componentName} ${props} />);`;
    // }
  };

  const createRenderProps = render => {
    return render.props.reduce((propsCode, prop) => {
      return propsCode + `${prop.propKey}={${prop.propValue}}`;
    }, '');
  };

  const exportTestFile = () => {
    if (!fs.existsSync(path.join(__dirname, '../__tests__'))) {
      fs.mkdirSync(path.join(__dirname, '../__tests__'));
    }
    fs.writeFile(path.join(__dirname, '../__tests__/beautifytest.js'), testFileCode, err => {
      if (err) throw err;
    });
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='Save testing file'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div id={styles.title}>
        <p>Convert to Javascript Code</p>
        <svg id={styles.close} onClick={closeModal}>
          <path d='M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z' />
        </svg>
      </div>
      <div id={styles.body}>
        <p>File Name</p>
        <input type='text' value={fileName} onChange={handleChangeFileName} />
        <button id={styles.save} onClick={handleClickSave}>
          Save
        </button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </ReactModal>
  );
};

export default ExportFileModal;
