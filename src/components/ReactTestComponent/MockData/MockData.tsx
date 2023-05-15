/**
 * the card for adding mock data
 * renders :
 *  - mockDataKey (as mockDataFieldKey)
 *  - the labels in the card (name, key, type)
 */

import React, { useContext } from 'react';
import styles from './MockData.module.scss';
import {
  deleteMockData,
  addMockDataKey,
  updateMockDataName,
} from '../../../context/actions/mockDataActions';
import MockDataFieldKey from './MockDataKey';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { MockDataProps } from '../../../utils/mockTypes';

const plusIcon = require('../../../assets/images/plus.png');
const closeIcon = require('../../../assets/images/close.png');

// This is the file for when mock data is added to the test

const MockData = ({ mockDatumId, dispatchToMockData, fieldKeys }: MockDataProps) => {
  const [{theme}] = useContext(GlobalContext);
  const handleClickAdd = (e: React.BaseSyntheticEvent<MouseEvent>, id: number) => {
    e.stopPropagation();
    dispatchToMockData(addMockDataKey(id));
  };

  const handleClickDelete = (e: React.BaseSyntheticEvent<MouseEvent>) => {
    e.stopPropagation();
    dispatchToMockData(deleteMockData(mockDatumId));
  };

  const handleClickUpdate = (e: React.BaseSyntheticEvent<MouseEvent>) => {
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
    <div id={styles[`mockData${theme}`]}>
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
