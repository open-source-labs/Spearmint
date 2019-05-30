import React, { useState, useContext } from 'react'
import { testCaseContext } from '../../context/testCaseReducer'
import { mockDataContext } from '../../context/mockDataReducer'
import { create } from 'domain'

const remote = window.require('electron').remote
const fs = remote.require('fs')
const path = remote.require('path')
const beautify = remote.require('beautify')

const ExportFileModal = () => {
  const [testFileCode, setTestFileCode] = useState('import React from "react";')
  const testCase = useContext(testCaseContext)
  const mockData = useContext(mockDataContext)

  const handleClickExport = () => {
    createTestFile()
  }

  // ` import App from "../App"; import { render, fireEvent } from "react-testing-library"; import { build, fake } from "test-data-bot"; import "react-testing-library/cleanup-after-each";test("creates a todo with the text from the input field", () => { const { getByText, getByLabelText, rerender } = render(<App />); const input = getByLabelText("Add new todo:"); const todoBuilder = build("Todo").fields({ id: fake(f => f.random.number()), content: fake(f => f.lorem.words()) }); const fakeTodo = todoBuilder(); fireEvent.change(input, { target: { value: fakeTodo.content } }); fireEvent.click(getByText("Submit")); rerender(<App todos={[fakeTodo]} />); expect(getByText(fakeTodo.content)).toBeInTheDocument;});`,
  const createTestFile = () => {
    createImportStatements()
    setTestFileCode(beautify(testFileCode, { indent_size: 2, space_in_empty_paren: true }))
  }

  const createImportStatements = () => {
    const renderStatements = testCase.statements.filter(statement => statement.type === 'render')
    renderStatements.forEach(statement => {
      setTestFileCode(
        testFileCode + `import ${statement.componentName} from '${statement.componentName}'`
      )
    })
  }

  const saveTestFile = () => {
    if (!fs.existsSync(path.join(__dirname, '../__tests__'))) {
      fs.mkdirSync(path.join(__dirname, '../__tests__'))
    }
    fs.writeFile(path.join(__dirname, '../__tests__/beautifytest.js'), testFileCode, err => {
      if (err) throw err
    })
  }

  return <div />
}

export default ExportFileModal
