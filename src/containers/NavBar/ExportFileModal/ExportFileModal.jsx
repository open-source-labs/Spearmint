import React, { useState, useContext } from 'react';
import { TestCaseContext } from '../../../context/testCaseReducer';
import { MockDataContext } from '../../../context/mockDataReducer';
import ReactModal from 'react-modal';
import { addMockData } from '../../../context/mockDataActions';

const remote = window.require('electron').remote;
const fs = remote.require('fs');
const path = remote.require('path');
const beautify = remote.require('js-beautify');
const closeIcon = require('../../../assets/images/close-outline.png');

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

  // const fakeTodo = build("Todo").fields({ id: fake(f => f.random.number()), content: fake(f => f.lorem.words()) })();
  const addMockData = () => {
    mockData.forEach(mockDatum => {
      let fieldKeys = createMockDatumFieldKeys(mockDatum);
      testFileCode += `${mockDatum.name} = build('${mockDatum.name}').fields({ `;
    });
  };

  const createMockDatumFieldKeys = mockDatum => {
    mockDatum.fieldKeys.reduce();
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
    if (testCase.hasRerender) methods.add('rerender');
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
    let props = createRenderProps(render);
    if (!render.isRerender) {
      testFileCode += `const { ${methods} } } = 
                      render(<${render.componentName} ${props} />);`;
    } else {
      testFileCode += `rerender(<${render.componentName} ${props} />);`;
    }
  };

  const createRenderProps = render => {
    return render.props.reduce((propsCode, prop) => {
      return propsCode + `${prop.propKey}={${prop.propValue}}`;
    }, '');
  };

  const saveTestFile = () => {
    if (!fs.existsSync(path.join(__dirname, '../__tests__'))) {
      fs.mkdirSync(path.join(__dirname, '../__tests__'));
    }
    fs.writeFile(path.join(__dirname, '../__tests__/beautifytest.js'), testFileCode, err => {
      if (err) throw err;
    });
  };

  const style = { width: '5px', height: '5px' };

  return (
    <ReactModal
      className='Modal'
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='Save testing file'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <h3>Convert to Javascript Code</h3>
      <img src={closeIcon} alt='' style={style} onClick={closeModal} />
      <div>
        <p>File Name</p>
        <input type='text' value={fileName} onChange={handleChangeFileName} />
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleClickSave}>Save</button>
      </div>
    </ReactModal>
  );
};

export default ExportFileModal;
