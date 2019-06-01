<<<<<<< HEAD
import React, { useState } from 'react';
import { addAction, addAssertion, addRender } from '../../../context/testCaseActions';
=======
import React from "react";
import {
  addAction,
  addAssertion,
  addRender
} from "../../../context/testCaseActions";
>>>>>>> b1ed50647ec13e4186166f32953231a1e90a63be

const TestMenu = ({ dispatchTestCase }) => {
  const [reRender, setReRender] = useState(false);

  const handleAddAction = e => {
    dispatchTestCase(addAction());
  };
  const handleAddAssertion = e => {
    dispatchTestCase(addAssertion());
  };
  const handleAddRender = e => {
    dispatchTestCase(addRender());
<<<<<<< HEAD
    if (!reRender) setReRender(true);
  };

  const panel = {
    display: 'flex',
    justifyContent: 'center',
=======
>>>>>>> b1ed50647ec13e4186166f32953231a1e90a63be
  };

  return (
    <div className="flex-container">
      <div id="left-menu">
        <button className="menu-btn">New Test</button>
      </div>
      <div id="right-menu">
        <button className="menu-btn" onClick={handleAddAction}>
          Action
        </button>
        <button className="menu-btn" onClick={handleAddAssertion}>
          Assertion
        </button>
<<<<<<< HEAD
        <button className='menu-btn' onClick={handleAddRender}>
          {!reRender ? 'Render' : 'Rerender'}
=======
        <button className="menu-btn" onClick={handleAddRender}>
          Render
>>>>>>> b1ed50647ec13e4186166f32953231a1e90a63be
        </button>
      </div>
    </div>
  );
};

export default TestMenu;
