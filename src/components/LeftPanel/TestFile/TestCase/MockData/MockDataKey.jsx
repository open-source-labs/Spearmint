import React from 'react';
import { deleteMockDataKey } from '../testCaseReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MockDataKey = ({ dispatch, fieldKey, type, mockDatumId, mockDatumKeyId }) => {
  const handleDeleteMockDataKey = (e, mockDatumId, mockDatumKeyId) => {
    e.stopPropagation();
    dispatch(deleteMockDataKey(mockDatumId, mockDatumKeyId));
  }
  
  return (
    <div>
        <FontAwesomeIcon id='delete-mock-data-key' icon='minus' onClick={(e) => handleDeleteMockDataKey(e, mockDatumId, mockDatumKeyId)}/>
        <form id='mock-data-form'>
          <input type='text' id='mock-data-key' />
          <select id='mock-data-type' form='mock-data-form'>
            <option value='number'>Number</option>
            <option value='string'>String</option>
            <option value='boolean'>Boolean</option>
            <option value='object'>Object</option>
          </select>
        </form>
    </div>
  )
}

export default MockDataKey; 