<<<<<<< HEAD
import React from "react";
import MockDataFieldKey from "./MockDataKey";
import {
  deleteMockData,
  addMockDataKey,
  updateMockDataName
} from "../../../context/mockDataActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
import React from 'react';
import MockDataFieldKey from './MockDataKey';
import {
  deleteMockData,
  addMockDataKey,
  updateMockDataName,
} from '../../../context/mockDataActions';
const plusIcon = require('../../../assets/images/plus.png');
const minusIcon = require('../../../assets/images/minus-box.png');
>>>>>>> c2c77423de5df72be189a45d02eb3229d5733e08

const MockData = ({ mockDatumId, dispatchMockData, fieldKeys }) => {
  const handleClickAdd = (e, id) => {
    e.stopPropagation();
    dispatchMockData(addMockDataKey(id));
  };

  const handleClickDelete = e => {
    e.stopPropagation();
    dispatchMockData(deleteMockData(mockDatumId));
  };

  const handleClickUpdate = e => {
    e.stopPropagation();
    dispatchMockData(updateMockDataName(mockDatumId, e.target.value));
  };

<<<<<<< HEAD
  // const keys = {
  //   padding: '5px',
  // }
=======
  const keys = {
    padding: '5px',
  };
>>>>>>> c2c77423de5df72be189a45d02eb3229d5733e08
  const mockDataFieldKeys = fieldKeys.map(key => (
    <MockDataFieldKey
      key={key.id}
      dispatchMockData={dispatchMockData}
      mockDatumId={mockDatumId}
      mockDatumKeyId={key.id}
      fieldKey={key.fieldKey}
      fieldType={key.fieldType}
    />
  ));

  return (
    <div>
<<<<<<< HEAD
      <FontAwesomeIcon
        id="delete-mock-data"
        icon="times"
        onClick={handleClickDelete}
      />
      <label htmlFor="mock-data-name">Name </label>
      <input type="text" id="mock-data-name" onChange={handleClickUpdate} />
      <div>
        <label htmlFor="mock-data-key">Add filed keys </label>
        <label htmlFor="mock-data-type">Type </label>
      </div>
      {mockDataFieldKeys}
      <button onClick={e => handleClickAdd(e, mockDatumId)}>
        <FontAwesomeIcon id="add-mock-data-key" icon="plus" />
=======
      <img src={minusIcon} onClick={handleClickDelete} style={keys} />
      <label htmlFor='mock-data-name'>Name </label>
      <input type='text' id='mock-data-name' onChange={handleClickUpdate} />
      <div style={keys}>
        <label htmlFor='mock-data-key'>Add filed keys </label>
        <label htmlFor='mock-data-type'>Type </label>
      </div>
      {mockDataFieldKeys}
      <button onClick={e => handleClickAdd(e, mockDatumId)}>
        <img src={plusIcon} />
>>>>>>> c2c77423de5df72be189a45d02eb3229d5733e08
        Add Key
      </button>
    </div>
  );
};

export default MockData;
