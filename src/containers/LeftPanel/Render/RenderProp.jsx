import React from 'react';
import styles from '../Render/RenderProp.module.scss';
import {
  addRenderProp,
  deleteRenderProp,
  updateRenderProp,
} from '../../../context/testCaseActions';
const minusIcon = require('../../../assets/images/minus-box-outline.png');

const RenderProp = ({ dispatchToTestCase, renderId, propId, propKey, propValue }) => {
  const handleClickDeleteProp = e => {
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
    <div id={styles.renderPropsFlexBox}>
      <input type='text' id='propKey' onChange={handleChangeUpdatePropKey} />
      <input type='text' id='propValue' onChange={handleChangeUpdatePropValue} />
      <img src={minusIcon} onClick={handleClickDeleteProp} />
    </div>
  );
};

export default RenderProp;
