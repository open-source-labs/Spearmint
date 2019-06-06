import React from 'react';
import styles from '../Render/RenderProp.module.scss';
import { deleteRenderProp, updateRenderProp } from '../../../context/testCaseActions';

const minusIcon = require('../../../assets/images/minus-box-outline.png');

const RenderProp = ({ renderId, propId, propKey, propValue, dispatchToTestCase }) => {
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
      <img src={minusIcon} alt='delete' onClick={handleClickDeleteProp} />
    </div>
  );
};

export default RenderProp;
