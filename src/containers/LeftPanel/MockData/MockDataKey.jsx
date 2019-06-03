import React from 'react';
import styles from '../MockData/MockDataKey.module.scss';
import { deleteMockDataKey, updateMockDataKey } from '../../../context/mockDataActions';
const minusIcon = require('../../../assets/images/minus-box-outline.png');

const MockDataKey = ({ dispatchToMockData, mockDatumId, mockDatumKeyId, fieldKey, fieldType }) => {
  const handleChangeDelete = e => {
    e.stopPropagation();
    dispatchToMockData(deleteMockDataKey(mockDatumId, mockDatumKeyId));
  };

  const handleChangeUpdateFieldKey = e => {
    e.stopPropagation();
    dispatchToMockData(updateMockDataKey(mockDatumId, mockDatumKeyId, e.target.value, fieldType));
  };

  const handleChangeUpdateFieldType = e => {
    e.stopPropagation();
    dispatchToMockData(updateMockDataKey(mockDatumId, mockDatumKeyId, fieldKey, e.target.value));
  };

  return (
    <div id={styles.mockDataKey}>
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
        <img src={minusIcon} alt='delete' onClick={handleChangeDelete} />
      </form>
    </div>
  );
};

export default MockDataKey;
