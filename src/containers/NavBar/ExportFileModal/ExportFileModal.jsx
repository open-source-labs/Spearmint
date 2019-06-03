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
  const testCase = useContext(TestCaseContext);
  const mockData = useContext(MockDataContext);
  let testFileCode = 'import React from "react";';

  const handleChangeFileName = e => {
    setFileName(e.target.value);
  };

  const handleClickSave = () => {
    createTestFile();
    console.log(testFileCode);
  };

  // `test("creates a todo with the text from the input field", () => { const { getByText, getByLabelText, rerender } = render(<App />); const input = getByLabelText("Add new todo:"); const todoBuilder = build("Todo").fields({ id: fake(f => f.random.number()), content: fake(f => f.lorem.words()) }); const fakeTodo = todoBuilder(); fireEvent.change(input, { target: { value: fakeTodo.content } }); fireEvent.click(getByText("Submit")); rerender(<App todos={[fakeTodo]} />); expect(getByText(fakeTodo.content)).toBeInTheDocument;});`,
  const createTestFile = () => {
    createImportStatements();
    testFileCode += beautify(testFileCode, {
      indent_size: 2,
      space_in_empty_paren: true,
    });
  };

  const createImportStatements = () => {
    createComponentImportStatement();
    testFileCode += `import { render, fireEvent } from 'react-testing-library'; import { build, fake } from 'test-data-bot'; import 'react-testing-library/cleanup-after-each';`;
  };

  const createComponentImportStatement = () => {
    const renderStatement = testCase.statements.find(statement => statement.type === 'render');
    const filePath = path.relative(`/__tests__/${fileName}.test.js`, renderStatement.filePath);
    testFileCode += `import ${renderStatement.componentName} from '${filePath}'`;
  };

  const saveTestFile = () => {
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
