import React, { useReducer } from 'react';
import { toggleMockData } from './testCaseReducer';

const MockData = ({ dispatch }) => {
  const handleClick = () => {
    dispatch(toggleMockData());
  }

  return (
    <div>
      <label for='mock-data'>Will you need mock data:</label>
      <input type='checkbox' id='mock-data' name='mock-data' onClick={handleClick} />
    </div>
  )
}

export default MockData; 