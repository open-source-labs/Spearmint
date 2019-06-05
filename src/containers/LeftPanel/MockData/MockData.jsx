import React from 'react';
import styles from './MockData.module.scss';
import {
  deleteMockData,
  addMockDataKey,
  updateMockDataName,
} from '../../../context/mockDataActions';
import MockDataFieldKey from './MockDataKey';

const plusIcon = require('../../../assets/images/plus.png');
const closeIcon = require('../../../assets/images/close.png');

const MockData = ({ mockDatumId, dispatchToMockData, fieldKeys }) => {
  const handleClickAdd = (e, id) => {
    e.stopPropagation();
    dispatchToMockData(addMockDataKey(id));
  };

  const handleClickDelete = e => {
    e.stopPropagation();
    dispatchToMockData(deleteMockData(mockDatumId));
  };

  const handleClickUpdate = e => {
    e.stopPropagation();
    dispatchToMockData(updateMockDataName(mockDatumId, e.target.value));
  };

  const mockDataFieldKeys = fieldKeys.map(key => (
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
      <div id={styles.mockDataHeader}>
        <label htmlFor='mock-data-name'>Name </label>
        <input type='text' id='mock-data-name' onChange={handleClickUpdate} />
        <img src={closeIcon} alt='close' onClick={handleClickDelete} />
      </div>
      <div>
        <label htmlFor='mock-data-key' id={styles.mockDataKey}>
          Add field keys{' '}
        </label>
        <label htmlFor='mock-data-type' id={styles.mockDataType}>
          Type{' '}
        </label>
      </div>
      <div id={styles.keyList}>
        <hr />
        {mockDataFieldKeys}
        <button id={styles.addKeyBtn} onClick={e => handleClickAdd(e, mockDatumId)}>
          <img src={plusIcon} alt='add' />
          Add Key
        </button>
      </div>
    </div>
  );
};

export default MockData;
