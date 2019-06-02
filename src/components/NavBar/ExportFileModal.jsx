import React, { useState, useContext } from "react";
import { TestCaseContext } from "../../context/testCaseReducer";
import { MockDataContext } from "../../context/mockDataReducer";
import ReactModal from "react-modal";

const remote = window.require("electron").remote;
const fs = remote.require("fs");
const path = remote.require("path");
const beautify = remote.require("js-beautify");
const closeIcon = require("../../assets/images/close-outline.png");

const ExportFileModal = ({ isModalOpen, closeModal }) => {
  const [fileName, setFileName] = useState("");
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
      space_in_empty_paren: true
    });
  };

  const createImportStatements = () => {
    createComponentImportStatement();
    testFileCode += `import { render, fireEvent } from 'react-testing-library'; import { build, fake } from 'test-data-bot'; import 'react-testing-library/cleanup-after-each';`;
  };

  const createComponentImportStatement = () => {
    const renderStatement = testCase.statements.find(
      statement => statement.type === "render"
    );
    const filePath = path.relative(
      `/__tests__/${fileName}.test.js`,
      renderStatement.filePath
    );
    testFileCode += `import ${
      renderStatement.componentName
    } from '${filePath}'`;
  };

  const saveTestFile = () => {
    if (!fs.existsSync(path.join(__dirname, "../__tests__"))) {
      fs.mkdirSync(path.join(__dirname, "../__tests__"));
    }
    fs.writeFile(
      path.join(__dirname, "../__tests__/beautifytest.js"),
      testFileCode,
      err => {
        if (err) throw err;
      }
    );
  };

  const style = { width: "5px", height: "5px" };

  return (
    <ReactModal
      className="Modal"
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Save testing file"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <h3>Convert to Javascript Code</h3>
      <img src={closeIcon} alt="" style={style} onClick={closeModal} />
      <div>
        <p>File Name</p>
        <input type="text" value={fileName} onChange={handleChangeFileName} />
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleClickSave}>Save</button>
      </div>
    </ReactModal>
  );
};

export default ExportFileModal;
