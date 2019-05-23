import React, { useReducer } from "react";
import { testCaseReducer, testCaseState } from "./testCaseReducer";
import { addAction } from "./testCaseActions";

const TestMenu = () => {
  const [testCase, dispatchTestCase] = useReducer(
    testCaseReducer,
    testCaseState
  );

  const handleAddAction = () => {
    dispatchTestCase(addAction());
  };

  const panel = {
    display: "flex",
    justifyContent: "center",
  }

  // const handleDeleteAction = () => {};
  return (
    <div className="flex-container" style={panel}>
      <div id="left-menu" >
        <button className="menu-btn">New Test</button>
      </div>
      <div id="right-menu" >
        <button className="menu-btn" onClick={handleAddAction}>
          Action
        </button>
        <button className="menu-btn">Assertion</button>
        <button className="menu-btn">Render</button>
      </div>
    </div>
  );
};

export default TestMenu;
