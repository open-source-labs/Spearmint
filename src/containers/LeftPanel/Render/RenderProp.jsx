import React from 'react';
import {
  addRenderProp,
  deleteRenderProp,
  updateRenderProp,
} from '../../../context/testCaseActions';
const minusIcon = require('../../../assets/images/minus.png');
const plusIcon = require('../../../assets/images/plus.png');

const RenderProp = ({ dispatchToTestCase, renderId, propId, propKey, propValue }) => {
  const handleClickAdd = () => {
    dispatchToTestCase(addRenderProp());
  };

  const handleClickDelete = e => {
    e.stopPropagation();
    dispatchToTestCase(deleteRenderProp(renderId, propId));
  };

  const handleChangeUpdatePropKey = e => {
    e.stopPropagation();
    dispatchToTestCase(updateRenderProp(renderId, propId, e.target.value, propValue));
  };

  const handleChangeUpdatePropValue = e => {
    e.stopPropagation();
    dispatchToTestCase(updateRenderProp(renderId, propId, propKey, e.target.value));
  };

  return (
    <div>
      <h4>Props</h4>
      <img src={plusIcon} onClick={handleClickAdd} />
      <p>key</p>
      <p>value</p>
      <img src={minusIcon} onClick={handleClickDelete} />
      <input type='text' id='propKey' onChange={handleChangeUpdatePropKey} />
      <input type='text' id='propValue' onChange={handleChangeUpdatePropValue} />
    </div>
  );
};

export default RenderProp;
