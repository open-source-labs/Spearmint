import React, { useReducer } from 'react';
import { testCaseReducer, initialState, actionTypes } from './testCaseReducer';

const TestCase = () => {
  const [testCase, dispatch] = useReducer(testCaseReducer, initialState);
  
  const handleTestTitleChange = (e) => {
    dispatch({
      type: actionTypes.UPDATE_TEST_TITLE,
      title: e.target.value,
    })
  };

  return (
    <>
      <label for='test-title'>test:</label>
      <input type='text' id='test-title' name='test-title' value={testCase.testTitle} onChange={handleTestTitleChange} />
    </>
  )
}


export default TestCase; 