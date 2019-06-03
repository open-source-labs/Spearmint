import React from 'react';
import {
  deleteMockData,
  addMockDataKey,
  updateMockDataName,
} from '../../../context/mockDataActions';
import MockDataFieldKey from './MockDataKey';

const plusIcon = require('../../../assets/images/plus.png');
const minusIcon = require('../../../assets/images/minus-box.png');

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
    <div>
      <img src={minusIcon} onClick={handleClickDelete} />
      <label htmlFor='mock-data-name'>Name </label>
      <input type='text' id='mock-data-name' onChange={handleClickUpdate} />
      <div>
        <label htmlFor='mock-data-key'>Add filed keys </label>
        <label htmlFor='mock-data-type'>Type </label>
      </div>
      {mockDataFieldKeys}
      <button onClick={e => handleClickAdd(e, mockDatumId)}>
        <img src={plusIcon} />
        Add Key
      </button>
    </div>
  );
};

export default MockData;
