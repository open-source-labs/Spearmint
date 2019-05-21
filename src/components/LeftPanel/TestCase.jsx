import React, { useReducer } from 'react';
import MockData from './TestCase/MockData';
import { testCaseReducer, initialState, updateTestTitle } from './TestCase/testCaseReducer';

const TestCase = () => {
  const [testCase, dispatch] = useReducer(testCaseReducer, initialState);
  
  const handleChange = (e) => {
    dispatch(updateTestTitle(e.target.value));
  };


  return (
    <div>
      <label for='test-title'>test:</label>
      <input type='text' id='test-title' name='test-title' value={testCase.testTitle} onChange={handleChange} />

      <MockData dispatch={dispatch} />
    </div>
  )
}


export default TestCase; 