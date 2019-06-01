import React from 'react';
import { deleteMockDataKey, updateMockDataKey } from '../../../context/mockDataActions';
const minusIcon = require('../../../assets/images/minus.png');

const MockDataKey = ({ dispatchMockData, mockDatumId, mockDatumKeyId, fieldKey, fieldType }) => {
  const handleChangeDelete = e => {
    e.stopPropagation();
    dispatchMockData(deleteMockDataKey(mockDatumId, mockDatumKeyId));
  };

  const handleChangeUpdateFieldKey = e => {
    e.stopPropagation();
    dispatchMockData(updateMockDataKey(mockDatumId, mockDatumKeyId, e.target.value, fieldType));
  };

  const handleChangeUpdateFieldType = e => {
    e.stopPropagation();
    dispatchMockData(updateMockDataKey(mockDatumId, mockDatumKeyId, fieldKey, e.target.value));
  };

  const keys = {
    padding: '5px',
  };

  return (
    <div>
      <img src={minusIcon} onClick={handleChangeDelete} style={keys} />
      <form id='mock-data-form'>
        <input
          type='text'
          id='mock-data-key'
          value={fieldKey}
          onChange={handleChangeUpdateFieldKey}
        />
        <select id='mock-data-type' form='mock-data-form' onChange={handleChangeUpdateFieldType}>
          <option value='' />
          <option value='number'>Number</option>
          <option value='string'>String</option>
          <option value='boolean'>Boolean</option>
          <option value='object'>Object</option>
        </select>
      </form>
    </div>
  );
};

export default MockDataKey;
