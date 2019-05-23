import React, { useReducer } from "react";
import TestMenu from "./TestCase/TestMenu";
import MockData from "./TestCase/MockData";
import Action from "./TestCase/Action";
import Assertion from "./TestCase/Assertion";
import Render from "./TestCase/Render";
import { testCaseState, testCaseReducer } from "./TestCase/testCaseReducer";
import { updateTestStatement } from "./TestCase/testCaseActions";
import {
  mockDataState,
  mockDataReducer
} from "./TestCase/MockData/mockDataReducer";
import {
  toggleMockData,
  addMockData
} from "./TestCase/MockData/mockDataActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TestCase = () => {
  const [testCase, dispatchTestCase] = useReducer(
    testCaseReducer,
    testCaseState
  );

  const [mockData, dispatchMockData] = useReducer(
    mockDataReducer,
    mockDataState
  );

  const handleUpdateTestStatement = e => {
    dispatchTestCase(updateTestStatement(e.target.value));
  };

  const handleToggleMockData = () => {
    dispatchMockData(toggleMockData());
  };

  const handleAddMockData = () => {
    dispatchMockData(addMockData());
  };

  const mockDataJSX = mockData.mockData
    .map(mockDatum => {
      if (mockDatum.type === "mockData") {
        return (
          <MockData
            key={mockDatum.id}
            mockDatumId={mockDatum.id}
            dispatchMockData={dispatchMockData}
            fieldKeys={mockDatum.fieldKeys}
          />
        );
      }
    })
    .filter(Boolean);

  const statementsJSX = testCase.statements.map(statement => {
    switch (statement.type) {
      case "action":
        return (
          <Action
            key={statement.id}
            id={statement.id}
            dispatchTestCase={dispatchTestCase}
          />
        );
      case "assertion":
        return (
          <Assertion
            key={statement.id}
            id={statement.id}
            dispatchTestCase={dispatchTestCase}
          />
        );
      case "render":
        return (
          <Render
            key={statement.id}
            id={statement.id}
            dispatchTestCase={dispatchTestCase}
          />
        );
      default:
        return;
    }
  });

  return (
    <div>
      <TestMenu dispatchTestCase={dispatchTestCase} />
      <section>
        <label htmlFor="test-statement">test:</label>
        <input
          type="text"
          id="test-statement"
          value={testCase.testStatement}
          onChange={handleUpdateTestStatement}
        />
      </section>
      <section>
        <label htmlFor="mock-data-checkbox">Will you need mock data:</label>
        <input
          type="checkbox"
          id="mock-data-checkbox"
          disabled={mockDataJSX.length}
          onClick={handleToggleMockData}
        />
      </section>
      {mockData.mockDataCheckBox && (
        <section>
          <label htmlFor="mock-data">Mock data</label>
          <FontAwesomeIcon
            id="mock-data"
            icon="plus"
            onClick={handleAddMockData}
          />
          {mockDataJSX}
        </section>
      )}
      <div>{statementsJSX}</div>
    </div>
  );
};

export default TestCase;
