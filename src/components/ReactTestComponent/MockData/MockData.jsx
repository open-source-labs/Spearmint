/**
 * the card for adding mock data
 * renders :
 *  - mockDataKey (as mockDataFieldKey)
 *  - the labels in the card (name, key, type)
 */

import React from 'react';
import styles from './MockData.module.scss';
import {
  deleteMockData,
  addMockDataKey,
  updateMockDataName,
} from '../../../context/actions/mockDataActions';
import MockDataFieldKey from './MockDataKey';

const plusIcon = require('../../../assets/images/plus.png');
const closeIcon = require('../../../assets/images/close.png');

const MockData = ({ mockDatumId, dispatchToMockData, fieldKeys }) => {
  const handleClickAdd = (e, id) => {
    e.stopPropagation();
    dispatchToMockData(addMockDataKey(id));
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    dispatchToMockData(deleteMockData(mockDatumId));
  };

  const handleClickUpdate = (e) => {
    e.stopPropagation();
    dispatchToMockData(updateMockDataName(mockDatumId, e.target.value));
  };

  const mockDataFieldKeys = fieldKeys.map((key) => (
    <MockDataFieldKey
      key={key.id}
      dispatchToMockData={dispatchToMockData}
      mockDatumId={mockDatumId}
      mockDatumKeyId={key.id}
      fieldKey={key.fieldKey}
      fieldType={key.fieldType}
    />
  ));

  return (
    <div id={styles.mockData}>
      <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDelete} />
      <div id={styles.mockDataHeader}>
        <label htmlFor='mock-data-name'>Name </label>
        <input type='text' id='mock-data-name' onChange={handleClickUpdate} />
      </div>
      <div id={styles.keys}>
        <label htmlFor='mock-data-key' id={styles.mockDataKey}>
          Add field keys{' '}
        </label>
        <label htmlFor='mock-data-type' id={styles.mockDataType}>
          Type{' '}
        </label>
      </div>
      <hr />
      <div id={styles.keyList}>
        {mockDataFieldKeys}
        <button id={styles.addKeyBtn} onClick={(e) => handleClickAdd(e, mockDatumId)}>
          <img src={plusIcon} alt='add' />
          Add Key
        </button>
      </div>
    </div>
  );
};

export default MockData;
