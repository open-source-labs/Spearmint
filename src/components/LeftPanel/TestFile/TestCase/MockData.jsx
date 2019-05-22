import React from 'react';
import MockDataKey from './MockData/MockDataKey';
import { deleteMockData, addMockDataKey } from './testCaseReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MockData = ({ mockDatumId, dispatch, keys }) => {
  const handleClickAdd = (e, id) => {
    e.stopPropagation();
    dispatch(addMockDataKey(id));
  }

  const handleClickDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteMockData(id));
  }

  const mockDataKeys = keys.map((key) => <MockDataKey 
                                           key={key.id} 
                                           dispatch={dispatch}
                                           fieldKey={key.fieldKey} 
                                           type={key.type} 
                                           mockDatumId={mockDatumId} 
                                           mockDatumKeyId={key.id} 
                                         />)

  return (
    <div>
      <FontAwesomeIcon id='delete-mock-data' icon='times' onClick={(e) => handleClickDelete(e, mockDatumId)} />
      <label htmlFor='mock-data-name'>Name </label>
      <input type='text' id='mock-data-name' />
      <div>
        <label htmlFor='mock-data-key'>Add filed keys </label>
        <label htmlFor='mock-data-type'>Type </label>
      </div>
      {mockDataKeys}
      <button onClick={(e) => handleClickAdd(e, mockDatumId)}>
        <FontAwesomeIcon id='add-mock-data-key' icon='plus'  /> 
        Add Key 
      </button>
    </div>
  )
}

export default MockData; 