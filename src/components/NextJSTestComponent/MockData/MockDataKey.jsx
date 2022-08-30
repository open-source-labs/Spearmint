/**
 * the data for each field key and type in the card for mock data
 */

import React from 'react';
import styles from './MockDataKey.module.scss';
import { deleteMockDataKey, updateMockDataKey } from '../../../context/actions/mockDataActions';

const minusIcon = require('../../../assets/images/minus-box-outline.png');

const MockDataKey = ({ dispatchToMockData, mockDatumId, mockDatumKeyId, fieldKey, fieldType }) => {
  const handleChangeDelete = (e) => {
    e.stopPropagation();
    dispatchToMockData(deleteMockDataKey(mockDatumId, mockDatumKeyId));
  };

  const handleChangeUpdateFieldKey = (e) => {
    e.stopPropagation();
    dispatchToMockData(updateMockDataKey(mockDatumId, mockDatumKeyId, e.target.value, fieldType));
  };

  const handleChangeUpdateFieldType = (e) => {
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
          <option value='word'>word</option>
          <option value='words'>words</option>
          <option value='number'>number</option>
          <option value='float'>float</option>
          <option value='arrayElement'>arrayElement</option>
          <option value='objectElement'>objectElement</option>
          <option value='alphaNumeric'>alphaNumeric</option>
          <option value='boolean'>boolean</option>
          <option value='image'>image</option>
          <option value='locale'>locale</option>
          <option value='hexaDecimal'>hexaDecimal</option>
          <option value='uuid'>uuid</option>
        </select>
        <img src={minusIcon} alt='delete' onClick={handleChangeDelete} />
      </form>
    </div>
  );
};

export default MockDataKey;
