import React, { useReducer } from 'react';
import { testCaseReducer, initialState } from './testCaseReducer';

const TestCase = () => {
  const [testCase, dispatch] = [testCaseReducer, initialState];
  
  return (
    <>
      <p>TestTitle:</p>
    </>
  )
}

export default TestCase; 